import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "reactstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()} //Redirects to the /authorize part of the url
      variant="primary"
      className="btn-margin"
    >
      Log In
    </Button>
  );
};

export default LoginButton;
