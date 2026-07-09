<?php
// src/Models/Estagio.php

class Estagio {
    private $conn;
    private $table_name = "estagios";

    public $id;
    public $aluno_id;
    public $empresa_id;
    public $supervisor_id;
    public $data_inicio;
    public $data_fim;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

  
    public function buscarAtivoPorAluno($aluno_id) {
        $query = "SELECT id, empresa_id, supervisor_id, data_inicio, data_fim, status 
                  FROM " . $this->table_name . " 
                  WHERE aluno_id = :aluno_id AND status = 'ativo' 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":aluno_id", $aluno_id);
        $stmt->execute();
        
        return $stmt;
    }
}