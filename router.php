<?php
// router.php — usado APENAS pelo servidor embutido do PHP em produção (Railway).
// Se a URL corresponder a um arquivo real dentro de public/ (ex: uploads/x.pdf),
// deixa o servidor entregá-lo; caso contrário, encaminha para a API (index.php).
// Não interfere no ambiente local (WAMP/Apache ignora este arquivo).

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . '/public' . $path;

if ($path !== '/' && file_exists($file) && !is_dir($file)) {
    return false;
}

require __DIR__ . '/public/index.php';
