<?php
// public/index.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Responde ao preflight do navegador (necessário quando o frontend está
// hospedado em outro domínio e envia JSON — o navegador manda OPTIONS antes)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


define('BASE_PATH', dirname(__DIR__));

require_once BASE_PATH . '/config/database.php';
require_once BASE_PATH . '/src/Controllers/AuthController.php';
require_once BASE_PATH . '/src/Controllers/CompanyController.php';
require_once BASE_PATH . '/src/Controllers/VacancyController.php';
require_once BASE_PATH . '/src/Controllers/ApplicationController.php';
require_once BASE_PATH . '/src/Controllers/ActivityController.php';
require_once BASE_PATH . '/src/Controllers/EvaluationController.php';
require_once BASE_PATH . '/src/Controllers/DocumentController.php';


$database = new Database();
$db = $database->getConnection();
$authController = new AuthController($db);
$companyController = new CompanyController($db);
$applicationController = new ApplicationController($db);
$vacancyController = new VacancyController($db);
$activityController = new ActivityController($db);
$evaluationController = new EvaluationController($db);
$documentController = new DocumentController($db);

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];


$route = str_replace(['/gestao_estagios/public', '/index.php'], '', $request_uri);
$route = explode('?', $route)[0];

$data = json_decode(file_get_contents("php://input"));

switch ($route) {
    case '/register':
        if ($method == 'POST') {
            $authController->registar($data);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido."]);
        }
        break;

    case '/login':
        if ($method == 'POST') {
            $authController->login($data);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido."]);
        }
        break;

    case '/empresas':
    if ($method == 'GET') {
        $companyController->listarEmpresas();
    } elseif ($method == 'POST') {
        $companyController->vincularEmpresa($data);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;
    case '/vagas':
    if ($method == 'GET') {
        $vacancyController->listarVagas();
    } elseif ($method == 'POST') {
        $vacancyController->criarVaga($data);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;
    case '/candidaturas':
    if ($method == 'POST') {
        $applicationController->candidatar($data);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;

 case '/atividades':
    if ($method == 'GET') {
        $activityController->listarAtividades();
    } elseif ($method == 'POST') {
        $activityController->registrarAtividade($data);
    } elseif ($method == 'PUT') { 
        $activityController->editarAtividade($data);
    } elseif ($method == 'DELETE') { 
        $activityController->eliminarAtividade();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;
    case '/estagio-atual':
    if ($method == 'GET') {
        $activityController->obterEstagioAtual();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;

    case '/avaliacoes':
    if ($method == 'GET') {
        $evaluationController->obterAvaliacoes();
    } elseif ($method == 'POST') {
        $evaluationController->criarAvaliacao($data);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;

    case '/documentos':
    if ($method == 'GET') {
        $documentController->listarDocumentos();
    } elseif ($method == 'POST') {
      
        $documentController->uploadDocumento();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido."]);
    }
    break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Rota não encontrada. Rota atual: " . $route]);
        break;
}