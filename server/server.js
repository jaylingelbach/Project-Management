import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';


const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();

connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development' ? true : false, 
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});