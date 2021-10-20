import { Component } from 'react';
import firebase from '../Conexion';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";



export default class Reserva extends Component{
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        form:{
          rut: '',
          especialidad: '',
          sede: '',
          medico: '',
          fecha: '',
          hora: '',
          nombre: '',
          correo: '',
          telefono: '',
        },
        id: 0
      };
    
      peticionGet = () => {
        firebase.child("reserva").on("value", (reserva) => {
          if (reserva.val() !== null) {
            this.setState({ ...this.state.data, data: reserva.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
    
      peticionPost=()=>{
        firebase.child("reserva").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
    
      peticionPut=()=>{
        firebase.child(`reserva/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
    
      peticionDelete=()=>{
        if(window.confirm(`¿Estás seguro que deseas eliminar la reserva?`))
        {
        firebase.child(`reserva/${this.state.id}`).remove(
          error=>{
            if(error)console.log(error)
          });
        }
      }
    
      handleChange=e=>{
        this.setState({form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }})
        console.log(this.state.form);
      }
    
      seleccionarReserva=async(reserva, id, caso)=>{
    
        await this.setState({form: reserva, id: id});
    
        (caso==="Editar")?this.setState({modalEditar: true}):
        this.peticionDelete()
    
      }
    
      componentDidMount() {
        this.peticionGet();
      }
      
    
      render() {
        return (
          <div className="CRUD">
            <br />
            <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
            <br />
            <br />
    
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>RUT</th>
                  <th>Especialidad</th>
                  <th>Sede</th>
                  <th>Médico</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.data).map(i=>{
                 // console.log(i);
                  return <tr key={i}>
                    <td>{this.state.data[i].rut}</td>
                    <td>{this.state.data[i].especialidad}</td>
                    <td>{this.state.data[i].sede}</td>
                    <td>{this.state.data[i].medico}</td>
                    <td>{this.state.data[i].fecha}</td>
                    <td>{this.state.data[i].hora}</td>
                    <td>{this.state.data[i].nombre}</td>
                    <td>{this.state.data[i].correo}</td>
                    <td>{this.state.data[i].telefono}</td>
                    <td>
                      <button className="btn btn-primary" onClick={()=>this.seleccionarReserva(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                      <button className="btn btn-danger" onClick={()=>this.seleccionarReserva(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                    </td>
    
                  </tr>
                })}
              </tbody>
            </table>
    
    
            <Modal isOpen={this.state.modalInsertar}>
          <br />
          <ModalHeader>Insertar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>RUT: </label>
              <br />
              <input type="text" className="form-control" name="rut" onChange={this.handleChange}/>
              <br />
              <label>Especialidad: </label>
              <br />
              <input type="text" className="form-control" name="especialidad" onChange={this.handleChange}/>
              <br />
              <label>Sede: </label>
              <br />
              <input type="text" className="form-control" name="sede" onChange={this.handleChange}/>
              <br />
              <br />
              <label>Médico: </label>
              <br />
              <input type="text" className="form-control" name="medico" onChange={this.handleChange}/>
              <br />
              <label>Fecha: </label>
              <br />
              <input type="text" className="form-control" name="fecha" onChange={this.handleChange}/>
              <br />
              <label>Hora: </label>
              <br />
              <input type="text" className="form-control" name="hora" onChange={this.handleChange}/>
              <br />
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/>
              <br />
              <label>Correo: </label>
              <br />
              <input type="text" className="form-control" name="correo" onChange={this.handleChange}/>
              <br />
              <label>Teléfono: </label>
              <br />
              <input type="text" className="form-control" name="telefono" onChange={this.handleChange}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
          </ModalFooter>
        </Modal>
    
    
    
        <Modal isOpen={this.state.modalEditar}>
        <br />
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>RUT: </label>
              <br />
              <input type="text" className="form-control" name="rut" onChange={this.handleChange} value={this.state.form && this.state.form.rut}/>
              <br />
              <label>Especialidad: </label>
              <br />
              <input type="text" className="form-control" name="especialidad" onChange={this.handleChange} value={this.state.form && this.state.form.especialidad}/>
              <br />
              <label>Sede: </label>
              <br />
              <input type="text" className="form-control" name="sede" onChange={this.handleChange} value={this.state.form && this.state.form.sede}/>
              <br />
              <br />
              <label>Médico: </label>
              <br />
              <input type="text" className="form-control" name="medico" onChange={this.handleChange} value={this.state.form && this.state.form.medico}/>
              <br />
              <label>Fecha: </label>
              <br />
              <input type="text" className="form-control" name="fecha" onChange={this.handleChange} value={this.state.form && this.state.form.fecha}/>
              <br />
              <label>Hora: </label>
              <br />
              <input type="text" className="form-control" name="hora" onChange={this.handleChange} value={this.state.form && this.state.form.hora}/>
              <br />
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/>
              <br />
              <label>Correo: </label>
              <br />
              <input type="text" className="form-control" name="correo" onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
              <br />
              <label>Teléfono: </label>
              <br />
              <input type="text" className="form-control" name="telefono" onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
          </ModalFooter>
        </Modal>
          </div>
        ); 
   }
}