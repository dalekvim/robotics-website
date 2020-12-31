import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Comment } from "./pages/Comment";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";

export const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/comment" component={Comment} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
    </HashRouter>
  );
};
