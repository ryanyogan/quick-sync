import gql from "graphql-tag";

// Queries all users, prob not great without a cursor
// or pagination eventually
export default gql`
  query {
    users {
      id
      username
    }
  }
`;
