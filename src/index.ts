import express from "express";
import { wishlistTable, wishlistBase } from '../db/wishlist'
import logger from "../middleware/logger";

const app = express();
const port = 8080;

app.use(logger)

app.get("/", ( req, res ) => {
    res.send( "Hello world! hi" );
} );

app.get("/hello", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
