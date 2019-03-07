import * as jwt from "jsonwebtoken";

export const isLoggedIn = (
  resolve: any,
  parent: any,
  _: any,
  { request, response }
) => {
  const Authorization = request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, "foobar") as any;

    return resolve({ userId, ...parent });
  }

  throw new AuthError();
};

class AuthError extends Error {
  constructor() {
    super("Not Authorized");
  }
}
