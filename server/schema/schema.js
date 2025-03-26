// Construct a schema
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
  } from 'graphql'; 
import Project from '../models/Project.js';
import Client from '../models/Client.js'; 

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({ 
      id: { type: GraphQLID },
      client: { 
        type: ClientType, 
        resolve(parent, args) {
          return Client.findById(parent.clientId);
        }
      },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
    }),
  });

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
      id: { type: GraphQLID },  
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  }); 
  
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        // all projects
        projects: {
          type: new GraphQLList(ProjectType),
          resolve(parent, args) {
            return Project.find(); 
          },
        },  
        project: { 
          type: ProjectType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
            return Project.findById(args.id);
          },
        },
        // all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
              return Client.find();
            },
        },
        client: {
          type: ClientType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
            return Client.findById(args.id); 
          },
        },
      },
    }),
});

export default schema;