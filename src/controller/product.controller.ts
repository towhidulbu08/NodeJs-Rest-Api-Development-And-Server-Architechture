import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  if (url === "/products" && method === "GET") {
    const products = res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is Product route", data: products }),
    );
  }
};
