import { Context } from "../types/prisma";

export const Conversation = {
  name: async ({ id, name }: any, __: any, ctx: Context) => {
    const participants = await ctx.prisma.conversation({ id }).participants();
    console.log("PARTY", participants);

    if (participants.length > 2) {
      return name;
    } else if (participants.length === 2) {
      if (participants[0].id === ctx.request.userId) {
        return participants[1].username;
      } else {
        return participants[0].username;
      }
    }

    return name;
  },

  participants: async ({ id }, _: any, ctx: Context) =>
    ctx.prisma.conversation({ id }).participants()
};
