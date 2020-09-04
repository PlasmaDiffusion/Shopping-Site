import React from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "./loading";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Profile = (props) => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  console.log(user);

  //Call a parent function if it was set
  if (props.onAuthenticated) props.onAuthenticated(name);

  if (props.adminPage && user.email != "scott50000@gmail.com")
    return <p>Not logged in as an admin.</p>;
  else if (props.adminPage) return "";
  else
    return (
      <Container className="mb-5">
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md={2}>
            <img
              src={picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Col>
          <Col md>
            <h2>{name}</h2>
            <p className="lead text-muted">{email}</p>
          </Col>
        </Row>
      </Container>
    );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
