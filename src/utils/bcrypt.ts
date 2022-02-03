import { compare, hash } from "bcryptjs";

export default {
  hashPassword: async (password: string) => {
    try {
      const result = await hash(password, 10);
      return result;
    } catch (_) {}
  },

  comparePassword: async (password: string, hash: string) => {
    try {
      const result = await compare(password, hash);
      return result;
    } catch (_) {}
  },
};
