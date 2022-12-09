import { Request, Response, Router } from "express";
import { fetchEvents } from "../utils/fetchEvents";

class EventsController {
  public path = "/events";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
  }

  public async getAllEvents(req: Request, res: Response) {
    try {
      let select = {};
      if (req.query.select) {
        try {
          select = JSON.parse((req.query as any).select);
        } catch (err) {
          return res.status(400).send(`Invalid select JSON`);
        }
      }
      let events = await fetchEvents(select);
      res.json(events);
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .send(
          `Error fetching events:\nError: ${err.error}\nMessage: ${err.message}`
        );
    }
  }
}

export default EventsController;
