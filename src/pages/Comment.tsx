import React, { ChangeEvent, useEffect, useState } from "react";
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

interface ICommentState {
  _id: string;
  content: string;
}

export const Comment: React.FC = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<ICommentState[]>(() => []);

  const refreshComments = async () => {
    const comments: ICommentState[] = await fetchComments();
    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      refreshComments();
    }
    return () => {
      unmounted = true;
    };
  });

  const postComment = async (content: string) => {
    const comment = await fetchQuery(
      `
      mutation($content: String!) {
        postComment(content: $content) {
          _id
          content
        }
      }
    `,
      { content: content }
    );
    setValue("");
    setComments([...comments, comment.data.postComment]);
  };

  return (
    <Layout>
      <Struct title="The Comment Section" importance={1}>
        <InputGroup>
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => {
                postComment(value);
              }}
            >
              Post
            </Button>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            value={value}
            onChange={handleChange}
          />
        </InputGroup>
        <ListGroup>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            comments
              .slice()
              .reverse()
              .map(({ _id, content }) => (
                <ListGroup.Item key={_id}>{content}</ListGroup.Item>
              ))
          )}
        </ListGroup>
      </Struct>
    </Layout>
  );
};
