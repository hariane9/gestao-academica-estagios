<?php
// src/Controllers/AuthController.php

require_once dirname(dirname(__DIR__)) . '/src/Models/Usuario.php';

class AuthController {
    private $db;
    private $utilizador;

    public function __construct($db) {
        $this->db = $db;
        $this->utilizador = new Usuario($db); // Instancia o teu modelo Usuario
    }

    // 1. Registo de Utilizador
    public function registar($data) {
        if (!isset($data->nome) || !isset($data->email) || !isset($data->senha) || !isset($data->tipo)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para registo."]);
            return;
        }

        if (!in_array($data->tipo, ['aluno', 'empresa', 'supervisor'])) {
            http_response_code(400);
            echo json_encode(["error" => "O tipo de utilizador deve ser 'aluno', 'empresa' ou 'supervisor'."]);
            return;
        }

        $this->utilizador->nome = $data->nome;
        $this->utilizador->email = $data->email;
        $this->utilizador->senha = $data->senha;
        $this->utilizador->tipo = $data->tipo;

        if ($this->utilizador->criar()) {
            http_response_code(201);
            echo json_encode(["message" => "Utilizador registado com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Não foi possível criar o utilizador. O email já pode estar registado."]);
        }
    }

    // 2. Login de Utilizador (Retorno atualizado para o React)
    public function login($data) {
        if (!isset($data->email) || !isset($data->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos. Email e senha são obrigatórios."]);
            return;
        }

        $this->utilizador->email = $data->email;

        // O método emailExiste() procura o utilizador e preenche as propriedades do objeto caso encontre
        if ($this->utilizador->emailExiste()) {
            
            // Verifica se a senha enviada corresponde ao hash encriptado na BD
            if (password_verify($data->senha, $this->utilizador->senha)) {
                
                http_response_code(200);
                // Retorno estruturado com o nó 'user' para o React+Vite mapear as rotas
                echo json_encode([
                    "message" => "Login efetuado com sucesso!",
                    "user" => [
                        "id" => (int)$this->utilizador->id,
                        "nome" => $this->utilizador->nome,
                        "email" => $this->utilizador->email,
                        "tipo" => $this->utilizador->tipo
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Senha incorreta."]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Utilizador não encontrado com este email."]);
        }
    }
}