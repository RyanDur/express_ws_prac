import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Server} from "http";
import {Express} from "express";
import {AddressInfo} from "ws";
import {createRow} from "./row";

const app: Express = express();
const server: Server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({server});

const names: string[] = ['Anna', 'Travis', 'Mendel', 'Harrison', 'Alex', 'Jordan', 'Mike', 'Krishna', 'Mohammad', 'Paulina'];

wss.on('connection', (socket: WebSocket) => {
  socket.send(JSON.stringify({connection: "ok"}));

  setInterval(() => {
    wss.clients.forEach(client =>
      client.send(`{data: ${JSON.stringify(names.map(createRow))}}`));
  }, 1000);
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});