import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";

import { wishlistTable, wishlistBase } from "../db/wishlist";
import logger from "../middleware/logger";
import EventsController from "../controllers/events";
import WishlistController from "../controllers/wishlist";

const app = express();
const port = process.env.PORT || "8080";

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const eventsController = new EventsController();
const wishlistController = new WishlistController();

app.use("/", eventsController.router);
app.use("/", wishlistController.router);

app.get("/", (req, res) => {
  res.send("Welcome to Purdue Hackers' api");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
