<?php
// src/Models/Candidatura.php

class Candidatura {
    private $conn;
    private $table_name = "candidaturas";

    public $id;
    public $vaga_id;
    public $aluno_id;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar uma nova candidatura (POST /candidaturas)
    public function criar() {
        $query = "INSERT INTO " . $this->table_name . " (vaga_id, aluno_id, status) 
                  VALUES (:vaga_id, :aluno_id, 'pendente')";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":vaga_id", $this->vaga_id);
        $stmt->bindParam(":aluno_id", $this->aluno_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function verificarExistente($aluno_id, $vaga_id) {
    $query = "SELECT id FROM candidaturas WHERE aluno_id = :aluno_id AND vaga_id = :vaga_id LIMIT 1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":aluno_id", $aluno_id);
    $stmt->bindParam(":vaga_id", $vaga_id);
    $stmt->execute();
    
    return $stmt->rowCount() > 0; // Devolve true se já existir, false se não existir
}
}