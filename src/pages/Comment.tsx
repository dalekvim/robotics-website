import React, { ChangeEvent, useState } from "react";
import {
  Alert,
  InputGroup,
  FormControl,
  ListGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

const fetchQuery = async (query: string, variables: {}): Promise<any> => {
  const res = await fetch(
    "https://limitless-springs-67845.herokuapp.com/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }
  );
  return res.json();
};

const fetchComments = async () => {
  const data = await fetchQuery(
    `
    query {
      comments {
        _id
        content
      }
    }
  `,
    {}
  );
  return data.data.comments;
};

const postComment = async (content: string) => {
  return await fetchQuery(
    `
    mutation ($content: String!) {
      postComment(content: $content) {
        content
      }
    }
  `,
    { content: content }
  )
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};

interface ICommentState {
  _id: string;
  content: string;
}

export const Comment: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<ICommentState[]>(() => []);
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  const refreshComments = async () => {
    const comments: ICommentState[] = await fetchComments();
    setComments(comments);
    setLoading(false);
  };

  refreshComments();

  return (
    <Layout>
      <Alert variant="info">This page is under Maintenence.</Alert>
      <Struct title="The Comment Section" importance={1}>
        <InputGroup>
          <InputGroup.Prepend>
            <Button variant="outline-secondary">Button</Button>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            value={value}
            onChange={handleChange}
          />
        </InputGroup>
        {value}
        <ListGroup>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            comments.map(({ _id, content }) => (
              <ListGroup.Item key={_id}>{content}</ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Struct>
    </Layout>
  );
};
