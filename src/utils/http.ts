import http from 'http';

export const normalizePort = (rawPort: string) => {
    const port = parseInt(rawPort, 10);

    if (isNaN(port)) {
        return rawPort;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

export const onError =
    (port: string | Number | false) =>
    (error: { syscall: string; code: string }) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
            default:
                throw error;
        }
    };

export const onListening =
    (
        server: http.Server<
            typeof http.IncomingMessage,
            typeof http.ServerResponse
        >,
    ) =>
    () => {
        const address = server.address();
        const listenTarget =
            typeof address === 'string'
                ? 'pipe ' + address
                : 'port ' + address.port;

        console.log('Listening on ' + listenTarget);
    };
