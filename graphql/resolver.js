import { testResolvers } from "../controllers/test.js";
import { userResolvers } from "../controllers/user.js";
import { serviceResolver } from "../controllers/service.js";
import { portfolioResolver } from "../controllers/portfolio.js";
import { contactResolver } from "../controllers/contact.js";

export const Query = {
  ...testResolvers.Query,
  ...userResolvers.Query,
  ...serviceResolver.Query,
  ...portfolioResolver.Query,
  ...contactResolver.Query
};

export const Mutation = {
  ...testResolvers.Mutation,
  ...userResolvers.Mutation,
  ...serviceResolver.Mutation,
  ...portfolioResolver.Mutation,
  ...contactResolver.Mutation,
};
