export const Conversation = {
  name: ({ name, participants, userId }, _: any, { prisma }) => {
    if (participants.length > 2) {
      return name;
    } else if (participants.length === 2) {
      if (participants[0].id === userId) {
        return participants[1].username;
      } else {
        return participants[0].username;
      }
    }
  }
};
