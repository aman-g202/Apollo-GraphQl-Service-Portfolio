const { GraphQLError } = require("graphql");

exports.testTypeDefs = `#graphql
    type Book {
        title: String
        author: String
    }

    input BookInput {
        title: String
        author: String
    }

    type Res {
        success: Book
    }

    extend type Query {
        books: [Book]
    }

    extend type Mutation {
        createBook(book: BookInput): Res
    }
`;

exports.testResolvers = {
  Query: {
    books: () => {
      return [
        {
          title: "Test 1",
          author: "Test Author 1",
        },
        {
          title: "Test 2",
          author: "Test Author 2",
        },
      ];
    },
  },
  Mutation: {
    createBook: (parent, args, context, info) => {
    //   throw new GraphQLError("Internal Server Error", {
    //     extensions: {
    //       code: "INTERNAL_SERVER_ERROR",
    //       http: {
    //         status: 500,
    //       },
    //     },
    //   });
      return {
        success: args.book,
      };
    },
  },
};

/* Argument	Description
extend  This will extend the type Query from root level and merges books with it.
parent	This is the return value of the resolver for this field's parent (the resolver for a parent field always executes before the resolvers for that field's children).
args	This object contains all GraphQL arguments provided for this field.
context	This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources.
info	This contains information about the execution state of the operation (used only in advanced cases). */
