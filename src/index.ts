import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Server} from 'http';
import {Express} from 'express';
import {AddressInfo} from 'ws';
import {createRow, Data} from './row';
import * as cors from 'cors';

const app: Express = express();
const server: Server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({server});
app.use(cors());

const defaultTableState = {
  rows: {},
  columns: ['bar', 'baz', 'bob', 'coo', 'cop', 'cor', 'far', 'faz', 'foo', 'fop', 'another', 'yet_another']
};

export const defaultFancyState = {
  rows: ['Anna', 'Travis', 'Mendel', 'Harrison', 'Alex', 'Jordan', 'Mike', 'Krishna', 'Mohammad', 'Paulina'],
  columns: ['bar', 'baz', 'bob', 'coo', 'cop', 'cor', 'far', 'faz', 'foo', 'fop', 'another', 'yet_another']
};

const columns = {
  columns: {
    active: ['bar', 'baz', 'bob', 'coo', 'cop', 'cor', 'far', 'faz', 'foo', 'fop'],
    inactive: ['another', 'yet_another']
  }
};

const names: string[] = ['Anna', 'Travis', 'Mendel', 'Harrison', 'Alex', 'Jordan', 'Mike', 'Krishna', 'Mohammad', 'Paulina'];
const rows = (data: Data[]) => ({
  data,
  rowNames: ['Anna', 'Travis', 'Mendel', 'Harrison', 'Alex', 'Jordan', 'Mike', 'Krishna', 'Mohammad', 'Paulina'],
  columnNames: ['bar', 'baz', 'bob', 'coo', 'cop', 'cor', 'far', 'faz', 'foo', 'fop', 'another', 'yet_another']
});

wss.on('connection', (socket: WebSocket) => {
  wss.clients.forEach(client =>
    client.send(JSON.stringify(rows(names.map(createRow)))));

  setInterval(() => {
    wss.clients.forEach(client =>
      client.send(JSON.stringify(rows(names.map(createRow)))))
  }, 1000);
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
