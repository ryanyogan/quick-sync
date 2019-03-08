import Router from "next/router";

export default (res, target) => {
  if (res) {
    // Server HTTP 303
    // We will modify the header
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    // In the browser, everything is fine
    Router.replace(target);
  }
};
