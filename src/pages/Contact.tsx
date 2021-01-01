import { Layout } from "../components/Layout";
import { Member } from "../components/Member";

export const Contact: React.FC = () => {
  return (
    <Layout>
      <h1>Contact Us</h1>
      <div>
        <Member name="Mahir Mansoor" email="mmansoor@wigstonstudents.org">
          Enter Text Here.
        </Member>
        <Member name="Callum Chandler" email="cchandler@wigstonstudents.org">
          Enter text Here.
        </Member>
        <Member name="Vimal Vinod" email="vvinod@wigstonstudents.org">
          Second times is not the charm.
        </Member>
      </div>
    </Layout>
  );
};
