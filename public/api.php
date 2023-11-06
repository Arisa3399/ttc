<?php
$res = [
  // "server" => $_SERVER,
  "ip"     => $_SERVER['REMOTE_ADDR'],
  "port"   => $_SERVER['SERVER_PORT'],
  "server" => $_SERVER['SERVER_NAME'],
  "uri"    => $_SERVER['REQUEST_URI'],
  "user_agent" => $_SERVER['HTTP_USER_AGENT'],
];

echo json_encode($res , JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);