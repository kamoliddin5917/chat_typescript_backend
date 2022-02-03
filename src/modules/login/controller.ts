import { Request, Response } from "express";
import model from "./model";
import Token from "../../utils/jwt";
import bcrypt from "../../utils/bcrypt";

export default {
  POST: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const findUser = await model.findUser(username);

      if (!findUser) return res.status(404).json({ message: "NOT_FOUND!" });

      const comparedPassword = await bcrypt.comparePassword(
        password,
        findUser.password
      );

      if (!comparedPassword)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const token = Token.sign({ userId: findUser.id });

      res.status(200).json({ message: "OK!", token });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};
