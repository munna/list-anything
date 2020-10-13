import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Auth0Provider } from "@auth0/auth0-react";


import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import connection from "./Connection";


ReactDOM.render(
<ApolloProvider client={connection}>
    <Auth0Provider domain="apexpath.us.auth0.com"
    clientId="k2Wtr7aJPMDUWojgFU3s4GZ1ycwdYUls"
    redirectUri={window.location.origin}>
        <App />
    </Auth0Provider>
</ApolloProvider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
