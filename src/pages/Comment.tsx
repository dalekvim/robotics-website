import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Field, Formik, Form } from "formik";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";
import { Button, FormControl, InputGroup } from "react-bootstrap";

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

  return (
    <Layout>
      <Struct title="The Comment Section" importance={1}>
        <Formik
          initialValues={{ content: "" }}
          onSubmit={async ({ content }, { setSubmitting }) => {
            if (content) {
              setSubmitting(true);
              await createComment({ variables: { content: content } });
              setSubmitting(false);
              window.location.reload();
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
