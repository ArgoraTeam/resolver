import express, { Application, Request, Response } from "express";
import getTxid from "./getTxid";
import * as getHtml from "./getHtml";
import { T_weeve } from "./types";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("main page");
});

// Get user profile
app.get("/u/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const address = req.path.substring(3);
  const basePath = `${req.protocol}://${req.get('host')}`;
  const html = await getHtml.forProfile(basePath, address);
  return res.status(200).send(html);
});

// Get thread 
app.get("/t/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const data: T_weeve = await getTxid(req.path.substring(3));
  const html = await getHtml.forWeeve(data);
  return res.status(200).send(html);
});

// Auto-generate wallet image
app.get("/img/[a-zA-Z0-9\-_]{43}", async (req: Request, res: Response): Promise<Response> => {
  const buff = await getHtml.generateWalletImage(req.path.substring(5));
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control','max-age=604800');
  return res.status(200).send(buff);
});

try {
  app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}

