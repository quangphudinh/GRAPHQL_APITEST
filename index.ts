import express from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import {Application , Express , Request, Response } from "express";
import { ApolloServer , gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middleware/auth.middleware";


dotenv.config();
database.connect();


const app : Express  = express();
const port : number | string = process.env.PORT || 3000;

//graphql API
app.use("/graphql" , requireAuth); //private route

const apolloServer = new ApolloServer({
    typeDefs : typeDefs,
    resolvers : resolvers,
    context : ({req}) => {
        return {...req};
    }
});

apolloServer.start().then (() => 
    apolloServer.applyMiddleware({
        app : app , 
        path : '/graphql'
    }));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})