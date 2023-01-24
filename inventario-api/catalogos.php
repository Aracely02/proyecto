<?php

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  $conn = new mysqli("localhost", "root", "", "inventario");

  if ($conn->connect_error) {
    die("ERROR: Unable to connect: " . $conn->connect_error);
  } 

  $resultDepartamentos = $conn->query("SELECT * FROM departamentos");
  $departamentos = [];

  while( $row = $resultDepartamentos->fetch_object() ){
    $departamentos [] = $row;
  }

  $resultClases = $conn->query("SELECT * FROM clases");
  $clases = [];

  while( $row = $resultClases->fetch_object() ){
    $clases [] = $row;
  }

  $resultFamilias = $conn->query("SELECT * FROM familias");
  $familias = [];

  while( $row = $resultFamilias->fetch_object() ){
    $familias [] = $row;
  }

  header('Content-type: application/json');
  echo json_encode( [
    "departamentos"=> $departamentos,
    "clases"=> $clases,
    "familias"=> $familias,
  ] );

  $conn->close();

