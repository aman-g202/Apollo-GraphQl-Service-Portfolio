import { GraphQLError } from "graphql";
import GraphQlIsoDate from "graphql-iso-date";
const { GraphQLDateTime } = GraphQlIsoDate;

import ServicesHelper from "../core-services/service.js";

export const serviceTypeDefs = `#graphql
    scalar ISODate

    type Service {
        _id: ID,
        userId: ID,
        title: String,
        subTitle: String,
        imagePath: String,
        heading: String,
        description: String,
        createdAt: ISODate,
        updatedAt: ISODate,
    }

    input ServiceInput {
        userId: ID!,
        title: String!,
        subTitle: String!,
        imagePath: String!,
        heading: String!,
        description: String!,
    }

    type ServiceCreateRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
      }
  
    type ServicesRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
        result: [Service]
    }

    extend type Query {
        services: ServicesRes
    }

    extend type Mutation {
        createService(service: ServiceInput): ServiceCreateRes
    }

`;

export const serviceResolver = {
  Query: {
    services: async (parent, args, context, info) => {
      try {
        return await ServicesHelper.list();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.responseCode,
            http: {
              status: error.statusCode,
            },
          },
        });
      }
    },
  },
  Mutation: {
    createService: async (parent, args, context, info) => {
      const { service: body } = args;
      try {
        return await ServicesHelper.create(body);
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.responseCode,
            http: {
              status: error.statusCode,
            },
          },
        });
      }
    },
  },
  ISODate: GraphQLDateTime,
};
