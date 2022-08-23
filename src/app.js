import express from "express";
import morgan from "morgan";
import cors from "cors"
import cacheInit from "./routers/cache.js";
import responseTime from "response-time";

//Routes
import languageRoutes from "./routers/languaje.routes.js";

const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(cacheInit)
app.use(responseTime())

//Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(languageRoutes);

export default app;