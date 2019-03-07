import { getUserId } from "../utils";
import { Context } from "../types/prisma";
import { userInfo } from "os";

export const Conversation = {
  name: async (_: any, __: any, ctx: Context) => {
    // const id = getUserId(ctx);
    // const user = await ctx.prisma.user({ id }).conversations

    // if (user.participants.length > 2) {
    //   return name;
    // } else if (participants.length === 2) {
    //   if (participants[0].id === userId) {
    //     return participants[1].username;
    //   } else {
    //     return participants[0].username;
    //   }
    // }
    return "Foo";
  }
};
