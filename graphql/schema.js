const { testTypeDefs } = require("../controllers/test");

const Queries = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = [Queries, testTypeDefs];
