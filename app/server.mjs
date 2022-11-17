
// require('./config/database.js')



// const express = require('express')
// const app = express()
// const port = 3001


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })






import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// iniciar servidor
import "./config/database.js";

import Tarea from './models/Tarea.js';
import Panel from './models/Panel.js';

const typeDefs = `#graphql
  type Tarea {
    _id: String
    titulo: String 
    descripcion: String
    fecha_inicio: String
    fecha_fin: String
    estado: Boolean
  }
  type Panel {
    _id: String
    titulo: String
    descripcion: String
    tareas: [Tarea]
  }

  type Query {
    hello: String

    panel(_id: ID): Panel
    tarea(_id: ID): Tarea

    allPaneles: [Panel]
    allTareas: [Tarea]
  }

  type Mutation {
    addTarea(
      idPanel: String,
      titulo: String,
      descripcion: String,
      fecha_inicio: String,
      fecha_fin: String,
      estado: Boolean
    ): Tarea
    addPanel(
      titulo: String,
      descripcion: String,
    ): Panel
  }
`


const books = [
  {
    id: 1,
    descripcion: 'Kate Chopin',
  },
  {
    id: 2,
    descripcion: 'Paul Auster',
  },
];


// se crean los resolvers
const resolvers ={
    Query: { 
      hello: () => 'world',
      panel: async (root, args) => {
        console.log('./Panel.findById(args._id).get()', await Panel.findById(args._id).exec())
        return Panel.findById(args._id).exec()
      },
      tarea: (root, args) => {
        return Tarea.findById(args._id).exec()
      },

      allPaneles: async (root, args) => {
        return Panel.find().exec()
      },
      allTareas: (root, args) => {
        return Tarea.find().exec()
      },
    },

    Mutation:{
      addPanel: (root, args) => {
        const panel = new Panel({...args})
        return panel.save()
      },
      addTarea: (root, args) => {
        const tarea = new Tarea({...args})
        return tarea.save()
      }
    }
}


const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);