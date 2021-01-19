import { Field, Formik, Form as FForm } from "formik";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { setAccessToken } from "../accessToken";
import { RouteComponentProps } from "react-router-dom";

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useMutation(LOGIN);
  const [alert, setAlert] = useState(<></>);

  return (
    <Layout>
      {alert}
      <Struct title="Login Page" importance={1}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async ({ email, password }, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const { data } = await login({ variables: { email, password } });
              setAccessToken(data!.login.accessToken);
              setAlert(
                <Alert variant="success">Logged in successfully.</Alert>
              );
              history.push("/profile");
            } catch (err) {
              setAlert(<Alert variant="warning">{err.message}</Alert>);
            }
            setSubmitting(false);
          }}
        >
          {() => (
            <FForm>
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </FForm>
          )}
        </Formik>
      </Struct>
    </Layout>
  );
};
