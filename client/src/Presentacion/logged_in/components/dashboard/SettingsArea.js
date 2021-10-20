import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Consulta from "./Consulta";

function SettingsArea(props) {
  const { pushMessageToSnackbar } = props;
  return (
    <Fragment>
      <Consulta pushMessageToSnackbar={pushMessageToSnackbar} />
    </Fragment>
  );
}

SettingsArea.propTypes = {
  pushMessageToSnackbar: PropTypes.func
};

export default SettingsArea;
