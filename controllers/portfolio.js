import { GraphQLError } from "graphql";
import GraphQlIsoDate from "graphql-iso-date";
const { GraphQLDateTime } = GraphQlIsoDate;

import PortfolioHelper from "../core-services/portfolio.js";

export const portfolioTypeDefs = `#graphql
    scalar ISODate

    type GalleryMedia {
        _id: ID,
        type: String
        path: String
    }

    input GalleryMediaInput {
        type: String!
        path: String!
    }

    type Portfolio {
        _id: ID,
        userId: ID,
        title: String,
        subTitle: String,
        bannerImagePath: String,
        heading: String,
        description: String,
        clientName: String,
        category: String,
        endDate: ISODate,
        galleryMedia: [GalleryMedia],
        createdAt: ISODate,
        updatedAt: ISODate,
    }

    input PortfolioInput {
        userId: ID!,
        title: String!,
        subTitle: String!,
        bannerImagePath: String!,
        heading: String!,
        description: String!,
        clientName: String,
        category: String!,
        endDate: ISODate!,
        galleryMedia: [GalleryMediaInput!]!,
    }

    type PortfolioCreateRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
      }
  
    type PortfolioRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
        result: [Portfolio]
    }

    extend type Query {
        portfolios: PortfolioRes
    }

    extend type Mutation {
        createPortfolio(portfolio: PortfolioInput): PortfolioCreateRes
    }

`;

export const portfolioResolver = {
  Query: {
    portfolios: async (parent, args, context, info) => {
      try {
        return await PortfolioHelper.list();
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
    createPortfolio: async (parent, args, context, info) => {
      const { portfolio: body } = args;
      try {
        return await PortfolioHelper.create(body);
      } catch (error) {
        console.log(error);
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
