import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  dbname: process.env.DATABASE || "",
  username: process.env.USER || "",
  password: process.env.PASSWORD || "",
  secretkey: process.env.SECRET || "",
  redis_host: process.env.REDIS_HOST || "",
  redis_port: process.env.REDIS_PORT || ""
};
