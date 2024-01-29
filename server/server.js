//importion de modules
require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); 


const cors =require('cors')


const resolvers=require('./resolvers/index')


// Read the GraphQL schema file
const postSchemaPath = path.join(__dirname, 'schemas', 'postSchema.graphql');
const userSchemaPath = path.join(__dirname, 'schemas', 'userSchema.graphql');

const postTypeDefs = fs.readFileSync(postSchemaPath, 'utf-8');
const userTypeDefs = fs.readFileSync(userSchemaPath, 'utf-8');

const typeDefs = mergeTypeDefs([postTypeDefs, userTypeDefs]);

// Create GraphQL schema using @graphql-tools/schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const DB = process.env.DB;
const PORT = process.env.PORT || 3500;
const secret_key=process.env.secret_key;

const app = express()

app.use(express())
app.use (express.json())
app.use(express.json()); // Middleware to parse JSON requests


app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable the GraphiQL interface for testing
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      try {
        const user = jwt.verify(token, secret_key);
        return { user };
      } catch (error) {
        return { user: null };
      }
    },
  })
);

mongoose
    .connect(DB)
    .then(() => {
        console.log('db connected')
//lancer server
        app.listen(PORT, () => {
            console.log(`your server is  running on port : ${PORT}/graphql`);
        })
    })
    .catch(() => {
        console.log('error')
    })
