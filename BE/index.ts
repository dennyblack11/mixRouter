import express, {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import { dbConfig } from "./utils/dbConfig";
import { config } from "dotenv";
import { mainApp } from "./mainApp";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import MongoDBStore from "connect-mongodb-session";
config();

const mStore = MongoDBStore(session);
const app: Application = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const port: number = +process.env.PORT!;

app.use(json());
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser({ extended: false }));

app.use(
  session({
    secret: "js",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: false,
    },
    store: new mStore({
      uri: process.env.DATABASE_URL!,
      collection: "session",
    }),
  })
);

mainApp(app);

const server = app.listen(port, () => {
  dbConfig();
});

process
  .on("uncaughtException", (err: Error) => {
    console.log(err);
    process.exit(1);
  })
  .on("unhandledRejection", (reason: any) => {
    console.log(reason);
    server.close(() => {
      process.exit(1);
    });
  });
