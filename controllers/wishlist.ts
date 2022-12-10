import { Request, Response, Router } from "express";
import { fetchWishes } from "../utils/fetchWishes";

class wishlistController {
  public path = "/wishlist";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllWishes);
  }

  public async getAllWishes(req: Request, res: Response) {
    try {
      let select = {};
      if (req.body.select) {
        try {
          select = JSON.parse(req.body.select);
        } catch (err) {
          return res.status(400).send(`Invalid select JSON`);
        }
      }
      let events = await fetchWishes(select);
      res.json(events);
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .send(
          `Error fetching wishes:\nError: ${err.error}\nMessage: ${err.message}`
        );
    }
  }
}

export default wishlistController;
