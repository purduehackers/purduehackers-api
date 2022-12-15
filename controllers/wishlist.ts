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
      if (req.query.select) {
        try {
          select = JSON.parse((req.query as any).select);
        } catch (err) {
          return res.status(400).send(`Invalid select JSON`);
        }
      }
      let wishes = await fetchWishes(select);
      res.json(wishes);
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
