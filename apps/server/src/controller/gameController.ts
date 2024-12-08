import { Request, Response } from "express";
import db from "@repo/db/prismaClient"

export const diceLogic = async (req: Request, res: Response) => {
  try {
    const { userId, betAmount, multiplier, rollOver } = req.body
    const rollUnder = 100 - rollOver;   
    let winAmount = betAmount * multiplier;
    const roll = Math.random() * 100
    const isWin = roll <= rollUnder;

    // Prisma query
    const user = await db.balance.findUnique({
      where: {
        userId
      },
    });

    if(!user) {
      res.status(404).json({
        msg: "user not found"
      })
      return;
    }

    let payout;

    let newBalance = user.amount

    if (user.amount < betAmount) {
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    if(isWin) {
      newBalance += winAmount
      payout = winAmount
    } else {
      newBalance -= betAmount;
      payout =- betAmount;
    }

    if(newBalance <=0) {
      newBalance = 0;
      winAmount = 0;
    }

    const updatedUser = await db.balance.update({
      where: {
        userId:  userId,
      },
      data: {
        amount:  newBalance
      },
    });
    await db.gameTransaction.create({
      data: {
          userId,
          betAmount: betAmount,
          multiplier: multiplier,
          status: isWin,
          payout: payout,
      },
    });

    res.status(200).json({
      isWin,
      roll,
      winAmount,
      payout,
      newBalance: updatedUser.amount,
    });
  } catch (error) {
    console.log(error)
  }
}

export const getGamesTxn = async (req: Request, res: Response)=>{
  try {
    const { userId } = req.body
    const games = await db.gameTransaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take:5,
    });
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
}