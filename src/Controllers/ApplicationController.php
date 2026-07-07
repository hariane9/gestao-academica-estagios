<?php
// src/Controllers/ApplicationController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Candidatura.php';

class ApplicationController {
    private $db;
    private $candidatura;

    public function __construct($db) {
        $this->db = $db;
        $this->candidatura = new Candidatura($db);
    }

   public function candidatar($data) {
        if (!isset($data->vaga_id) || !isset($data->aluno_id)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos (vaga_id ou aluno_id em falta)."]);
            return;
        }

       
        if ($this->candidatura->verificarExistente($data->aluno_id, $data->vaga_id)) {
            http_response_code(400);
            echo json_encode(["error" => "Já te candidataste a esta vaga de estágio anteriormente."]);
            return;
        }

        $this->candidatura->vaga_id = $data->vaga_id;
        $this->candidatura->aluno_id = $data->aluno_id;
        $this->candidatura->data_candidatura = date('Y-m-d H:i:s');

        if ($this->candidatura->criar()) {
            http_response_code(201);
            echo json_encode(["message" => "Candidatura submetida com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao processar a candidatura."]);
        }
    }
}