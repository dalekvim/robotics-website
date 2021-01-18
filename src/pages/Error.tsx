import Alert from "react-bootstrap/Alert";
import { Layout } from "../components/Layout";

export const Error: React.FC = () => {
  return (
    <Layout>
      <Alert variant="warning">404 page not found</Alert>
    </Layout>
  );
};
