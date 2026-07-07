<?php
// src/Models/Vaga.php

class Vaga {
    private $conn;
    private $table_name = "vagas";

    public $id;
    public $empresa_id;
    public $titulo;
    public $descricao;
    public $requisitos;
    public $localizacao;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Listar todas as vagas (GET /vagas)
    public function listar() {
        // Faz um JOIN com a tabela empresas para sabermos o nome de quem publicou
        $query = "SELECT v.id, v.titulo, v.descricao, v.requisitos, v.localizacao, v.criado_em, e.nome_comercial 
                  FROM " . $this->table_name . " v
                  JOIN empresas e ON v.empresa_id = e.id
                  ORDER BY v.criado_em DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar uma nova vaga (POST /vagas)
    public function criar() {
        $query = "INSERT INTO " . $this->table_name . " (empresa_id, titulo, descricao, requisitos, localizacao) 
                  VALUES (:empresa_id, :titulo, :descricao, :requisitos, :localizacao)";
        
        $stmt = $this->conn->prepare($query);

        // Limpeza de segurança
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->requisitos = htmlspecialchars(strip_tags($this->requisitos));
        $this->localizacao = htmlspecialchars(strip_tags($this->localizacao));

        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":requisitos", $this->requisitos);
        $stmt->bindParam(":localizacao", $this->localizacao);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}