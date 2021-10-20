import { Component } from 'react';
import firebase from '../Conexion';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";



export default class Especialidad extends Component{
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        form:{
          id: 0,
          especialidad: '',
        },
        id: 0
      };
    
      peticionGet = () => {
        firebase.child("especialidad").on("value", (especialidad) => {
          if (especialidad.val() !== null) {
            this.setState({ ...this.state.data, data: especialidad.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
    
      peticionPost=()=>{
        firebase.child("especialidad").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
    
      peticionPut=()=>{
        firebase.child(`especialidad/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
    
      peticionDelete=()=>{
        if(window.confirm(`¿Estás seguro que deseas eliminar la especialidad?`))
        {
        firebase.child(`especialidad/${this.state.id}`).remove(
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
    
      seleccionarespecialidad=async(especialidad, id, caso)=>{
    
        await this.setState({form: especialidad, id: id});
    
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
                  <th>ID</th>
                  <th>Especialidad</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.data).map(i=>{
                 // console.log(i);
                  return <tr key={i}>
                    <td>{this.state.data[i].id}</td>
                    <td>{this.state.data[i].especialidad}</td>
                    <td>
                      <button className="btn btn-primary" onClick={()=>this.seleccionarespecialidad(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                      <button className="btn btn-danger" onClick={()=>this.seleccionarespecialidad(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                    </td>
    
                  </tr>
                })}
              </tbody>
            </table>
    
    
            <Modal isOpen={this.state.modalInsertar}>
            <br />
          <ModalHeader>Registrar Especialidad</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID: </label>
              <br />
              <input type="text" className="form-control" name="id" onChange={this.handleChange}/>
              <br />
              <label>Especialidad: </label>
              <br />
              <input type="text" className="form-control" name="especialidad" onChange={this.handleChange}/>
              <br />
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
              <label>ID: </label>
              <br />
              <input type="text" className="form-control" name="id" onChange={this.handleChange} value={this.state.form && this.state.form.id}/>
              <br />
              <label>Especialidad: </label>
              <br />
              <input type="text" className="form-control" name="especialidad" onChange={this.handleChange} value={this.state.form && this.state.form.especialidad}/>
              <br />
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