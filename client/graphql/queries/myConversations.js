import gql from "graphql-tag";

export default gql`
  query {
    me {
      id
      conversations {
        id
        name
        participants {
          id
          username
        }
        messages {
          id
          message
          createdAt
          author {
            id
            username
          }
        }
      }
    }
  }
`;
