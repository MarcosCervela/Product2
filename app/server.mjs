import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import "./config/database.mjs";
import { typeDefs } from './config/config.mjs';

import { panelResolver, addPanelResolver, allPanelesResolver } from './controllers/PanelController.mjs';
import { tareaResolver, addTareaResolver, allTareasResolver } from './controllers/TareasController.mjs';

// se crean los resolvers
const resolvers ={
    Query: { 
      hello: () => 'world',
      panel: panelResolver,
      tarea: tareaResolver,

      allPaneles: allPanelesResolver,
      allTareas: allTareasResolver,
    },

    Mutation:{
      addPanel: addPanelResolver,
      addTarea: addTareaResolver,
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