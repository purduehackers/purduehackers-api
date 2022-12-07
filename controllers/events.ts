import { Request, Response, Router } from "express";
import { fetchEvents } from "../utils/fetchEvents";

class EventsController {
  public path = '/events';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
  }

  public async getAllEvents(req: Request, res: Response) {
    let test = await fetchEvents();
    console.log(test)
    res.send('hi')
  }
}

export default EventsController;