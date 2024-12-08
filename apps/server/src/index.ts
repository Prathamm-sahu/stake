import express from "express"
import dotenv from 'dotenv';
import path from "path"
import db from "@repo/db/prismaClient"
// import cors from 'cors';
dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const __dirname = path.resolve()
const PORT= process.env.PORT || 8000;

app.use('/api', userRoute);
// app.use('/api/wallet', walletRoute);
app.use('/api/game', gameRoute);


app.listen(8000, () => console.log("server started at port 8000"))