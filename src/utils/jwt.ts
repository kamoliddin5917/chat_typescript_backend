import { sign, verify } from "jsonwebtoken";
import CONFIG from "../config";

export default {
  sign: (data: any) => sign(data, CONFIG.JWT_KEY),
  verify: (data: any) => verify(data, CONFIG.JWT_KEY),
};
