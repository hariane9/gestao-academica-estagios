<?php
// src/Models/Avaliacao.php

class Avaliacao {
    private $conn;
    private $table_name = "avaliacoes";

    public $id;
    public $estagio_id;
    public $nota;
    public $feedback;
    public $data_avaliacao;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Lançar uma nova avaliação (POST /avaliacoes)
    public function avaliar() {
        $query = "INSERT INTO " . $this->table_name . " (estagio_id, nota, feedback, data_avaliacao) 
                  VALUES (:estagio_id, :nota, :feedback, :data_avaliacao)";
        
        $stmt = $this->conn->prepare($query);

        // Limpeza de segurança e formatação da nota
        $this->feedback = htmlspecialchars(strip_tags($this->feedback));
        $this->data_avaliacao = htmlspecialchars(strip_tags($this->data_avaliacao));

        $stmt->bindParam(":estagio_id", $this->estagio_id);
        $stmt->bindParam(":nota", $this->nota);
        $stmt->bindParam(":feedback", $this->feedback);
        $stmt->bindParam(":data_avaliacao", $this->data_avaliacao);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Procurar as avaliações de um estágio específico (GET /avaliacoes?estagio_id=X)
    public function listarPorEstagio($estagio_id) {
        $query = "SELECT id, nota, feedback, data_avaliacao 
                  FROM " . $this->table_name . " 
                  WHERE estagio_id = :estagio_id 
                  ORDER BY data_avaliacao DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estagio_id", $estagio_id);
        $stmt->execute();
        return $stmt;
    }
}