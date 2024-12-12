import express from "express"
import dotenv from 'dotenv';
import path from "path"
import db from "@repo/db/prismaClient"
import { gameRouter } from "./routes/gameRouter";
import cors from 'cors';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const __dirname = path.resolve()
const PORT= process.env.PORT || 8000;

// app.use('/api', userRoute);
// app.use('/api/wallet', walletRoute);
app.use('/api/game', gameRouter);


app.listen(8000, () => console.log("server started at port 8000"))