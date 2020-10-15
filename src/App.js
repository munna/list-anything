import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import BusinessList from "./pages/BusinessList/Index";
import BusinessDetails from "./pages/BusinessDetails/Index";
import TopNavigation from './components/HOC/TopNavigation';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { isAuthenticated,loginWithRedirect } = useAuth0();
  // const SecretRoute = ({ component: Component, ...rest }) => (
  //   <Route {...rest} render={(props) => (
  //     isAuthenticated === true
  //       ? <Component {...props} />
  //       : loginWithRedirect()
  //   )} />
  // );
  return (
    <Router >
        <TopNavigation />
        <Switch>
          
        <Route withAuthenticationRequired path="/business/show/:url" >
            <BusinessDetails />
          </SecretRoute>
          <Route path="/" render={(props) => <BusinessList {...props} />} >
            
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
