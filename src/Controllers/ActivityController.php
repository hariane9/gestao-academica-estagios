<?php
// src/Controllers/ActivityController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Atividade.php';
require_once dirname(dirname(__DIR__)) . '/src/Models/Estagio.php'; // Adicionado o import do novo modelo

class ActivityController {
    private $db;
    private $atividade;

    public function __construct($db) {
        $this->db = $db;
        $this->atividade = new Atividade($db);
    }

    // 1. Registar Atividade no Diário de Bordo
    public function registrarAtividade($data) {
        if (!isset($data->estagio_id) || !isset($data->descricao) || !isset($data->horas_dedicadas) || !isset($data->data_registro)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para o registo da atividade."]);
            return;
        }

        // REGRA DE NEGÓCIO: Validar o limite de horas diárias (Entre 1 e 8 horas)
        if ($data->horas_dedicadas < 1 || $data->horas_dedicadas > 8) {
            http_response_code(400);
            echo json_encode(["error" => "Número de horas inválido. Deve registar entre 1 e 8 horas por atividade."]);
            return;
        }

        $this->atividade->estagio_id = $data->estagio_id;
        $this->atividade->descricao = $data->descricao;
        $this->atividade->horas_dedicadas = $data->horas_dedicadas;
        $this->atividade->data_registro = $data->data_registro;

        if ($this->atividade->criar()) {
            http_response_code(201);
            echo json_encode(["message" => "Atividade registada no Diário de Bordo com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao gravar a atividade."]);
        }
    }

    // 2. Rota de Vínculo: Descobrir o Estágio Ativo do Aluno (Nova!)
    public function obterEstagioAtual() {
        // Captura o aluno_id enviado na URL (?aluno_id=X)
        $aluno_id = isset($_GET['aluno_id']) ? $_GET['aluno_id'] : null;

        if (!$aluno_id) {
            http_response_code(400);
            echo json_encode(["error" => "O parâmetro aluno_id é obrigatório."]);
            return;
        }

        $estagioModel = new Estagio($this->db);
        $stmt = $estagioModel->buscarAtivoPorAluno($aluno_id);
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                "estagio_id" => (int)$row['id'],
                "empresa_id" => (int)$row['empresa_id'],
                "supervisor_id" => (int)$row['supervisor_id'],
                "status" => $row['status']
            ]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Nenhum estágio ativo encontrado para este aluno."]);
        }
    }

    // 3. Listar as Atividades de um Estágio
    public function listarAtividades() {
        $estagio_id = isset($_GET['estagio_id']) ? $_GET['estagio_id'] : null;

        if (!$estagio_id) {
            http_response_code(400);
            echo json_encode(["error" => "O parâmetro estagio_id é obrigatório."]);
            return;
        }

        $stmt = $this->atividade->listarPorEstagio($estagio_id);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $atividades_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $atividade_item = [
                    "id" => $id,
                    "descricao" => $descricao,
                    "horas_dedicadas" => $horas_dedicadas,
                    "data_registro" => $data_registro
                ];
                array_push($atividades_arr, $atividade_item);
            }
            http_response_code(200);
            echo json_encode($atividades_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
    // Editar Atividade (PUT)
    public function editarAtividade($data) {
        if (!isset($data->id) || !isset($data->descricao) || !isset($data->horas_dedicadas) || !isset($data->data_registro)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualizar a atividade."]);
            return;
        }

        // Mantém a regra de negócio na edição também!
        if ($data->horas_dedicadas < 1 || $data->horas_dedicadas > 8) {
            http_response_code(400);
            echo json_encode(["error" => "Número de horas inválido. Deve registar entre 1 e 8 horas."]);
            return;
        }

        $this->atividade->id = $data->id;
        $this->atividade->descricao = $data->descricao;
        $this->atividade->horas_dedicadas = $data->horas_dedicadas;
        $this->atividade->data_registro = $data->data_registro;

        if ($this->atividade->atualizar()) {
            http_response_code(200);
            echo json_encode(["message" => "Atividade atualizada com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar a atividade."]);
        }
    }

    // Eliminar Atividade (DELETE)
    public function eliminarAtividade() {
        // Captura o ID enviado por Query Parameter (?id=X)
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "O parâmetro id é obrigatório para eliminar."]);
            return;
        }

        if ($this->atividade->apagar($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Atividade eliminada com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao eliminar a atividade."]);
        }
    }
}