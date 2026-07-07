<?php
// src/Controllers/VacancyController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Vaga.php';

class VacancyController {
    private $db;
    private $vaga;

    public function __construct($db) {
        $this->db = $db;
        $this->vaga = new Vaga($db);
    }

    // Processa GET /vagas
    public function listarVagas() {
        $stmt = $this->vaga->listar();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $vagas_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $vaga_item = [
                    "id" => $id,
                    "titulo" => $titulo,
                    "descricao" => $descricao,
                    "requisitos" => $requisitos,
                    "localizacao" => $localizacao,
                    "criado_em" => $criado_em,
                    "empresa" => $nome_comercial
                ];
                array_push($vagas_arr, $vaga_item);
            }
            http_response_code(200);
            echo json_encode($vagas_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }

    // Processa POST /vagas
    public function criarVaga($data) {
        if (!isset($data->empresa_id) || !isset($data->titulo) || !isset($data->descricao)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados obrigatórios em falta (empresa_id, titulo, descricao)."]);
            return;
        }

        $this->vaga->empresa_id = $data->empresa_id;
        $this->vaga->titulo = $data->titulo;
        $this->vaga->descricao = $data->descricao;
        $this->vaga->requisitos = isset($data->requisitos) ? $data->requisitos : null;
        $this->vaga->localizacao = isset($data->localizacao) ? $data->localizacao : null;

        if ($this->vaga->criar()) {
            http_response_code(201);
            echo json_encode(["message" => "Vaga de estágio publicada com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao publicar a vaga."]);
        }
    }
}