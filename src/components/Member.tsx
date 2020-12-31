import { Card } from "react-bootstrap";

interface IMemberProps {
  name: string;
  email: string;
}

export const Member: React.FC<IMemberProps> = ({ name, email, children }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{email}</Card.Subtitle>
        <Card.Text>{children}</Card.Text>
      </Card.Body>
    </Card>
  );
};
