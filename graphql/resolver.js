import { testResolvers } from "../controllers/test.js";
import { userResolvers } from "../controllers/user.js";

export const Query = {
  ...testResolvers.Query,
  ...userResolvers.Query,
};

export const Mutation = {
  ...testResolvers.Mutation,
  ...userResolvers.Mutation,
};
