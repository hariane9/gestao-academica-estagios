<?php
// src/Controllers/CompanyController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Empresa.php';

class CompanyController {
    private $db;
    private $empresa;

    public function __construct($db) {
        $this->db = $db;
        $this->empresa = new Empresa($db);
    }

    // Processa GET /empresas
    public function listarEmpresas() {
        $stmt = $this->empresa->listar();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $empresas_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $empresa_item = [
                    "id" => $id,
                    "nome_comercial" => $nome_comercial,
                    "nif" => $nif,
                    "morada" => $morada,
                    "email_contacto" => $email
                ];
                array_push($empresas_arr, $empresa_item);
            }
            http_response_code(200);
            echo json_encode($empresas_arr);
        } else {
            http_response_code(200); // Retorna lista vazia com sucesso
            echo json_encode([]);
        }
    }

    // Processa POST /empresas
    public function vincularEmpresa($data) {
        if (!isset($data->usuario_id) || !isset($data->nome_comercial) || !isset($data->nif)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados obrigatórios em falta (usuario_id, nome_comercial, nif)."]);
            return;
        }

        $this->empresa->usuario_id = $data->usuario_id;
        $this->empresa->nome_comercial = $data->nome_comercial;
        $this->empresa->nif = $data->nif;
        $this->empresa->morada = isset($data->morada) ? $data->morada : null;

        if ($this->empresa->criar()) {
            http_response_code(201);
            echo json_encode(["message" => "Perfil da empresa configurado com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao associar dados da empresa."]);
        }
    }
}