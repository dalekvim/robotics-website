import { gql, useQuery } from "@apollo/client";
import { Post } from "../components/Post";

const POSTS = gql`
  query {
    posts {
      _id
      title
      author {
        _id
      }
      content
      createdAt
      updatedAt
    }
  }
`;

interface post {
  _id: string;
  title: string;
  author: {
    _id: string;
  };
  content: string;
}
export const Blog: React.FC = () => {
  const { loading, error, data } = useQuery<{ posts: post[] }>(POSTS);

  if (loading) return <>Loading...</>;
  if (error) return <>{error}</>;
  if (!data) return <>Could not fetch posts.</>;

  return (
    <>
      {data.posts
        .slice()
        .reverse()
        .map(({ _id, author, title, content }) => (
          <Post
            key={_id}
            _id={_id}
            author={author}
            title={title}
            content={content}
          />
        ))}
    </>
  );
};
