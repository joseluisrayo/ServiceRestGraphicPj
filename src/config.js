import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  dbname: process.env.DATABASE || "",
  username: process.env.USER || "",
  password: process.env.PASSWORD || "",
  secretkey: process.env.SECRET || ""
};
