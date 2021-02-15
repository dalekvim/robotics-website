import { gql, useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

interface Props {
  _id: string;
  author: {
    _id: string;
  };
  title: string;
  content: string;
}

const MEMBERS = gql`
  query {
    members {
      _id
      firstName
      lastName
    }
  }
`;

export const Post: React.FC<Props> = ({ _id, author, title, content }) => {
  const { loading, error, data } = useQuery(MEMBERS);
  const history = useHistory();

  if (loading) return <>Loading...</>;
  if (error) return <>{error}</>;

  return (
    <Card className="mb-3">
      <Card.Header as="h5">
        {data.members.map(
          (member: { _id: string; firstName: string; lastName: string }) =>
            member._id === author._id
              ? `By ${member.firstName} ${member.lastName}`
              : null
        )}
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Button
          variant="primary"
          onClick={() => history.push(`/post/update/${_id}`)}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};
