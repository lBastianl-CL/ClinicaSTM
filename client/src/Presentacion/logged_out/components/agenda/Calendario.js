import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {setMinutes, setHours} from "date-fns";
import firebase from "../../../../LogicayConexion/Conexion.js";

export class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiemposexcluidos: []
    };
  }

    continuar = e => {
      const {values} = this.props;
      const fechahoy = new Date();
      var fecha = fechahoy.getFullYear()+'-'+('0'+(fechahoy.getMonth()+1)).slice(-2)+'-'+('0'+fechahoy.getDate()).slice(-2);
      var hora = ('0'+(fechahoy.getHours())).slice(-2)+':'+('0'+(fechahoy.getMinutes())).slice(-2);
      if(fecha === values.fecha)
      {
        alert('Ingrese una Fecha dentro del rango disponible')
      }
      else if(hora === values.hora)
      {
        alert('Ingrese una Hora dentro del rango disponible')
      }
      else if(values.nombre === "")
      {
        alert('Ingrese un nombre')
      }
      else if(values.correo === "")
      {
        alert('Ingrese un Correo')
      }
      else if(values.telefono === "")
      {
        alert('Ingrese un número de teléfono')
      }
      else{
        e.preventDefault();
        this.props.pasoSiguiente();
        
      }      
    };
  
    volver = e => {
      e.preventDefault();
      this.props.pasoPrevio();
    };

    desactivar_tiempos = date =>{
    const {values} = this.props;
    const fechas = [];
    firebase.child("reserva").on("child_added", function(snapshot) {
        var reserva = snapshot.val();
        if(reserva.medico === values.medico){
          fechas.push(new Date(reserva.fecha+'T'+reserva.hora));
        }
    });
    let arrfechasespecificas = [];
      for (let i = 0; i < fechas.length; i++) {
        if (
          moment(date, moment.ISO_8601).format("YYYY-MM-DD") ===
          moment(fechas[i], moment.ISO_8601).format("YYYY-MM-DD")
        ) {
          arrfechasespecificas.push(moment(fechas[i], moment.ISO_8601).toObject());
        }
      }
  
      let arrtiemposexcluidos = [];
      for (let i = 0; i < arrfechasespecificas.length; i++) {
        arrtiemposexcluidos.push(
          setHours(
            setMinutes(new Date(), arrfechasespecificas[i].minutes),
            arrfechasespecificas[i].hours
          )
        );
        this.setState({
          tiemposexcluidos: arrtiemposexcluidos
        });
      }
    } 

    desactivar_tiempopasado(time){
    const fechadehoy = new Date();
    const fechaseleccionada = new Date(time);
    return fechadehoy.getTime() < fechaseleccionada.getTime();
    }

    desactivar_findesemanas(date){
      var fechahoy = new Date(date);
      return fechahoy.getDay() !== 0 && fechahoy.getDay() !== 6;
    }
    
    componentDidMount(){
      this.desactivar_tiempos();
    }

    render() {
      const { values, handleChange, handleChangeFecha} = this.props;
      const { tiemposexcluidos } = this.state;
      var convertirfecha = new Date(values.fecha+'T'+values.hora);
      return (
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <center><Typography component={'span'} variant={'h4'}>Agendar</Typography></center> 
        <br/>
        <br/>
        <br/>
        <form noValidate >             
                <center>
                <Typography component={'span'} variant={'h6'}>Escoger fecha y hora</Typography>
                <br />
                <br />
                <div className="container">
                <Typography component={'span'} variant={'subtitle2'}>Seleccione Fecha</Typography>
                <br />
                <br />
                <DatePicker
                  filterDate={this.desactivar_findesemanas}
                  selected={convertirfecha}
                  onChange={handleChangeFecha}
                  onSelect={this.desactivar_tiempos}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                />
                <br />
                <br />
                <Typography component={'span'} variant={'subtitle2'}>Seleccione Hora</Typography>
                <br />
                <br />
                <DatePicker
                  selected={convertirfecha}
                  excludeTimes={tiemposexcluidos}
                  onChange={handleChangeFecha}
                  onSelect={this.desactivar_tiempos}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  dateFormat="hh:mm aa"
                  filterTime={this.desactivar_tiempopasado} 
                  minDate={new Date()}
                  minTime={setHours(setMinutes(new Date(), 0), 7)}
                  maxTime={setHours(setMinutes(new Date(), 0), 19)}
                />
                </div>
                <br />
                <br />
                <Typography component={'span'} variant={'h6'}>Ingrese Datos de Contacto</Typography>
                <br />
                <br />
                <TextField name="name" id="standard-basic"  label="Ingrese Nombre:" defaultValue={values.nombre} onChange={handleChange('nombre')}  InputLabelProps={{shrink: true}}/>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <TextField name="email" id="standard-basic"  label="Correo:" defaultValue={values.correo} onChange={handleChange('correo')}  InputLabelProps={{shrink: true,}}/>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <TextField name="telefono" id="standard-basic"  label="Ingrese Teléfono:" defaultValue={values.telefono} onChange={handleChange('telefono')}  InputLabelProps={{shrink: true}}/> 
                </center>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
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
  
  export default Calendario;