import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

export class Confirmar extends Component {
  constructor() {
    super();
    this.enviarEmail = this.enviarEmail.bind(this);
  }
  continuar = e => {
    e.preventDefault();
    this.props.pasoSiguiente();
  };

  volver = e => {
    e.preventDefault();
    this.props.pasoPrevio();
  };
  async enviarEmail(e) {
    e.preventDefault();
    const { values : {rut, especialidad, sede, medico, fecha, hora, nombre, correo, telefono} } = this.props;
    await axios.post("/api/form", {
      rut,
      especialidad,
      sede,
      medico,
      fecha,
      hora,
      nombre,
      correo,
      telefono
    });
  }
  
  render() {
    const {
      values: { rut, especialidad, sede, medico, fecha, hora, nombre, correo, telefono }, peticionPost
    } = this.props;
    return (    
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <center><Typography component={'span'} variant={'h4'}>Confirmación de datos</Typography></center>
        <br/>    
        <Grid container justify = "center">
        <form className="formulario" onSubmit={this.enviarEmail}>
            <List>
              <ListItem>
                <ListItemText primary="Rut" secondary={rut} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Especialidad" secondary={especialidad} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Sede" secondary={sede} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Médico" secondary={medico} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Fecha" secondary={fecha} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Hora" secondary={hora} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Nombre" secondary={nombre} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Correo" secondary={correo} />
              </ListItem>
              <ListItem>
                <ListItemText  primary="Teléfono" secondary={telefono} />
              </ListItem>
            </List>
            <br />
            <Button type="submit" color="primary" variant="contained">
              Enviar email
            </Button>
          </form>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <center> 
            <Button
              color="secondary"
              variant="contained"
              onClick={this.volver}
            >Volver</Button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            <Button
              color="primary"
              variant="contained"
              onClick={()=>{ peticionPost(); this.props.pasoSiguiente();}}
            >Confirmar & Continuar</Button>
          </center> 
        </div>  
    );
  }
}

export default Confirmar;
