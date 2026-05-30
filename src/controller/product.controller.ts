import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

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
  //Get all products
  if (url === "/products" && method === "GET") {
    try {
      const products = readProduct();
      return sendResponse(res, true, "Something Went Wrong", products);
    } catch (error) {
      return sendResponse(res, false, "Something Went Wrong", error, 500);
    }
  } else if (method === "GET" && id !== null) {
    //GET single Product

    try {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id === id);
      if (!product) {
        return sendResponse(res, false, "Product not found");
      }
      return sendResponse(res, true, "Product retrived successfully", products);
    } catch (error) {
      return sendResponse(res, false, "Something Went Wrong", error, 500);
    }

    // console.log("product", product);
  } else if (method === "POST" && url === "/products") {
    //Created Product By Post Method
    try {
      let body = await parseBody(req);
      // console.log("body", body);
      const products = readProduct();
      const newProduct = {
        id: Date.now(),
        ...body,
      };

      products.push(newProduct);

      insertProduct(products);

      return sendResponse(
        res,
        true,
        "Product Created Successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, false, "Something Went Wrong", error, 500);
    }
  } else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);
      const products = readProduct();
      const index = products.findIndex((p: IProduct) => p.id === id);
      if (index < 0) {
        return sendResponse(res, false, "Product Not Found", null, 404);
      }

      products[index] = { id: products[index].id, ...body };
      insertProduct(products);
      return sendResponse(
        res,
        true,
        "Product Updated Successfully",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, false, "Something Went Wrong", error, 500);
    }
  } else if (method === "DELETE" && id !== null) {
    try {
      const products = readProduct();
      const index = products.findIndex((p: IProduct) => p.id === id);
      // console.log("index", index);
      if (index < 0) {
        return sendResponse(res, false, "Product Not Found", null, 404);
      }
      const newArr = products.toSpliced(index, 1);
      insertProduct(newArr);
      // console.log("newArr", newArr);
      return sendResponse(res, true, "Product Deleted Successfully", null);
    } catch (error) {
      return sendResponse(res, false, "Something Went Wrong", error, 500);
    }
  }
};
