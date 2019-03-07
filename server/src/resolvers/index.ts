import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Conversation } from "./Conversation";
import { AuthPayload } from "./AuthPayload";

export default { ...Query, ...Mutation, AuthPayload, Conversation };
