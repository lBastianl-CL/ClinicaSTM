import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import firebase from "../../../../LogicayConexion/Conexion.js";

export class Sede extends Component {
  state = {
    data: [],
    form:{
      id:0,
      sede: '',
    }
  }

  peticionGet = () => {
    firebase.child("sede").on("value", (sede) => {
      if (sede.val() !== null) {
        this.setState({ ...this.state.data, data: sede.val() });
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
      <center>
      <FormControl >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">Sede</InputLabel>
        <Select labelId="demo-simple-select-placeholder-label-label" id="demo-simple-select-placeholder-label1"
          name="especialidad"
          value={values.sede}
          defaultValue={values.sede}
          onChange={handleChange('sede')}
          displayEmpty
        >
        <MenuItem value="0">
          <em>Seleccione</em>
        </MenuItem>
        {Object.keys(this.state.data).map(i=>{
            return <MenuItem key={this.state.data[i].sede} value={this.state.data[i].sede}>{this.state.data[i].sede}</MenuItem>     
        })}  
        </Select>
        <FormHelperText>Escoger Sede</FormHelperText>
      </FormControl>
      </center>
      <br/>
      <br/>  
      </div>
    );
  }
}

export default Sede;