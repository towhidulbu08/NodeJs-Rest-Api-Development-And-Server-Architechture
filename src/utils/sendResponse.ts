import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  message: string,

  data?: any,
  statusCode: number = 200,
) => {
  const response = {
    success,
    message,
    data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
