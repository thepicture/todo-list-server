import http from 'http';

import { app } from '../src/app';
import { normalizePort, onError, onListening } from '../src/utils';

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError(port));
server.on('listening', onListening(server));
