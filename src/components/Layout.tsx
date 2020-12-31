import { Container } from "react-bootstrap";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};
