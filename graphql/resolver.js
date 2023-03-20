// import { merge } from 'lodash';
const { testResolvers } = require("../controllers/test");

module.exports = {
  Query: {
    ...testResolvers.Query,
  },
  Mutation: {
    ...testResolvers.Mutation,
  },
};
