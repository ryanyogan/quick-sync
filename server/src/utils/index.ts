import * as jwt from "jsonwebtoken";
import { Context } from "../types/prisma";

export const getUserId = (ctx: Context) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, "foobar") as { userId: string };
    return userId;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not Authorized");
  }
}
