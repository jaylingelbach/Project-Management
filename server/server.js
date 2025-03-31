import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema.js';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import authRoutes from './routes/authRoutes.js';
import clerkRoutes from './routes/clerkRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development' ? true : false, 
}));

app.get('/api/clerk-users', clerkRoutes);

app.post('/api/liveblocks-auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});