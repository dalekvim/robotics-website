import { gql, useMutation } from "@apollo/client";
import { Formik, Form as FForm, Field } from "formik";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { RouteComponentProps } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Struct } from "../../components/Struct";

const REGISTER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useMutation(REGISTER);
  const [alert, setAlert] = useState(<></>);

  return (
    <Layout>
      {alert}
      <Struct title="Register Page" importance={1}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (
            { firstName, lastName, email, password, confirmPassword },
            { setSubmitting }
          ) => {
            let err = true;

            if (!firstName || !lastName || !email || !password) {
              setAlert(
                <Alert variant="warning">Empty fields are not allowed.</Alert>
              );
            } else if (password !== confirmPassword) {
              setAlert(
                <Alert variant="warning">Passwords do not match!</Alert>
              );
            } else {
              setAlert(<></>);
              err = false;
            }

            if (!err) {
              setSubmitting(true);
              const { data } = await register({
                variables: { firstName, lastName, email, password },
              });
              if (data.register) {
                setAlert(
                  <Alert variant="success">
                    Successfully created your account!
                  </Alert>
                );
                history.push("/login");
              } else {
                setAlert(<Alert variant="warning">That email is taken.</Alert>);
              }
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <FForm>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Row>
                  <Col>
                    <Field
                      name="firstName"
                      type="input"
                      placeholder="First name"
                      as={Form.Control}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="lastName"
                      type="input"
                      placeholder="Last name"
                      as={Form.Control}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  as={Form.Control}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  as={Form.Control}
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Password"
                  as={Form.Control}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </FForm>
          )}
        </Formik>
      </Struct>
    </Layout>
  );
};
