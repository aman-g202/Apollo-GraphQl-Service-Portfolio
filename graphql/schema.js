const { testTypeDefs } = require("../controllers/test");
const { userTypeDefs } = require("../controllers/user");

const Queries = `#graphql

  type Success {
    statusCode: Int,
    responseCode: String,
    message: String,
  }
  
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = [Queries, testTypeDefs, userTypeDefs];
