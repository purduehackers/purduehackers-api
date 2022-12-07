import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import bodyParser from "body-parser";

import { wishlistTable, wishlistBase } from '../db/wishlist'
import logger from "../middleware/logger";
import EventsController from "../controllers/events"


const app = express();
const port = 8080;

app.use(logger)
app.use(bodyParser.json())

const eventsController = new EventsController();

app.use('/', eventsController.router);

app.get("/", ( req, res ) => {
    res.send( "Hello world! hi" );
} );

app.get("/hello", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
