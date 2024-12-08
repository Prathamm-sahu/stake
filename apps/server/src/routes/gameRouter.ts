import { Request, Response, Router } from "express";
import db from "@repo/db/prismaClient"
import { diceLogic, getGamesTxn } from "../controller/gameController";
// import { userMiddleware } from "../middlewares/user";

export const gameRouter = Router()

gameRouter.post("/dice", diceLogic)
gameRouter.get("/gameTxn", getGamesTxn)
