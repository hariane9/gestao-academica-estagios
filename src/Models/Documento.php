<?php
// src/Models/Documento.php

class Documento {
    private $conn;
    private $table_name = "documentos";

    public $id;
    public $estagio_id;
    public $nome_ficheiro;      
    public $caminho_ficheiro;   
    public $tipo_documento;
    public $data_upload;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function salvar() {
      
        $query = "INSERT INTO " . $this->table_name . " (estagio_id, nome_ficheiro, caminho_ficheiro, tipo_documento, data_upload) 
                  VALUES (:estagio_id, :nome_ficheiro, :caminho_ficheiro, :tipo_documento, :data_upload)";
        
        $stmt = $this->conn->prepare($query);

        $this->nome_ficheiro = htmlspecialchars(strip_tags($this->nome_ficheiro));
        $this->caminho_ficheiro = htmlspecialchars(strip_tags($this->caminho_ficheiro));
        $this->tipo_documento = htmlspecialchars(strip_tags($this->tipo_documento));
        $this->data_upload = htmlspecialchars(strip_tags($this->data_upload));

        $stmt->bindParam(":estagio_id", $this->estagio_id);
        $stmt->bindParam(":nome_ficheiro", $this->nome_ficheiro);
        $stmt->bindParam(":caminho_ficheiro", $this->caminho_ficheiro);
        $stmt->bindParam(":tipo_documento", $this->tipo_documento);
        $stmt->bindParam(":data_upload", $this->data_upload);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function listarPorEstagio($estagio_id) {
        $query = "SELECT id, nome_ficheiro, caminho_ficheiro, tipo_documento, data_upload 
                  FROM " . $this->table_name . " 
                  WHERE estagio_id = :estagio_id 
                  ORDER BY data_upload DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estagio_id", $estagio_id);
        $stmt->execute();
        return $stmt;
    }
}