import React from "react";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import AuthenticatedUser from "../components/AuthenticatedUser";

class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { me } = await checkLoggedIn(context.apolloClient);

    if (!me) {
      redirect(context, "/signup");
    }

    return { me };
  }

  // renderHeader() {
  //   return (
  //     <AuthenticatedUser>
  //       {({ logout, data: { me } }) => (
  //         <header className="my-16 w-full">
  //           <div className="text-center">
  //             <div className="flex flex-col items-center text-gray">
  //               Logged in as {me.username}
  //             </div>
  //             <a
  //               className="block text-black mt-2"
  //               href="#"
  //               onClick={e => {
  //                 e.preventDefault();
  //                 logout();
  //               }}
  //             >
  //               Logout
  //             </a>
  //           </div>
  //         </header>
  //       )}
  //     </AuthenticatedUser>
  //   );
  // }

  render() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        {/* {this.renderHeader()} */}
        <div
          className="w-2/3 rounded border flex bg-white overflow-hidden"
          style={{ height: 5000 }}
        >
          <div id="leftTile" className="w-1/3 border-r flex flex-col">
            <div id="search" className="h-16 border-b">
              Search
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
