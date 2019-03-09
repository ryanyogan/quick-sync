import * as jwt from "jsonwebtoken";
import { IResolverMap, Context } from "../types/prisma";
import { getUserId } from "../utils";

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
      _,
      { name, participantIds, message },
      ctx: Context
    ) => {
      const userId = getUserId(ctx);
      console.log(participantIds);
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

      console.log("DATA INSERT", JSON.stringify(data));

      return ctx.prisma.createConversation({ ...data });
    },

    sendMessage: async ({ userId }, { conversationId, message }, { prisma }) =>
      prisma.createMessage({
        message,
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
