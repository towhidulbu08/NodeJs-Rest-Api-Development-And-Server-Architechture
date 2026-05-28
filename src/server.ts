import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("This is Root route")
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route  Found" }));
  } else if (url?.startsWith("/products")) {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Product route" }));
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(5000, () => {
  console.log("server is running on the port: 5000");
});
