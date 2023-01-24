import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Form, Card, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment';


function App() {
  const [ id, setId ] = useState('');
  const [ sku, setSku ] = useState('');
  const [ descontinuado, setDescontinuado ] = useState(false);
  const [ articulo, setArticulo ] = useState('');
  const [ marca, setMarca ] = useState('');
  const [ modelo, setModelo ] = useState('');
  const [ departamento, setDepartamento ] = useState('');
  const [ clase, setClase ] = useState('');
  const [ familia, setFamilia ] = useState('');
  const [ stock, setStock] = useState('');
  const [ cantidad, setCantidad ] = useState('');
  const [ fechaAlta, setFechaAlta ] = useState(moment().format('YYYY-MM-DD'));
  const [ fechaBaja, setFechaBaja ] = useState('1900-01-01');

  const [ habilitado, setHabilitado ] = useState(false);

  const [ departamentos, setDepartamentos ] = useState([]);
  const [ clases, setClases ] = useState([]);
  const [ familias, setFamilias ] = useState([]);

  const handleKeyDownSku = async (e) => {
    if(e.key === 'Enter'){
      const result = await axios.get('http://localhost/inventario-api/buscarArticuloPorSku.php?sku='+sku);
      if(result.data.existe){
        const articulo = result.data.articulo;

        setDescontinuado(articulo.descontinuado == 1);
        setId(articulo.id);
        setArticulo(articulo.articulo);
        setMarca(articulo.marca);
        setModelo(articulo.modelo);
        setDepartamento(articulo.departamento_id);
        setClase(articulo.clase_id);
        setFamilia(articulo.familia_id);
        setStock(articulo.stock);
        setCantidad(articulo.cantidad);
        setFechaAlta(moment(articulo.fecha_alta, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        setFechaBaja(moment(articulo.fecha_baja, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        setHabilitado(true);
      } else {
        setDescontinuado(false);
        setId('');
        setArticulo('');
        setMarca('');
        setModelo('');
        setDepartamento('');
        setClase('');
        setFamilia('');
        setStock('');
        setCantidad('');
        setFechaAlta(moment().format('YYYY-MM-DD'));
        setFechaBaja('1900-01-01');
        setHabilitado(true);
      }
    }
  }

  useEffect( () => {
    const getCatalogos = async () => { 
      const result = await axios.get('http://localhost/inventario-api/catalogos.php');
        setDepartamentos(result.data.departamentos);
        setClases(result.data.clases);
        setFamilias(result.data.familias);
     };

     getCatalogos();

  }, []);
  
  const validarGuardar = (params) => {
    if(!params.sku) return {valido: false, mensaje: 'El campo sku es requerido.'};
    if(!params.articulo) return {valido: false, mensaje: 'El campo articulo es requerido.'};
    if(!params.marca) return {valido: false, mensaje: 'El campo marca es requerido.'};
    if(!params.modelo) return {valido: false, mensaje: 'El campo modelo es requerido.'};
    if(!params.departamento) return {valido: false, mensaje: 'El campo departamento es requerido.'};
    if(!params.clase) return {valido: false, mensaje: 'El campo clase es requerido.'};
    if(!params.familia) return {valido: false, mensaje: 'El campo familia es requerido.'};
    if(!params.stock) return {valido: false, mensaje: 'El campo stock es requerido.'};
    if(!params.cantidad) return {valido: false, mensaje: 'El campo cantidad es requerido.'};
    if(Number(params.cantidad) > Number(params.stock)) return {valido: false, mensaje: 'El campo cantidad no debe ser mayor al campo stock.'};
    return {valido: true};
  };

  const handleClickGuardar = async () => { 
    const data = { 
      sku,
      descontinuado,
      articulo,
      marca,
      modelo,
      departamento,
      clase,
      familia,
      stock,
      cantidad,
      fecha_alta: fechaAlta,
      fecha_baja: fechaBaja,
    };

    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const validacion = validarGuardar(data);
    if(validacion.valido){
      const result = await axios.post('http://localhost/inventario-api/guardarArticulo.php', formData);
      handleClickLimpiar();
    } else {
      alert(validacion.mensaje);
    }
  };

  const handleClickActualizar = async () => { 
    const data = { 
      id,
      sku,
      descontinuado,
      articulo,
      marca,
      modelo,
      departamento,
      clase,
      familia,
      stock,
      cantidad,
      fecha_alta: fechaAlta,
      fecha_baja: fechaBaja,
    };

    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    const result = await axios.post('http://localhost/inventario-api/actualizarArticulo.php', formData);
    handleClickLimpiar();
  };
  
  const handleClickEliminar = async () => { 
    const result = await axios.post('http://localhost/inventario-api/eliminarArticulo.php?id='+ id);
    handleClickLimpiar();
  };

  const handleClickLimpiar = async () => { 
    setHabilitado(false);

    setDescontinuado(false);
    setSku('');
    setId('');
    setArticulo('');
    setMarca('');
    setModelo('');
    setDepartamento('');
    setClase('');
    setFamilia('');
    setStock('');
    setCantidad('');
    setFechaAlta(moment().format('YYYY-MM-DD'));
    setFechaBaja('1900-01-01');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <Card>
            <Card.Body>
              <Row>
                <Col xs lg="8">
                  <Form.Group className="mb-3">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="SKU" 
                      value={sku}  
                      onChange={ (e) => setSku(e.target.value) } 
                      onKeyDown={ handleKeyDownSku } 

                    />
                  </Form.Group>
                </Col>
                <Col xs lg="4">
                  <Form.Group className="mb-3" >
                    <Form.Label>&nbsp;</Form.Label>
                    <Form.Check type="checkbox" label="Descontinuado" checked={descontinuado} disabled={!id || !habilitado} onChange={(e) => {setDescontinuado(e.target.checked); setFechaBaja(moment().format('YYYY-MM-DD'));} }  />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Articulo</Form.Label>
                <Form.Control type="text" placeholder="Articulo" value={articulo} disabled={!habilitado} onChange={(e) => setArticulo(e.target.value) } />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" placeholder="Marca" value={marca} disabled={!habilitado} onChange={(e) => setMarca(e.target.value) } />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control type="text" placeholder="Modelo" value={modelo} disabled={!habilitado} onChange={(e) => setModelo(e.target.value) } />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Select value={departamento} onChange={(e) => {setDepartamento(e.target.value);setClase('');setFamilia('')} } disabled={!habilitado} >
                  <option disabled value="">Selecciona una opción</option>
                  {departamentos.map((d) => (
                    <option value={d.id}>{d.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Clase</Form.Label>
                <Form.Select value={clase} onChange={(e) => {setClase(e.target.value);setFamilia('');} } disabled={ !habilitado || !departamento } >
                  <option disabled value="">Selecciona una opción</option>
                  {clases.filter((c)=> c.departamento_id === departamento).map((c) => (
                    <option value={c.id}>{c.nombre}</option>
                  ))}
                </Form.Select>
  
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Familia</Form.Label>
                <Form.Select value={familia} onChange={(e) => setFamilia(e.target.value) } disabled={ !habilitado || !clase } >
                  <option disabled value="">Selecciona una opción</option>
                  {familias.filter((c)=> c.clase_id === clase).map((f) => (
                    <option value={f.id}>{f.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Row>
                <Col xs lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" placeholder="Stock" value={stock} disabled={!habilitado} onChange={(e) => setStock(e.target.value) } />
                  </Form.Group>
                </Col>
                <Col xs lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" placeholder="Cantidad" value={cantidad} disabled={!habilitado} onChange={(e) => setCantidad(e.target.value) } />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha alta</Form.Label>
                    <Form.Control type="date" placeholder="" value={fechaAlta} disabled onChange={(e) => setFechaAlta(e.target.value) } />
                  </Form.Group>
                </Col>
                <Col xs lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha baja</Form.Label>
                    <Form.Control type="date" placeholder="" value={fechaBaja} disabled onChange={(e) => setFechaBaja(e.target.value) } />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="button" className='me-5' onClick={handleClickGuardar} disabled={id || !habilitado} >
                Guardar
              </Button>
              <Button variant="success" type="button" className='me-5' onClick={handleClickActualizar} disabled={!id || !habilitado} >
                Actualizar
              </Button>
              <Button variant="danger" type="button" className='me-5' onClick={handleClickEliminar} disabled={!id || !habilitado} >
                Eliminar
              </Button>
              <Button variant="warning" type="button" onClick={handleClickLimpiar}  >
                Limpiar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
