<?php

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  $sku = $_GET["sku"];

  $conn = new mysqli("localhost", "root", "", "inventario");

  if ($conn->connect_error) {
    die("ERROR: Unable to connect: " . $conn->connect_error);
  } 

  $result = $conn->query("SELECT * FROM articulos WHERE sku = $sku");

  header('Content-type: application/json');
  echo json_encode( ["existe"=> $result->num_rows > 0, "articulo"=> $result->fetch_object() ] );

  $result->close();

  $conn->close();

