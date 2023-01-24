<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: *");
  

  $id = $_POST["id"];
  $sku = $_POST["sku"];
  $articulo = $_POST["articulo"];
  $marca = $_POST["marca"];
  $modelo = $_POST["modelo"];
  $departamento_id = $_POST["departamento"];
  $clase_id = $_POST["clase"];
  $familia_id = $_POST["familia"];
  $fecha_alta = $_POST["fecha_alta"];
  $stock = $_POST["stock"];
  $cantidad = $_POST["cantidad"];
  $descontinuado = $_POST["descontinuado"];
  $fecha_baja = $_POST["fecha_baja"];

  $conn = new mysqli("localhost", "root", "", "inventario");

  if ($conn->connect_error) {
    die("ERROR: Unable to connect: " . $conn->connect_error);
  } 

  $result = $conn->query("UPDATE articulos SET sku = '$sku', articulo = '$articulo', marca = '$marca', modelo = '$modelo', departamento_id = '$departamento_id', clase_id = '$clase_id', familia_id = '$familia_id', fecha_alta = '$fecha_alta', fecha_baja = '$fecha_baja', stock = $stock, cantidad = $cantidad, descontinuado = $descontinuado WHERE id = $id");
  header('Content-type: application/json');
  
  if(!$result ){
    echo json_encode( [ "resultado"=> false, "error"=> $conn -> error ] );
    
  }else{
    echo json_encode( [ "resultado"=> true ] );

  }

  //$result->close();

  $conn->close();

//INSERT INTO `articulos` (`id`, `sku`, `articulo`, `marca`, `modelo`, `departamento_id`, `clase_id`, `familia_id`, `fecha_alta`, `stock`, `cantidad`, `descontinuado`, `fecha_baja`) VALUES (NULL, '0704', 'prueba', 'prueba', 'prueba', '1', '1', '1', '2023-01-18', '50', '5', '', '');