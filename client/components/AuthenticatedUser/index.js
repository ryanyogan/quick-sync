import { gql } from "apollo-boost";
import { Query, ApolloConsumer } from "react-apollo";
import cookie from "cookie";

import redirect from "../../lib/redirect";

const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;

const AuthenticatedUser = ({ children }) => {
  const logout = async apolloClient => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Kill now
    });

    await apolloClient.cache.reset();
    redirect({}, "/");
  };

  return (
    <ApolloConsumer>
      {client => (
        <Query query={ME}>
          {({ loading, error, data }) => (
            <React.Fragment>
              {children({
                isAuthenticated: !loading && !error && data,
                logout: () => logout(client),
                loading,
                error,
                data
              })}
            </React.Fragment>
          )}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default AuthenticatedUser;
