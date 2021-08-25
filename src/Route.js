import { Fragment } from 'react';
import './App.scss';
import { AddUser, Userlist } from "./Container";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const PublicRoutes = ({ component: Component, path, ...rest }) => {
  return <Route exact path={path} component={Component} {...rest}></Route>
}

function RouteFile() {
  return (
    <div className="App">
      <Fragment>
        <BrowserRouter>
          <Switch>
            <PublicRoutes exact path="/" component={AddUser}></PublicRoutes>
            <PublicRoutes exact path="/users" component={Userlist}></PublicRoutes>
          </Switch>
        </BrowserRouter>
      </Fragment>
    </div >
  );
}

export default RouteFile;
