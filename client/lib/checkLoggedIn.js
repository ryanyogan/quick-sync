import { gql } from "apollo-boost";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query me {
          me {
            id
            username
          }
        }
      `
    })
    .then(({ data }) => {
      return { me: data.me };
    })
    .catch(() => {
      return { me: null }; // Graceful fail, return null
    });
