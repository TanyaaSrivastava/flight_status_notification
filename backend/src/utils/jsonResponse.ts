import { Response } from "express";

type IServerResponse = {
    statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429  | 404;
    status: "success" | "error";
    title: string;
    message: string;
    data?: any;
    extraData?: any;
    pageData?: any;
  };

export const JsonResponse = (res: Response, body: IServerResponse) => {
  res.status(body.statusCode);
  res.send({
    status: body.status,
    title: body.title,
    message: body.message,
    data: body.data,
    pageData: body.pageData,
    extraData: body.extraData,
  });
};