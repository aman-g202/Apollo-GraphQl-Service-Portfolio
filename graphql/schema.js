import { testTypeDefs } from "../controllers/test.js";
import { userTypeDefs } from "../controllers/user.js";
import { serviceTypeDefs } from "../controllers/service.js";
import { portfolioTypeDefs } from "../controllers/portfolio.js";

const Queries = `#graphql

  interface Success {
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

export const GraphQlSchema = [Queries, testTypeDefs, userTypeDefs, serviceTypeDefs, portfolioTypeDefs];
