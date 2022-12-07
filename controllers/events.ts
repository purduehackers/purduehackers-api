import { eventTable, eventBase } from '../db/events'
import { Request, Response } from "express";

class EventsController {
  
}
exports.fetchAllData = (req: Request, res: Response) => {
  res.send("fetch data called");
};