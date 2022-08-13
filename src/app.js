import express from "express";
import morgan from "morgan";
import cors from "cors"
import { cacheInit } from "./routers/cache";

//Routes
import languageRoutes from "./routers/languaje.routes";

const app = express();

//Settings
app.set("port", 4000);
app.use(cors());
app.use(cacheInit)

//Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(languageRoutes);

export default app;