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
    const user = await db.user.findUnique({
      where: {
        id: userId
      },
    });

    if(!user) {
      res.status(404).json({
        msg: "user not found"
      })
      return;
    }

    let payout;

    let newBalance = user.balance

    if (user.balance < betAmount) {
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

    const updatedUser = await db.user.update({
      where: {
        id:  userId,
      },
      data: {
        balance:  newBalance
      },
    });

    await db.gameTransaction.create({
      data: {
          userId,
          betAmount: betAmount,
          multiplier: multiplier,
          status: isWin,
          payout: payout,
          game: "Dice"
      },
    });

    res.status(200).json({
      isWin,
      roll,
      winAmount,
      payout,
      newBalance: updatedUser.balance,
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
      take: 10,
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
}