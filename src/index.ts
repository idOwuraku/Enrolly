import "reflect-metadata"
import express, {type Express, type Request, type Response} from "express";
import { initDb } from "./config/data-source.js";
import { config } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";


const app: Express = express();
const PORT: number = Number(config.port)

app.use(express.json());


app.use("/auth", authRoutes)

app.get("/", (_req: Request, res: Response): void => {
    console.log("Root route hit!");
    res.send("Hello Express");
});

const startServer = async (): Promise<void>  => {
    try {
        await initDb();

        app.listen(PORT, (): void => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err: unknown) {
        console.error("Error initializing db: ", err);
        console.log("USERNAME TYPE", process.env.DATABASE_USER);
        process.exit(1);
    }
}

startServer();

