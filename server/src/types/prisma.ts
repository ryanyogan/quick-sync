import { Request, Response } from "express-serve-static-core";
import { Prisma } from "../generated/prisma-client";

export interface IResponseRequest {
  request: Request & { userId: string }; // Added a userId, will be using JWT
  response: Response;
}

export interface Context extends IResponseRequest {
  url: string;
  prisma: Prisma;
}

export type IResolver = (parent: any, args: any, context: Context) => any;

export interface IResolverMap {
  [key: string]: {
    [key: string]: IResolver;
  };
}
