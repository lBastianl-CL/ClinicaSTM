import React, { Component } from 'react';
import Rut from './Rut';
import Especialidad from './Especialidad';
import Confirmar from './Confirmar';
import Final from './Final';
import Calendario from './Calendario';
import Medico from './Medico';
import Sede from './Sede';
import firebase from "../../../../LogicayConexion/Conexion.js";

export class Agenda extends Component {
  state = {
    paso: 1,
    rut: '',
    especialidad: '0',
    sede: '0',
    medico: '0',
    fecha: '',
    hora: '',
    nombre:'',
    correo:'',
    telefono:'',
  };
  
  peticionPost=()=>{
    firebase.child("reserva").push(this.state,
      error=>{
        if(error)console.log(error)
      });
  }
  pasoSiguiente = () => {
    const { paso } = this.state;
    this.setState({
      paso: paso + 1
    });
  };
  
  pasoPrevio = () => {
    const { paso } = this.state;
    this.setState({
      paso: paso - 1
    });
  };

  asignarFecha = () =>{
    var fechahoy = new Date();
    var fecharequerida = fechahoy.getFullYear()+'-'+('0'+(fechahoy.getMonth()+1)).slice(-2)+'-'+('0'+fechahoy.getDate()).slice(-2);
    var horarequerida = ('0'+(fechahoy.getHours())).slice(-2)+':'+('0'+(fechahoy.getMinutes())).slice(-2);
    this.setState({ fecha: fecharequerida});
    this.setState({ hora : horarequerida});
  }
  handleChangeFecha =  date => {
    var fecharecibida = new Date(date)
    var fecharequerida = fecharecibida.getFullYear()+'-'+('0'+(fecharecibida.getMonth()+1)).slice(-2)+'-'+('0'+fecharecibida.getDate()).slice(-2);
    var horarequerida = ('0'+(fecharecibida.getHours())).slice(-2)+':'+('0'+(fecharecibida.getMinutes())).slice(-2);
    this.setState({ fecha: fecharequerida});
    this.setState({ hora : horarequerida});
    
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  componentDidMount(){
    this.asignarFecha();
  }
  
  render() {
    const { paso } = this.state;
    const { rut, especialidad, sede, medico, fecha, hora, nombre, correo , telefono} = this.state;
    const values = { rut, especialidad, sede, medico, fecha, hora, nombre, correo, telefono };
    switch (paso) {
      case 1:
        return (
          <Rut
            pasoSiguiente={this.pasoSiguiente}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          
          <div>
          <Especialidad
            values={values}
            handleChange={this.handleChange}
          />

          <Sede
            handleChange={this.handleChange}
            values={values}
          />

          <Medico
            pasoSiguiente={this.pasoSiguiente}
            pasoPrevio={this.pasoPrevio}
            handleChange={this.handleChange}
            values={values}
          />
          </div>
          
        );
      case 3:
        return (
          <Calendario
          pasoSiguiente={this.pasoSiguiente}
          pasoPrevio={this.pasoPrevio}
          handleChangeFecha={this.handleChangeFecha}
          handleChange={this.handleChange}
          values={values}
        />
        );
      case 4:
        return(
          <Confirmar
            pasoSiguiente={this.pasoSiguiente}
            pasoPrevio={this.pasoPrevio}
            values={values}
            peticionPost={this.peticionPost}
          />
        );
      case 5:
        return <Final />;
        
      default:
      return 'Paso no encontrado';
    }
  }
}

export default Agenda;
