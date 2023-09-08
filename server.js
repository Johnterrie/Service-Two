// import express from "express";
// import { createHandler } from 'graphql-http/lib/use/express';
// import User from "./src/schema/userSchema.js";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors";
import connectDB from './src/db/connect.js';
import dotenv from "dotenv"
import resolver from './src/controllers/resolvers.js'
import typeDefs from './src/schema/userSchema.js'

dotenv.config()

// const app = express()
const PORT = process.env.PORT || 4000

// graphql middleware
// app.all("/graphql", createHandler({
//      User,
// }))

// middlewares
// app.use(cors())
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }))


// calling database and and express server 


const server = new ApolloServer({
    typeDefs,
    resolver,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const main = async ( ) => {
    try {
        await connectDB(process.env.MONGO_URL)
        server.listen(PORT, () => {
            console.log("Server is listening on port: " + PORT)
        })
    } catch (error) {
        console.log(error.message)
    }
}

main()
