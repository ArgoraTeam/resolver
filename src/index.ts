import express, { Application, Request, Response } from "express";
import getTxid from "./getTxid";
import getHtml from "./getHtml";
import { T_weeve } from "./types";

const path = require('path');
const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("main page");
});

app.get("/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const data: T_weeve = await getTxid(req.path.substring(1));
  const html = getHtml(data);
  return res.status(200).send(html);
});

try {
  app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}

