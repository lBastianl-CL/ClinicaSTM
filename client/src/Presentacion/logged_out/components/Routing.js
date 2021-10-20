import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Agenda from "./agenda/Agenda";

function Routing(props) {
  const {selectHome} = props;
  return (
    <Switch>
      <PropsRoute exact path="/agenda" component={Agenda}  />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
};

export default memo(Routing);
