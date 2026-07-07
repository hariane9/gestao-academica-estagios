<?php
// src/Controllers/EvaluationController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Avaliacao.php';

class EvaluationController {
    private $db;
    private $avaliacao;

    public function __construct($db) {
        $this->db = $db;
        $this->avaliacao = new Avaliacao($db);
    }

    // Processa POST /avaliacoes
    public function criarAvaliacao($data) {
        if (!isset($data->estagio_id) || !isset($data->nota) || !isset($data->feedback) || !isset($data->data_avaliacao)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados obrigatórios em falta (estagio_id, nota, feedback, data_avaliacao)."]);
            return;
        }

        // Validação da regra de negócio: nota de 0 a 10
        if ($data->nota < 0 || $data->nota > 10) {
            http_response_code(400);
            echo json_encode(["error" => "A nota de avaliação deve ser um valor entre 0 e 10."]);
            return;
        }

        $this->avaliacao->estagio_id = $data->estagio_id;
        $this->avaliacao->nota = $data->nota;
        $this->avaliacao->feedback = $data->feedback;
        $this->avaliacao->data_avaliacao = $data->data_avaliacao;

        if ($this->avaliacao->avaliar()) {
            http_response_code(201);
            echo json_encode(["message" => "Avaliação de estágio lançada com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao gravar a avaliação."]);
        }
    }

    // Processa GET /avaliacoes?estagio_id=X
    public function obterAvaliacoes() {
        $estagio_id = isset($_GET['estagio_id']) ? $_GET['estagio_id'] : null;

        if (!$estagio_id) {
            http_response_code(400);
            echo json_encode(["error" => "O parâmetro estagio_id é obrigatório."]);
            return;
        }

        $stmt = $this->avaliacao->listarPorEstagio($estagio_id);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $avaliacoes_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $avaliacao_item = [
                    "id" => $id,
                    "nota" => (int)$nota,
                    "feedback" => $feedback,
                    "data_avaliacao" => $data_avaliacao
                ];
                array_push($avaliacoes_arr, $avaliacao_item);
            }
            http_response_code(200);
            echo json_encode($avaliacoes_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
}