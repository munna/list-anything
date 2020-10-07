import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://loving-louse-45.hasura.app/v1/graphql/"
  })
});