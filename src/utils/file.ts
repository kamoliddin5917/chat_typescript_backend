import path from "path";
import fs from "fs";
import { v4 as UUID } from "uuid";

export default {
  fileUpload: (file: any) => {
    const fileName = `__${file.mimetype.split("/")[0]}__${UUID()}.${
      file.mimetype.split("/")[1]
    }`;

    file.mv(path.join(__dirname, "../uploads", fileName));

    return fileName;
  },
  fileDelete: (file: string) => {
    fs.unlink(path.join(__dirname, "../uploads", file), (er) => {
      console.log(er);
    });
  },
};
