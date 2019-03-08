import React from "react";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

class Index extends React.Component {
  static async getInitialProps({ res, apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);

    if (!me) {
      redirect(res, "/signup");
    }

    return { me };
  }

  render() {
    return (
      <div>
        <p>Sending ya to Signup page ma friend</p>
      </div>
    );
  }
}

export default Index;
