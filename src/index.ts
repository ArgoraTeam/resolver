import express, { Application, Request, Response } from "express";
import getTxid from "./getTxid";
import * as getHtml from "./getHtml";
import { T_weeve } from "./types";

const path = require('path');
const app: Application = express();
const port = 3000;

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// app.get("/@.*",  async (req: Request, res: Response): Promise<void> => {
//   res.render("index", { title: 'Hey', message: 'Hello there!'});
// });

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("main page");
});

app.get("/u/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const address = req.path.substring(3);
  const html = await getHtml.forProfile(address);
  return res.status(200).send(html);
});

app.get("/t/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const data: T_weeve = await getTxid(req.path.substring(3));
  const html = getHtml.forWeeve(data);
  return res.status(200).send(html);
});

try {
  app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}

