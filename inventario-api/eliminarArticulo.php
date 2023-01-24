<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: *");
  

  $id = $_GET["id"];


  $conn = new mysqli("localhost", "root", "", "inventario");

  if ($conn->connect_error) {
    die("ERROR: Unable to connect: " . $conn->connect_error);
  } 

  $result = $conn->query("DELETE FROM articulos WHERE id = $id");

  header('Content-type: application/json');
  echo json_encode( [ "resultado"=> true ] );

  //$result->close();

  $conn->close();

//INSERT INTO `articulos` (`id`, `sku`, `articulo`, `marca`, `modelo`, `departamento_id`, `clase_id`, `familia_id`, `fecha_alta`, `stock`, `cantidad`, `descontinuado`, `fecha_baja`) VALUES (NULL, '0704', 'prueba', 'prueba', 'prueba', '1', '1', '1', '2023-01-18', '50', '5', '', '');