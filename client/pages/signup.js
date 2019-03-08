import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import SignupForm from "../components/SignupForm";

export default class SignupPage extends React.Component {
  static async getInitialProps({ res, apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);

    if (me) {
      redirect(res, "/");
    }

    return { me };
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-1/3">
          <SignupForm />
        </div>
      </div>
    );
  }
}
