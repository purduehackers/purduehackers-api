import express from "express";
import { eventTable, eventBase } from '../db/events'
import { wishlistTable, wishlistBase } from '../db/wishlist'

const app = express();
const port = 8080;

app.get("/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
