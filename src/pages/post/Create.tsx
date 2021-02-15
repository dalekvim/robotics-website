import { gql, useMutation } from "@apollo/client";
import { Field, Formik, Form as FForm } from "formik";
import { useContext, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../accessToken";
import { AuthContext } from "../../AuthContext";
import { Layout } from "../../components/Layout";
import { Struct } from "../../components/Struct";

const POSTS = gql`
  query {
    posts {
      _id
      title
      author {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

const CREATE_POST = gql`
  mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content)
  }
`;

export const CreatePost: React.FC<RouteComponentProps> = ({ history }) => {
  const [createPost] = useMutation(CREATE_POST);
  const [alert, setAlert] = useState(<></>);
  const { setValue } = useContext(AuthContext);

  return (
    <Layout>
      {alert}
      <Struct title="Create Post" importance={1}>
        <Formik
          initialValues={{ title: "", content: "" }}
          onSubmit={async ({ title, content }, { setSubmitting }) => {
            if (title && content) {
              setAlert(<></>);
              setSubmitting(true);
              try {
                await createPost({
                  variables: { title: title, content: content },
                  refetchQueries: [{ query: POSTS }],
                });
                history.push("/");
              } catch {
                setAccessToken("");
                setValue(false);
                setAlert(
                  <Alert variant="warning">You are not authenticated.</Alert>
                );
              }
              setSubmitting(false);
            } else {
              setAlert(
                <Alert variant="warning">
                  You can't post an empty comment.
                </Alert>
              );
            }
          }}
        >
          {({ values, isSubmitting, handleChange, handleBlur }) => (
            <FForm>
              <Form.Group>
                <Field
                  placeholder="Title..."
                  name="title"
                  type="input"
                  as={Form.Control}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  name="content"
                  placeholder="Content..."
                  as="textarea"
                  rows={3}
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Post
              </Button>
            </FForm>
          )}
        </Formik>
      </Struct>
    </Layout>
  );
};
