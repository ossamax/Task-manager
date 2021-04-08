import React from "react";

const Alert = ({ type, msg }) => {
  return <div className={`alert ${type}`}>{msg}</div>;
};

export default Alert;
