import express, { type Express } from 'express';
import { createServer } from "node:http";
import { router } from "./routes/router.ts";
import cors from "cors";

const app: Express = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());

app.use('/', router);

server.listen(3200, () => {
  console.log('Server');
});