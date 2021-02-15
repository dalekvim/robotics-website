import React, { useContext, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Comment } from "./pages/Comment";
import { Contact } from "./pages/Contact";
import { CreatePost } from "./pages/post/Create";
import { Error } from "./pages/Error";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Profile } from "./pages/Profile";
import { AuthContext } from "./AuthContext";
import { UpdatePost } from "./pages/post/Update";

export const App: React.FC = () => {
  const [value, setValue] = useState(false);

  return (
    <HashRouter basename="/">
      <Switch>
        <AuthContext.Provider value={{ value, setValue }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/comment" component={Comment} />
          <Route path="/contact" component={Contact} />
          <Route path="/post/create" component={CreatePost} />
          <Route path="/post/update/:_id" component={UpdatePost} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </AuthContext.Provider>
        <Route path="/" component={Error} />
      </Switch>
    </HashRouter>
  );
};
