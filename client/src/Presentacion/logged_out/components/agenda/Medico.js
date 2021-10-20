import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import firebase from "../../../../LogicayConexion/Conexion.js";

export class Medico extends Component {
  state = {
    data: [],
    form:{
      id:0,
      medico: '',
      especialidad:'',
      sede: ''
    }
  }

  peticionGet = () => {
    firebase.child("medico").on("value", (medico) => {
      if (medico.val() !== null) {
        this.setState({ ...this.state.data, data: medico.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  componentDidMount() {
    this.peticionGet();
  }

  continuar = e => {
    const {values} = this.props;
    if(values.especialidad === "0")
    {
      alert('Escoja especialidad')
    
    }
    else if(values.sede === "0" )
    {
      alert('Escoja Sede')
  
    }
    else if(values.medico === "0")
    {
      alert('Escoja Médico')
    }
    else{
      this.props.pasoSiguiente();
      e.preventDefault();
    }
    
  };

  volver = e => {
    e.preventDefault();
    this.props.pasoPrevio();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
      <center>
      <FormControl >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Médico</InputLabel>
        <Select labelId="demo-simple-select-placeholder-label-label" id="demo-simple-select-placeholder-label1"
          name="medico"
          value={values.medico}
          defaultValue={values.medico}
          onChange={handleChange('medico')}
          displayEmpty
        >
        <MenuItem value="0">
          <em>Seleccione</em>
        </MenuItem>
        {Object.keys(this.state.data).map(i=>{
          if(this.state.data[i].sede === values.sede && this.state.data[i].especialidad === values.especialidad)
            {
              return <MenuItem key={this.state.data[i].medico} value={this.state.data[i].medico}>{this.state.data[i].medico}</MenuItem>
            }                
            return null;
        })}    
        </Select>
        <FormHelperText>Escoger Médico</FormHelperText>
      </FormControl>
      </center>
      <br/>
      <br/>
      <center> 
      <Button
        color="secondary"
        variant="contained"
        onClick={this.volver}
        >Volver</Button>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
      <Button
         color="primary"
         variant="contained"
         onClick={this.continuar}
         >Continuar</Button>
     </center> 
      </div>
      
    );
  }
}

export default Medico;