import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import Client from '../models/Client.js';
import Project from '../models/Project.js';

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
    status: { type: GraphQLString }
  })
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });
        return client.save();
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).deleteMany().exec();
        return Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: { 
        clientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' }
            },
          }),
          defaultValue: 'Not Started'
        }
      },
      resolve(parent, args) {
        const project = new Project({
          clientId: args.clientId,
          name: args.name,
          description: args.description,
          status: args.status
        });
        return  project.save();
      }
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      }
    },
    updateProject: {
      type: ProjectType,
      args: {  
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' }
            },
          })
        }
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
          $set: {
          clientId: args.clientId,
          name: args.name,
          description: args.description,
          status: args.status
          }
        }, { new: true}
        );
      }
    },
    // update client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.phone
          }
        }, { new: true });
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // all projects
      projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return Project.find();
        }
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Project.findById(args.id);
        }
      },
      // all clients
      clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
          return Client.find();
        }
      },
      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Client.findById(args.id);
        }
      }
    }
  }),
  mutation: mutation
});

export default schema;
