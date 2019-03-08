import { ApolloClient, InMemoryCache, split } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
// import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

// Pollyfill fetch() on the server (if in SSR)
if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState, { getToken }) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
    credentials: "include"
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    };
  });

  let link = authLink.concat(httpLink);

  // if (process.browser) {
  //
  // When we add in subscriptions
  //
  // const token = getToken();
  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:4000`,
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  // });
  // link = split(
  //   // split based on operation type
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query);
  //     return kind === "OperationDefinition" && operation === "subscription";
  //   },
  //   wsLink,
  //   authLink.concat(httpLink)
  // );
  // }

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link,
    cache: new InMemoryCache().restore(initialState || {})
  });
};

export default (initialState, options) => {
  if (!process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};
