import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import firebase from "../../../../LogicayConexion/Conexion.js";

export class Especialidad extends Component {
    state = {
      data: [],
      form:{
        id:0,
          especialidad: '',
      }
    }

    peticionGet = () => {
      firebase.child("especialidad").on("value", (especialidad) => {
        if (especialidad.val() !== null) {
          this.setState({ ...this.state.data, data: especialidad.val() });
        } else {
            this.setState({ data: [] });
        }
        });
      };

    componentDidMount() {
      this.peticionGet();
    }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <center><Typography component={'span'} variant={'h4'}>Seleccione Especialidad y Sede</Typography></center>
        <center>
        <br/>
        <br/>
        <br/>
      <FormControl >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Especialidad</InputLabel>
        <Select labelId="demo-simple-select-placeholder-label-label" id="demo-simple-select-placeholder-label1"
          name="especialidad"
          value = {values.especialidad}
          defaultValue={values.especialidad}
          onChange={handleChange('especialidad')}
          displayEmpty
        >
        <MenuItem value="0">
        <em>Seleccione</em>
        </MenuItem>
        {Object.keys(this.state.data).map(i=>{
          return <MenuItem key={this.state.data[i].especialidad} value={this.state.data[i].especialidad}>{this.state.data[i].especialidad}</MenuItem>     
        })}       
          
      </Select>
      <FormHelperText>Escoger Especialidad</FormHelperText>
      </FormControl>
      </center>
      <br/>
      <br/>  
      </div>
    );
  }
}

export default Especialidad;
