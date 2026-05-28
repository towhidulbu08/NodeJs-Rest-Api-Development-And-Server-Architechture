import { createServer, IncomingMessage, Server } from "http";
const server = createServer((req, res) => {
    console.log(req);
});
server.listen(5000, () => {
    console.log("server is running on the port: 5000");
});
//# sourceMappingURL=server.js.map