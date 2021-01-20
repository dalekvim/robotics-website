import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik, Form as FForm } from "formik";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
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

const UPDATE_BIO = gql`
  mutation($bio: String!) {
    updateBio(bio: $bio)
  }
`;

export const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const [alert, setAlert] = useState(<></>);
  const [updateBio] = useMutation(UPDATE_BIO);

  if (loading || error) {
    return (
      <Layout>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="warning">{error.message}</Alert>
        ) : null}
      </Layout>
    );
  }

  const { firstName, lastName, bio } = data.currentUser;

  return (
    <Layout>
      {alert}
      <Struct title="Profile Page" importance={1}>
        <Struct title={`You are ${firstName} ${lastName}!`} importance={2}>
          <Struct title="Bio" importance={3}>
            <Formik
              initialValues={{ bio: bio }}
              onSubmit={async ({ bio }, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  const { data } = await updateBio({
                    variables: { bio },
                    refetchQueries: [{ query: CURRENT_USER }],
                  });
                  if (data.updateBio) {
                    setAlert(
                      <Alert variant="success">Your bio was updated!</Alert>
                    );
                  } else {
                    setAlert(
                      <Alert variant="danger">That did not work!</Alert>
                    );
                  }
                } catch (err) {
                  setAlert(<Alert variant="warning">{err.message}</Alert>);
                }
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, handleChange, handleBlur }) => (
                <FForm>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      name="bio"
                      placeholder="About me..."
                      as="textarea"
                      rows={3}
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </FForm>
              )}
            </Formik>
          </Struct>
        </Struct>
      </Struct>
    </Layout>
  );
};
