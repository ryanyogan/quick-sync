import { gql } from "apollo-boost";

export default gql`
  mutation signup($username: String!) {
    signup(username: $username) {
      token
      user {
        id
        username
      }
    }
  }
`;
