import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerErrorCode,
  unwrapResolverError,
} from "@apollo/server/errors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

/* Configurations Setup */
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import _ from "./configs/index.js";
import upload from "./middlewares/file-upload.js";
import environmentData from "./envVariables.js";
const envValidation = environmentData();

if (!envValidation.success) {
  console.log(
    "Server could not start . Not all environment variable is provided"
  );
  process.exit();
}

/* Defining GraphQL schema and resolver */
import { GraphQlSchema } from "./graphql/schema.js";
import * as GraphQlResolvers from "./graphql/resolver.js";

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

import HealthCheck from "./health-checks/index.js";
HealthCheck(app);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * could be replace by respective domains which we want to allow, * means for all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.put("/upload", upload.array("file", 10), (req, res, next) => {
  if (!req.files || !req.files.length) {
    const error = new Error("File not provided");
    error.statusCode = 422;
    throw error;
  }
  res.status(201).json({
    message: "success",
    statusCode: 201,
    responseCode: "OK",
    result: {
      paths: req.files.map((file) => file.path),
    },
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

const server = new ApolloServer({
  typeDefs: GraphQlSchema,
  resolvers: GraphQlResolvers,
  includeStacktraceInErrorResponses: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError, error) => {
    // This will run every time just before the error sends to the client
    // This will unwrap the instance of GraphQlError to the accessible object
    // console.log(unwrapResolverError(error));
    const statusCode = unwrapResolverError(error).extensions.http?.status;
    const message = formattedError.message;
    const errorResponse = {
      message,
      errorPath: formattedError.locations,
    };

    if (
      formattedError.extensions.code ===
        ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED ||
      formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT
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

await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/",
  cors(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  bodyParser.json({ limit: "50mb" }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise((resolve, reject) => {
  const server = httpServer.listen(
    { port: process.env.APPLICATION_PORT },
    resolve
  );
  server.on("error", onError);
});
console.log(
  `🚀 Server ready at http://localhost:${process.env.APPLICATION_PORT}/`
);

/* For stand alone server to use GraphQL only not the express middlewares to use REST Apis */
// StandAloneServer.startStandaloneServer(server, {
//   listen: { port: process.env.APPLICATION_PORT },
// }).then(({ url }) => {
//   console.log(`🚀  Server ready at: ${url}`);
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

// error handling middleware for express server
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
