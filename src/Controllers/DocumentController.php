<?php
// src/Controllers/DocumentController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Documento.php';

class DocumentController {
    private $db;
    private $documento;

    public function __construct($db) {
        $this->db = $db;
        $this->documento = new Documento($db);
    }

    public function uploadDocumento() {
        if (!isset($_POST['estagio_id']) || !isset($_POST['tipo_documento']) || !isset($_FILES['arquivo'])) {
            http_response_code(400);
            echo json_encode(["error" => "Dados em falta (estagio_id, tipo_documento ou arquivo)."]);
            return;
        }

        $estagio_id = $_POST['estagio_id'];
        $tipo_documento = strtolower($_POST['tipo_documento']); // Garante minúsculas para o ENUM
        $arquivo = $_FILES['arquivo'];

        // Validar se o tipo_documento corresponde ao ENUM da tua BD ('contrato', 'relatorio', 'anexo')
        if (!in_array($tipo_documento, ['contrato', 'relatorio', 'anexo'])) {
            http_response_code(400);
            echo json_encode(["error" => "O tipo de documento deve ser 'contrato', 'relatorio' ou 'anexo'."]);
            return;
        }

        $extensao = pathinfo($arquivo['name'], PATHINFO_EXTENSION);
        if (strtolower($extensao) != 'pdf') {
            http_response_code(400);
            echo json_encode(["error" => "Apenas são permitidos ficheiros em formato PDF."]);
            return;
        }

        $diretorio_alvo = dirname(dirname(__DIR__)) . '/public/uploads/';
        if (!file_exists($diretorio_alvo)) {
            mkdir($diretorio_alvo, 0777, true);
        }

        $nome_original = basename($arquivo['name']);
        $novo_nome_arquivo = uniqid() . '_' . $nome_original;
        $caminho_final = $diretorio_alvo . $novo_nome_arquivo;

        if (move_uploaded_file($arquivo['tmp_name'], $caminho_final)) {
            
            
            $this->documento->estagio_id = $estagio_id;
            $this->documento->nome_ficheiro = $nome_original;
            $this->documento->caminho_ficheiro = 'uploads/' . $novo_nome_arquivo;
            $this->documento->tipo_documento = $tipo_documento;
            $this->documento->data_upload = date('Y-m-d H:i:s');

            if ($this->documento->salvar()) {
                http_response_code(201);
                echo json_encode(["message" => "Documento enviado e guardado com sucesso!"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Erro ao registar na Base de Dados."]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao mover o ficheiro para o servidor."]);
        }
    }

    public function listarDocumentos() {
        $estagio_id = isset($_GET['estagio_id']) ? $_GET['estagio_id'] : null;

        if (!$estagio_id) {
            http_response_code(400);
            echo json_encode(["error" => "O parâmetro estagio_id é obrigatório."]);
            return;
        }

        $stmt = $this->documento->listarPorEstagio($estagio_id);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $docs_arr = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $doc_item = [
                    "id" => $id,
                    "nome_ficheiro" => $nome_ficheiro,
                    "caminho_ficheiro" => $caminho_ficheiro,
                    "tipo_documento" => $tipo_documento,
                    "data_upload" => $data_upload
                ];
                array_push($docs_arr, $doc_item);
            }
            http_response_code(200);
            echo json_encode($docs_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
}