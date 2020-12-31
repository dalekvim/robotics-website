import React from "react";
import { Alert, InputGroup, FormControl } from "react-bootstrap";
import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

export const Comment: React.FC = () => {
  return (
    <Layout>
      <Alert variant="info">This page is under Maintenence.</Alert>
      <Struct title="The Comment Section" importance={1}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Comment and press Enter</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>
      </Struct>
    </Layout>
  );
};
