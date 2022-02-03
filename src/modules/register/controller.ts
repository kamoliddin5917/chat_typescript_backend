import { Request, Response } from "express";
import model from "./model";
import Token from "../../utils/jwt";
import bcrypt from "../../utils/bcrypt";
import ee from "../../event/event";

export default {
  ee,
  POST: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, username, password } = req.body;

      if (!firstName || !lastName || !username || !password)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const hashedPassword = await bcrypt.hashPassword(password);

      const createUser = await model.createdUser(
        firstName,
        lastName,
        username,
        hashedPassword
      );

      if (!createUser)
        return res.status(500).json({ message: "SERVER_ERROR_NOT_CREATED!" });

      const token = Token.sign({ userId: createUser.id });

      res.status(201).json({ message: "CREATED!", token });

      ee.emit("CREATED_USER", createUser);
    } catch (error) {
      res.status(400).json({
        message: `This username (${req.body.username}) already exist!`,
      });
    }
  },
};
