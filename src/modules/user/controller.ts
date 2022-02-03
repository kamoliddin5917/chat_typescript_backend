import { Request, Response } from "express";
import model from "./model";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const findUsers = await model.findUsers();

      if (!findUsers.length)
        return res.status(404).json({ message: "NOT_FOUND!" });

      res.status(200).json({ message: "OK!", data: findUsers });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};
