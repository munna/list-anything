import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import BusinessList from "./pages/BusinessList/Index";
import BusinessDetails from "./pages/BusinessDetails/Index";
import TopNavigation from './components/HOC/TopNavigation';
import SignInSide from './pages/Account/SignInSide';

function App() {
  return (
    <Router >
        <TopNavigation />
        <Switch>
          
        <Route path="/business/show/:url" >
            <BusinessDetails />
          </Route>
          <Route path="/login" >
            <SignInSide />
          </Route>
          <Route path="/" render={(props) => <BusinessList {...props} />} >
            
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
