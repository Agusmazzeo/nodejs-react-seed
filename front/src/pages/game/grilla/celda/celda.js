import React from "react";
import classes from "./celda.module.css";

const Celda = props => (
  <div className={classes.celda} onClick={() => props.handleClick()}>
    {renderButtonCelda(props.value)}
  </div>
);

const renderButtonCelda = value => {
  if (value === 1) {
    return <div className={classes.redButton} />;
  } else if (value === 2) {
    return <div className={classes.blueButton} />;
  } else {
    return null;
  }
};

export default Celda;
