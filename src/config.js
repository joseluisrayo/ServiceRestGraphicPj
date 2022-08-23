import { config } from "dotenv";

config();

export default {
  host: process.env.HOST_DB || "",
  port: process.env.PORT_DB || "",
  dbname: process.env.DATABASE || "",
  username: process.env.USER_DB || "",
  password: process.env.PASSWORD_DB || "",
  secretkey: process.env.SECRET || "",
  redis_host: process.env.REDIS_HOST || "",
  redis_port: process.env.REDIS_PORT || ""
};
