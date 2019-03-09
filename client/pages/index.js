import React from "react";
import { Query } from "react-apollo";

import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

import AuthenticatedUser from "../components/AuthenticatedUser";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import UserList from "../components/UserList";

import { USERS_QUERY } from "../graphql/queries";

class Index extends React.Component {
  state = {
    searchInput: "",
    context: {
      name: null,
      id: null,
      data: {}
    }
  };

  static async getInitialProps(context, apolloClient) {
    const { me } = await checkLoggedIn(context.apolloClient);

    if (!me) {
      redirect(context, "/signup");
    }

    return { me };
  }

  renderHeader() {
    return (
      <AuthenticatedUser>
        {({ logout, data: { me } }) => (
          <header className="my-16 w-full">
            <div className="text-center">
              <div className="flex flex-col items-center text-grey">
                Logged in as {me.username}
              </div>
              <a
                className="block text-black mt-2"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </div>
          </header>
        )}
      </AuthenticatedUser>
    );
  }

  renderSearchInput() {
    return (
      <SearchInput
        onChange={searchInput => {
          this.setState(prevState => ({
            ...prevState,
            searchInput
          }));
        }}
      />
    );
  }

  renderUserList() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => (
          <UserList
            onClick={user => {
              this.setState(prevState => ({
                ...prevState,
                context: { name: contexts.USER, id: user.id, data: user }
              }));
            }}
            {...{
              loading,
              error,
              users: data.users.filter(user =>
                this.state.searchInput !== ""
                  ? user.username
                      .toUpperCase()
                      .inludes(this.state.searchInput.toUpperCase())
                  : user
              )
            }}
          />
        )}
      </Query>
    );
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        {this.renderHeader()}
        <div
          className="w-2/3 rounded border flex bg-white overflow-hidden"
          style={{ height: 500 }}
        >
          <div id="leftTile" className="w-1/3 border-r flex flex-col">
            <div id="search" className="h-16 border-b">
              {this.renderSearchInput()}
            </div>
            <div className="flex-1 overflow-y-scroll scrolling-touch py-2">
              {this.renderUserList()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
