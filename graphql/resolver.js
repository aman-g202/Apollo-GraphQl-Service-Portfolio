// import { merge } from 'lodash';
const { testResolvers } = require("../controllers/test");
const { userResolvers } = require("../controllers/user");

module.exports = {
  Query: {
    ...testResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...testResolvers.Mutation,
    ...userResolvers.Mutation
  },
};
