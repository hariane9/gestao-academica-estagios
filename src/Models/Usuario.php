<?php
// src/Models/Usuario.php

class Usuario {
    private $conn;
    private $table_name = "usuarios";

    public $id;
    public $nome;
    public $email;
    public $senha;
    public $tipo;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar novo utilizador (Registo) 
    public function criar() {
        $query = "INSERT INTO " . $this->table_name . " (nome, email, senha, tipo) VALUES (:nome, :email, :senha, :tipo)";
        $stmt = $this->conn->prepare($query);

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));

        // Encriptar a senha de forma segura antes de guardar 
        $senha_hash = password_hash($this->senha, PASSWORD_BCRYPT);

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":senha", $senha_hash);
        $stmt->bindParam(":tipo", $this->tipo);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Verificar se o email já existe (Login) 
    public function emailExiste() {
        $query = "SELECT id, nome, senha, tipo FROM " . $this->table_name . " WHERE email = :email LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->nome = $row['nome'];
            $this->senha = $row['senha'];
            $this->tipo = $row['tipo'];
            return true;
        }
        return false;
    }
}