import config from "./config";

import { createServer, IncomingMessage, Server } from "http";

import { routeHandler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});
// console.log("PORT =", process.env.PORT);
server.listen(config.port, () => {
  console.log("server is running on the port: 8000");
});
