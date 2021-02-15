import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { Blog } from "../components/Blog";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { value } = useContext(AuthContext);

  return (
    <Layout>
      <Alert variant="danger">
        There is no good way to say this, but the robotics club is currently
        very low on members.
      </Alert>
      <Struct title="The Robotics Club Website" importance={1}>
        <p className="lead">Welcome to the brand new Robotics Club Website!</p>
        <div className="text-justify">
          <p>
            There is no one in this club, other than Mahir of course, capable of
            talking to actual humans, but if there were, he (let's be honest,
            it's not going to be a she) would be actively be searching for new
            members:
          </p>
          <p>
            <b>
              If you have nothing to do during Friday lunch, feel free to pop
              by!
            </b>
          </p>
        </div>
        {value ? (
          <div style={{ display: "flex" }}>
            <Button
              variant="primary"
              onClick={() => history.push("/post/create")}
              style={{ marginLeft: "auto" }}
            >
              New Post
            </Button>
          </div>
        ) : null}
        <hr />
        <Blog />
        <hr />
        <Struct title="FAQs" importance={2}>
          <Struct title="When and where is it?" importance={3}>
            <p>
              The Robotics Club is on <i>nearly</i> every friday in Mrs
              Nemaura's Room (C1.1), which is just down the corridor from the
              hub.
            </p>
          </Struct>
        </Struct>
      </Struct>
    </Layout>
  );
};
