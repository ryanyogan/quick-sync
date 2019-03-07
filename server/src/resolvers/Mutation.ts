import * as jwt from "jsonwebtoken";
import { IResolverMap } from "../types/prisma";

interface IData {
  name: string;
  participants: object;
  messages?: object;
}

export const Mutation: IResolverMap = {
  Mutation: {
    signup: async (_, { username }, { prisma }) => {
      const user = await prisma.user({
        username
      });

      if (user) {
        return {
          token: jwt.sign({ userId: user.id }, "foobar"),
          user
        };
      }

      const newUser = await prisma.createUser({
        username
      });

      return {
        token: jwt.sign({ userId: newUser.id }, "foobar"),
        user: newUser
      };
    },
    createConversation: (
      { userId },
      { name, participantIds, message },
      { prisma }
    ) => {
      let allParticipantIds = participantIds;
      allParticipantIds.push(userId);

      const data: IData = {
        name,
        participants: {
          connect: allParticipantIds.map((id: number) => ({
            id
          }))
        }
      };

      if (message) {
        data.messages = {
          create: {
            message,
            author: {
              connect: {
                id: userId
              }
            }
          }
        };
      }

      return prisma.createConversation({ ...data });
    },

    sendMessage: async ({ userId }, { conversationId, text }, { prisma }) =>
      prisma.createMessage({
        text,
        author: {
          connect: {
            id: userId
          }
        },
        conversation: {
          connect: {
            id: conversationId
          }
        }
      })
  }
};
