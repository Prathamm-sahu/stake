"use client"

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export interface TransactionTableProps {
  gameTransaction: {
    id: string;
    status: boolean;
    betAmount: number;
    multiplier: number;
    payout: number;
    game: string;
    user: {
      name: string
    }
    userId: string
    createdAt: string;
  }[] | undefined;
}

const TransactionTable: FC<TransactionTableProps> = ({ gameTransaction }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Game</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Bet Amount</TableHead>
            <TableHead className="text-right">Multiplier</TableHead>
            <TableHead className="text-right">Payout</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {gameTransaction?.map((trx) => (
            <TableRow>
              <TableCell className="font-medium text-gray-200">{trx.game}</TableCell>
              <TableCell className="text-gray-200">{trx.user.name}</TableCell>
              <TableCell className="text-gray-200">{trx.createdAt}</TableCell>
              <TableCell className="text-right text-gray-200">${trx.betAmount}</TableCell>
              <TableCell className="text-right text-gray-200">${trx.multiplier}</TableCell>
              <TableCell className="text-right text-gray-200">${trx.payout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
