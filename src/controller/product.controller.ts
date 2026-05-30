import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utils/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  // console.log(urlParts);
  // console.log("req", req);

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // console.log("This is the actual id:", id);

  if (url === "/products" && method === "GET") {
    // const products = [
    //   {
    //     id: 1,
    //     name: "Product-01",
    //   },
    // ];
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is Product route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    //GET single Product
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    // console.log("product", product);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrived Successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    //Created Product By Post Method
    let body = await parseBody(req);
    console.log("body", body);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);

    insertProduct(products);

    // console.log("products", products);

    // console.log("newProduct", newProduct);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Created Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log("index", index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
          data: null,
        }),
      );
    }

    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Updated Successfully",
        data: products[index],
      }),
    );
  }
};
