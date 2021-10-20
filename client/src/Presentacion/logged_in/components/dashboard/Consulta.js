import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
import Bordered from "../../../shared/components/Bordered";
import Reserva from "../../../../LogicayConexion/Colecciones/Reserva";
import Especialidad from "../../../../LogicayConexion/Colecciones/Especialidad";
import Medico from "../../../../LogicayConexion/Colecciones/Medico";
import Sede from "../../../../LogicayConexion/Colecciones/Sede";

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  accordionDetails: {
    paddintTop: theme.spacing(0),
    justifyContent: "flex-end",
  },
});

function Consulta(props) {
  const { classes } = props;
 

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Información de la Reserva</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            <ListItem className="listItemLeftPadding" disableGutters>                   
                <Reserva />    
            </ListItem>
          </Bordered>
        </List>
      </AccordionDetails>

      <AccordionSummary>
        <Typography>Registrar Nueva Especialidad</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            <ListItem className="listItemLeftPadding" disableGutters>                   
                <Especialidad />            
            </ListItem>
          </Bordered>
        </List>
      </AccordionDetails>

      <AccordionSummary>
        <Typography>Registrar Nueva Sede</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            <ListItem className="listItemLeftPadding" disableGutters>                   
                <Sede> <div /></Sede>  
            </ListItem>
          </Bordered>
        </List>
      </AccordionDetails>

      <AccordionSummary>
        <Typography>Registrar Nuevo Médico</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            <ListItem className="listItemLeftPadding" disableGutters>                   
                <Medico> <div /></Medico> 
            </ListItem>
          </Bordered>
        </List>
      </AccordionDetails>
    </Accordion>

    
    
  );
}

Consulta.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Consulta));
