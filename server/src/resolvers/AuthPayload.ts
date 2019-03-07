export const AuthPayload = {
  user: async ({ user: { id } }, _: any, { prisma }) => prisma.user({ id })
};
