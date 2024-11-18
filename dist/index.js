"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database = __importStar(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const index_typeDefs_1 = require("./typeDefs/index.typeDefs");
const index_resolvers_1 = require("./resolvers/index.resolvers");
const auth_middleware_1 = require("./middleware/auth.middleware");
dotenv_1.default.config();
database.connect();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use("/graphql", auth_middleware_1.requireAuth);
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: index_typeDefs_1.typeDefs,
    resolvers: index_resolvers_1.resolvers,
    introspection: true,
    context: ({ req }) => {
        return Object.assign({}, req);
    }
});
apolloServer.start().then(() => apolloServer.applyMiddleware({
    app: app,
    path: '/graphql'
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
