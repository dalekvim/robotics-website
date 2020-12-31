import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

export const Login: React.FC = () => {
  return (
    <Layout>
      <Alert variant="info">This page is under Construction.</Alert>
      <Struct title="Login Page" importance={1}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Struct>
    </Layout>
  );
};
