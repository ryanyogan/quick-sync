import { IResolvers } from "graphql-tools";

export const Query: IResolvers = {
  Query: {
    users: async (_, __, { prisma }: any) => {
      return await prisma.users();
    },

    me: async ({ userId }, _, { prisma }) => prisma.user({ id: userId })
  }
};
