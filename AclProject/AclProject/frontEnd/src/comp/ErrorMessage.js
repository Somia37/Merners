import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant , children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20, fontFamily: 'ui-sans-serif'}}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;