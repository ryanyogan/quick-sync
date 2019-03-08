import React, { Component } from "react";
import { object } from "prop-types";
import cookie from "cookie";
import { getDataFromTree } from "react-apollo";
import Head from "next/head";

import initApollo from "./initApollo";

const parseCookie = (req, options = {}) =>
  cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);

export default App => {
  return class WithData extends Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: object.isRequired
    };

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookie(req).token
        }
      );

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (req && req.finished) {
        // When redirect, the response is finished
        // Nothig to render at this point
        return null;
      }

      // Run all GQ: queries in the component tree
      // and extra the resulting data (SSR)
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />
        );
      } catch (error) {
        // Prevent apollo client errors from crashing SSR
        // Handle them in component via data.error prop
        console.error("Error while running 'getDataFromTree'", error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillMount
        // head side effect therefore need to be clearyred manually
        Head.rewind();
      }

      // Extract query data from Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);

      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
