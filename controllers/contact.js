import { GraphQLError } from "graphql";
import GraphQlIsoDate from "graphql-iso-date";
const { GraphQLDateTime } = GraphQlIsoDate;

import ContactsService from "../core-services/contact.js";

export const contactTypeDefs = `#graphql
    scalar ISODate

    type Contact {
        _id: ID,
        forUser: ID,
        name: String,
        email: String,
        message: String,
        createdAt: ISODate,
        updatedAt: ISODate,
    }

    input ContactInput {
        forUser: ID!,
        name: String!,
        email: String!,
        message: String!,
    }

    type ContactCreateRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
      }
  
    type ContactsRes implements Success {
        statusCode: Int,
        responseCode: String,
        message: String,
        result: [Contact]
    }

    extend type Query {
        contacts: ContactsRes
    }

    extend type Mutation {
        createContact(contact: ContactInput): ContactCreateRes
    }

`;

export const contactResolver = {
  Query: {
    contacts: async (parent, args, context, info) => {
      try {
        return await ContactsService.list();
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
    createContact: async (parent, args, context, info) => {
      const { contact: body } = args;
      try {
        return await ContactsService.create(body);
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
