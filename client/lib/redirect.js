import Router from "next/router";

export default (context, target) => {
  if (context.res) {
    // Server HTTP 303
    // We will modify the header
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, everything is fine
    Router.replace(target);
  }
};
