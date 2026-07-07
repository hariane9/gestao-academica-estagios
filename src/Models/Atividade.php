<?php
// src/Models/Atividade.php

class Atividade {
    private $conn;
    private $table_name = "atividades";

    public $id;
    public $estagio_id;
    public $descricao;
    public $horas_dedicadas;
    public $data_registro;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function criar() {
        $query = "INSERT INTO " . $this->table_name . " (estagio_id, descricao, horas_dedicadas, data_registro) 
                  VALUES (:estagio_id, :descricao, :horas_dedicadas, :data_registro)";
        
        $stmt = $this->conn->prepare($query);

        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->data_registro = htmlspecialchars(strip_tags($this->data_registro));

        $stmt->bindParam(":estagio_id", $this->estagio_id);
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":horas_dedicadas", $this->horas_dedicadas);
        $stmt->bindParam(":data_registro", $this->data_registro);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function listarPorEstagio($estagio_id) {
        $query = "SELECT id, descricao, horas_dedicadas, data_registro 
                  FROM " . $this->table_name . " 
                  WHERE estagio_id = :estagio_id 
                  ORDER BY data_registro DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estagio_id", $estagio_id);
        $stmt->execute();
        return $stmt;
    }
    // Atualizar uma atividade existente
    public function atualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET descricao = :descricao, horas_dedicadas = :horas_dedicadas, data_registro = :data_registro 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->horas_dedicadas = htmlspecialchars(strip_tags($this->horas_dedicadas));
        $this->data_registro = htmlspecialchars(strip_tags($this->data_registro));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':horas_dedicadas', $this->horas_dedicadas);
        $stmt->bindParam(':data_registro', $this->data_registro);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Apagar uma atividade
    public function apagar($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}