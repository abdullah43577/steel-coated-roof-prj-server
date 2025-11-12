import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB, sequelize } from "./utils/connectDB";
const { PORT } = process.env;
import helmet from "helmet";
import { router } from "./routes/router";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://stone-coated-steel-roofing-project.vercel.app"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/v1", router);

app.listen(PORT, async function () {
  //connnect DB
  await connectDB();
  await sequelize.sync({ alter: true });

  console.log(`server started on http://localhost:${PORT}`);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist!",
    explorableSolutions: {
      solution1: 'ensure the "METHOD" used to call the endpoint is correct!',
      solution2: "ensure the relative paths to the server url is defined correctly",
    },
  });
});
