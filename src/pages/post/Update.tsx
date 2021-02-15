import { gql, useMutation, useQuery } from "@apollo/client";
import { Field, Formik, Form as FForm } from "formik";
import { useContext, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
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
      content
    }
  }
`;

const UPDATE_POST = gql`
  mutation($_id: String!, $title: String!, $content: String!) {
    updatePost(_id: $_id, title: $title, content: $content)
  }
`;

const DELETE_POST = gql`
  mutation($_id: String!) {
    deletePost(_id: $_id)
  }
`;

interface post {
  _id: string;
  title: string;
  author: any;
  content: string;
}

export const UpdatePost: React.FC = () => {
  const [updatePost] = useMutation(UPDATE_POST);
  const [alert, setAlert] = useState(<></>);
  const { setValue } = useContext(AuthContext);
  const { loading, error, data } = useQuery(POSTS);
  const history = useHistory();
  const { _id } = useParams<{ _id: string }>();
  const [deletePost] = useMutation(DELETE_POST);

  if (loading) return <>Loading...</>;
  if (error) return <>{error}</>;

  const post: { title: string; content: string } = data.posts.reduce(
    (acc: post, post: post) => (post._id === _id ? post : acc),
    { title: "", content: "" }
  );

  return (
    <Layout>
      {alert}
      <Struct title="Update Post" importance={1}>
        <Formik
          initialValues={{ title: post.title, content: post.content }}
          onSubmit={async ({ title, content }, { setSubmitting }) => {
            if (title && content) {
              setAlert(<></>);
              setSubmitting(true);
              try {
                await updatePost({
                  variables: {
                    _id: _id,
                    title: title,
                    content: content,
                  },
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
                Update
              </Button>
              <Button
                className="float-right"
                variant="danger"
                onClick={async () => {
                  try {
                    await deletePost({
                      variables: { _id: _id },
                      refetchQueries: [{ query: POSTS }],
                    });
                    history.push("/");
                  } catch (error) {
                    setAlert(<Alert variant="warning">{error.message}</Alert>);
                  }
                }}
              >
                Delete
              </Button>
            </FForm>
          )}
        </Formik>
      </Struct>
    </Layout>
  );
};
