import { testTypeDefs } from "../controllers/test.js";
import { userTypeDefs } from "../controllers/user.js";

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

export const GraphQlSchema = [Queries, testTypeDefs, userTypeDefs];
