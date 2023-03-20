const express = require("express");
const bodyparser = require("body-parser");
const Apollo = require("@apollo/server");
const StandAloneServer = require("@apollo/server/standalone");
const {
  ApolloServerErrorCode,
  unwrapResolverError,
} = require("@apollo/server/errors");

require("dotenv").config({ path: "./.env" });
require("./configs");
const environmentData = require("./envVariables")();

if (!environmentData.success) {
  console.log(
    "Server could not start . Not all environment variable is provided"
  );
  process.exit();
}

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");

const app = express();
require("./health-checks")(app);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * could be replace by respective domains which we want to allow, * means for all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  let errorData = [];
  if (error.data) {
    errorData = error.data;
  }
  res.status(status).json({
    message: message,
    error: errorData,
  });
});

/* Logs request info if environment is configured to enable log */
if (process.env.ENABLE_LOG === "true") {
  app.all("*", (req, res, next) => {
    console.log("***Portfolio Service Logs Starts Here***");
    console.log(
      "Request Type %s for %s on %s from ",
      req.method,
      req.url,
      new Date()
    );
    console.log("Request Headers: ", req.headers);
    console.log("Request Body: ", req.body);
    console.log("***Portfolio Service Logs Ends Here***");
    next();
  });
}

const server = new Apollo.ApolloServer({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: true,
  formatError: (formattedError, error) => {
    // This will run every time just before the error sends to the client
    // This will unwrap the instance of GraphQlError to the accessible object
    // console.log(unwrapResolverError(error));
    const statusCode = unwrapResolverError(error).extensions.http.status;
    const message = formattedError.message;
    const errorResponse = {
      message,
      errorPath: formattedError.locations,
    };

    if (
      formattedError.extensions.code ===
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    ) {
      errorResponse.statusCode = statusCode || 422;
      errorResponse.responseCode = "CLIENT_ERROR";
    } else if (
      formattedError.extensions.code ===
      ApolloServerErrorCode.INTERNAL_SERVER_ERROR
    ) {
      errorResponse.statusCode = statusCode || 500;
      errorResponse.responseCode = "SERVER_ERROR";
    }
    return errorResponse;
  },
});

StandAloneServer.startStandaloneServer(server, {
  listen: { port: process.env.APPLICATION_PORT },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

// // Server listens to given port
// app.listen(process.env.APPLICATION_PORT, (res, err) => {
//   if (err) {
//     onError(err);
//   }
//   console.log("Environment: " + process.env.APPLICATION_ENV);
//   console.log(
//     "Application is running on the port:" + process.env.APPLICATION_PORT
//   );
// });

// Handles specific listen errors with friendly messages
function onError(error) {
  switch (error.code) {
    case "EACCES":
      console.log(
        process.env.APPLICATION_PORT + " requires elevated privileges"
      );
      process.exit(1);
    case "EADDRINUSE":
      console.log(process.env.APPLICATION_PORT + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
