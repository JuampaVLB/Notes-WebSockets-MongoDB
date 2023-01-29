import { app } from './app.js';
import { PORT } from './config.js';
import sockets from './sockets.js';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { connectDB } from './db.js';

connectDB();

// Settings


app.use(cors());

// Server and WebSocket

const Server = http.createServer(app);

const httpServer = Server.listen(PORT, () => console.log("Server on PORT 4000"));

const io = new WebSocketServer(Server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

sockets(io);




