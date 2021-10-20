import { Component } from 'react';
import firebase from '../Conexion';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";



export default class Sede extends Component{
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        form:{
          id: 0,
          sede: '',
        },
        id: 0
      };
    
      peticionGet = () => {
        firebase.child("sede").on("value", (sede) => {
          if (sede.val() !== null) {
            this.setState({ ...this.state.data, data: sede.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
    
      peticionPost=()=>{
        firebase.child("sede").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
    
      peticionPut=()=>{
        firebase.child(`sede/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
    
      peticionDelete=()=>{
        if(window.confirm(`¿Estás seguro que deseas eliminar la sede?`))
        {
        firebase.child(`sede/${this.state.id}`).remove(
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
    
      seleccionarsede=async(sede, id, caso)=>{
    
        await this.setState({form: sede, id: id});
    
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
                  <th>Sede</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.data).map(i=>{
                 // console.log(i);
                  return <tr key={i}>
                    <td>{this.state.data[i].id}</td>
                    <td>{this.state.data[i].sede}</td>
                    <td>
                      <button className="btn btn-primary" onClick={()=>this.seleccionarsede(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                      <button className="btn btn-danger" onClick={()=>this.seleccionarsede(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
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
              <label>Sede: </label>
              <br />
              <input type="text" className="form-control" name="sede" onChange={this.handleChange}/>
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
              <label>Sede: </label>
              <br />
              <input type="text" className="form-control" name="sede" onChange={this.handleChange} value={this.state.form && this.state.form.sede}/>
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