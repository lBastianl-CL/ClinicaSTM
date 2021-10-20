import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Rut extends Component {

  continuar = e => {
    const {values} = this.props;
    const { validarRUT } = require('validar-rut')
    if(values.rut === '')
    {
      alert('Ingrese un Rut') 
    }
    else if(validarRUT(values.rut) === true){
      alert('Su rut es válido')
      e.preventDefault();
      this.props.pasoSiguiente();
    }
    else{
      alert('Su rut es inválido')
    }
  };

  render() {
    const { values, handleChange} = this.props;
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <form >
        <center><Typography component={'span'} variant={'h4'}>Ingrese Rut</Typography></center>
        <br />
        <br />
        <center>
        <TextField id="rut" defaultValue={values.rut} onChange={handleChange('rut')} label="Rut:"  InputLabelProps={{shrink: true,}}/>
        </center>
        
      </form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <center>
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

export default Rut;
