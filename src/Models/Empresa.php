<?php
// src/Models/Empresa.php

class Empresa {
    private $conn;
    private $table_name = "empresas";

    public $id;
    public $usuario_id;
    public $nome_comercial;
    public $nif;
    public $morada;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Listar todas as empresas (GET /empresas)
    public function listar() {
        // Fazemos um JOIN com a tabela usuários para trazer também o email de contacto
        $query = "SELECT e.id, e.nome_comercial, e.nif, e.morada, u.email 
                  FROM " . $this->table_name . " e
                  JOIN usuarios u ON e.usuario_id = u.id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar o perfil da empresa (Vincular a um usuário existente)
    public function criar() {
        $query = "INSERT INTO " . $this->table_name . " (usuario_id, nome_comercial, nif, morada) 
                  VALUES (:usuario_id, :nome_comercial, :nif, :morada)";
        
        $stmt = $this->conn->prepare($query);

        // Limpeza de segurança
        $this->nome_comercial = htmlspecialchars(strip_tags($this->nome_comercial));
        $this->nif = htmlspecialchars(strip_tags($this->nif));
        $this->morada = htmlspecialchars(strip_tags($this->morada));

        $stmt->bindParam(":usuario_id", $this->usuario_id);
        $stmt->bindParam(":nome_comercial", $this->nome_comercial);
        $stmt->bindParam(":nif", $this->nif);
        $stmt->bindParam(":morada", $this->morada);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}