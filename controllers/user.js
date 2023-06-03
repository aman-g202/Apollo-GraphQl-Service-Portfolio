import { GraphQLError } from "graphql";
import GraphQlIsoDate  from "graphql-iso-date";
const { GraphQLDateTime } = GraphQlIsoDate;

import UserService from '../core-services/user.js';

export const userTypeDefs = `#graphql
    scalar ISODate

    type SocialMedia {
        instagram: String,
        twitter: String,
        linkedIn: String,
        stackOverFlow: String,
        github: String
    }

    input SocialMediaInput {
        instagram: String,
        twitter: String,
        linkedIn: String,
        stackOverFlow: String,
        github: String
    }

    type Address {
        location: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
    }

    input AddressInput {
        location: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
    }

    type Education {
        study: String,
        degree: String,
    }

    input EducationInput {
        study: String,
        degree: String,
    }

    type Availablity {
        type: String,
        available: Boolean,
    }

    input AvailablityInput {
        type: String,
        available: Boolean,
    }

    type SkillSchema {
        _id: ID,
        name: String,
        score: String,
    }

    input SkillSchemaInput {
        name: String,
        score: String,
    }

    type Skills {
        technical: [SkillSchema],
        language: [SkillSchema],
    }

    input SkillsInput {
        technical: [SkillSchemaInput],
        language: [SkillSchemaInput],
    }

    type EducationalExperienceHistory {
        _id: ID,
        startYear: Int,
        endYear: Int,
        title: String,
        subTitle: String,
    }

    input EducationalExperienceHistoryInput {
        startYear: Int,
        endYear: Int,
        title: String,
        subTitle: String,
    }

    type Testimonials {
        _id: ID,
        description: String,
        name: String,
        role: String,
        profilePhotoPath: String,
    }

    input TestimonialsInput {
        description: String,
        name: String,
        role: String,
        profilePhotoPath: String,
    }

    type Facts {
        projectsCompleted: String,
        happyClients: String,
        professionalStartYear: Int,
    }

    input FactsInput {
        projectsCompleted: String,
        happyClients: String,
        professionalStartYear: Int,
    }

    type User {
        _id: ID,
        name: String!,
        work: [String!]!,
        subTitle: String!,
        subTitleDescription: String!,
        socialMedia: SocialMedia,
        profilePhotoPath: String!,
        description: String!,
        birthday: ISODate!,
        address: Address,
        email: String!,
        phone: String!,
        education: Education,
        interests: [String],
        availability: Availablity,
        skills: Skills,
        knowledge: [String],
        educationHistory: [EducationalExperienceHistory],
        experience: [EducationalExperienceHistory],
        testimonials: [Testimonials],
        facts: Facts
        createdAt: ISODate!,
        updatedAt: ISODate!,
    }

    input UserInput {
        name: String!,
        work: [String!]!,
        subTitle: String!,
        subTitleDescription: String!,
        socialMedia: SocialMediaInput,
        profilePhotoPath: String!,
        description: String!,
        birthday: ISODate!,
        address: AddressInput,
        email: String!,
        phone: String!,
        education: EducationInput,
        interests: [String],
        availability: AvailablityInput,
        skills: SkillsInput,
        knowledge: [String],
        educationHistory: [EducationalExperienceHistoryInput],
        experience: [EducationalExperienceHistoryInput],
        testimonials: [TestimonialsInput],
        facts: FactsInput
    }

    type UserCreateRes implements Success {
      statusCode: Int,
      responseCode: String,
      message: String,
    }

    type UserRes implements Success {
      statusCode: Int,
      responseCode: String,
      message: String,
      result: User
    }

    extend type Query {
        user(id: ID): UserRes
    }

    extend type Mutation {
        createUser(user: UserInput): UserCreateRes
    }
`;

export const userResolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      const { id: userId } = args;
      try {
        return await UserService.findUser(userId);
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
    createUser: async (parent, args, context, info) => {
      const { user: body } = args;
      try {
        return await UserService.create(body);
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
  ISODate: GraphQLDateTime, // Define Scalar type to resolve how it should be
};
