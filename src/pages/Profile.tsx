import { gql, useQuery } from "@apollo/client";
import Alert from "react-bootstrap/Alert";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

const CURRENT_USER = gql`
  {
    currentUser {
      _id
      email
      firstName
      lastName
      bio
    }
  }
`;

export const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading || error) {
    return (
      <Layout>
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <>
            <Alert variant="warning">{error.message}</Alert>
            <p>
              If the error says your not authenticated, you might want to login.
            </p>
          </>
        ) : null}
      </Layout>
    );
  }

  const { firstName, lastName, bio } = data.currentUser;

  return (
    <Layout>
      <Struct title="Profile Page" importance={1}>
        <Struct title={`You are ${firstName} ${lastName}!`} importance={2}>
          <Struct title="Bio" importance={3}>
            {bio!}
          </Struct>
        </Struct>
      </Struct>
    </Layout>
  );
};
