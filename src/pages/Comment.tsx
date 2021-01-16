import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Field, Formik, Form } from "formik";
import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

const COMMENTS = gql`
  query {
    comments {
      _id
      content
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation($content: String!) {
    createComment(content: $content) {
      _id
      content
    }
  }
`;

interface IComment {
  _id: string;
  content: string;
}

export const Comment: React.FC = () => {
  const { loading, error, data } = useQuery(COMMENTS);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [alert, setAlert] = useState(<></>);

  return (
    <Layout>
      {alert}
      <Struct title="The Comment Section" importance={1}>
        <Formik
          initialValues={{ content: "" }}
          onSubmit={async ({ content }, { setSubmitting, resetForm }) => {
            if (content) {
              setAlert(<></>);
              setSubmitting(true);
              await createComment({
                variables: { content: content },
                refetchQueries: [{ query: COMMENTS }],
              });
              resetForm();
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
          {({ isSubmitting }) => (
            <Form>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button
                    variant="outline-secondary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Post
                  </Button>
                </InputGroup.Prepend>
                <Field
                  placeholder="Comment..."
                  name="content"
                  type="input"
                  as={FormControl}
                />
              </InputGroup>
            </Form>
          )}
        </Formik>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : error ? (
          `Error! ${error.message}`
        ) : (
          data.comments
            .slice()
            .reverse()
            .map(({ _id, content }: IComment) => (
              <ListGroup.Item key={_id}>{content}</ListGroup.Item>
            ))
        )}
      </Struct>
    </Layout>
  );
};
