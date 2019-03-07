import { IResolvers } from "graphql-tools";
import { Context } from "../types/prisma";
import { getUserId } from "../utils";

export const Query: IResolvers = {
  Query: {
    users: async (_, __, { prisma }: any) => {
      return await prisma.users();
    },

    me: async (_, __, ctx: Context) => {
      const id = getUserId(ctx);
      return ctx.prisma.user({ id });
    }
  }
};
