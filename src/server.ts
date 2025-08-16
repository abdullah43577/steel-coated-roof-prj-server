import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./utils/connectDB";
const { PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async function () {
  //connnect DB
  connectDB();
  console.log(`server started on http://localhost:${PORT}`);
});
