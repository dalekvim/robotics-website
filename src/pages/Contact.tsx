import { Layout } from "../components/Layout";
import { Member } from "../components/Member";

export const Contact: React.FC = () => {
  return (
    <Layout>
      <h1>Contact Us</h1>
      <div>
        <Member name="Mahir Mansoor" email="mmansoor@wigstonstudents.org">
          <p>Enter Text Here.</p>
        </Member>
        <Member name="Callum Chandler" email="cchandler@wigstonstudents.org">
          <p>Enter text Here.</p>
        </Member>
        <Member name="Vimal Vinod" email="vvinod@wigstonstudents.org">
          <p>Second times is not the charm.</p>
        </Member>
      </div>
    </Layout>
  );
};
