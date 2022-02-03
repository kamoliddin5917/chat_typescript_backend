import { Request, Response, NextFunction } from "express";
import Token from "../utils/jwt";

export default {
  AUTH_USER: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.headers;
      const { userId }: any = Token.verify(token);

      if (!userId)
        return res
          .status(401)
          .json({ message: "Login qilin yoki Registratsiyadan o'tin!" });

      req.body.userId = userId;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Login qilin yoki Registratsiyadan o'tin!" });
    }
  },
};
