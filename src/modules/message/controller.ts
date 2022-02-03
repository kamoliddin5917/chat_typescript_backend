import { Request, Response } from "express";
import model from "./model";
import File from "../../utils/file";
import ee from "../../event/event";

export default {
  ee,
  GET: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const findMessages = await model.findMessages(userId);

      res.status(200).json({ message: "OK", data: findMessages });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { message, id, userId } = req.body;
      const file = req.files;

      if (!message || !file || !id)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const filename = File.fileUpload(file.file);

      const createMessage = await model.createMessage(
        message,
        filename,
        id,
        userId
      );

      if (!createMessage) {
        File.fileDelete(filename);

        return res.status(500).json({ message: "SERVER_CREATED_ERROR!" });
      }

      res.status(200).json({ message: "CREATED", data: createMessage });

      ee.emit("CREATED_MESSAGE", createMessage);
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const { messageId } = req.params;

      const deleteMessage = await model.deleteMessage(messageId, userId);

      if (!deleteMessage)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({ message: "DELETED", data: deleteMessage });

      ee.emit("DELETED_MESSAGE", deleteMessage);

      File.fileDelete(deleteMessage.file);
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};
