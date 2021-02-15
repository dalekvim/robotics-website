import { gql, useQuery } from "@apollo/client";
import { Layout } from "../components/Layout";
import { Member } from "../components/Member";

const MEMBERS = gql`
  query {
    members {
      _id
      firstName
      lastName
      email
      bio
    }
  }
`;

interface member {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export const Contact: React.FC = () => {
  const { loading, error, data } = useQuery(MEMBERS);

  if (loading) return <>Loading...</>;
  if (error) return <>{error}</>;

  return (
    <Layout>
      <h1>Contact Us</h1>
      <div>
        {data.members.map((member: member) => (
          <Member
            name={`${member.firstName} ${member.lastName}`}
            email={member.email}
          >
            {member.bio}
          </Member>
        ))}
      </div>
    </Layout>
  );
};
