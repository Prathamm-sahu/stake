"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RotateCw } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import TransactionTable from "@/components/TransactionTable";

interface GameTransactionType {
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
}

export default function BettingInterface() {
  const [betMode, setBetMode] = React.useState<"Manual" | "Auto">("Manual");
  const [betAmount, setBetAmount] = React.useState(0.0);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [multiplier, setMultiplier] = React.useState(2);
  const [winChance, setWinChance] = React.useState(49.5);
  const [rollValue, setRollValue] = React.useState(33);
  const [gameTransactionData, setGameTransactionData] = React.useState<GameTransactionType[]>()

  console.log(sliderValue);

  const onSliderValueChange = (value: number[]) => {
    setWinChance(100 / sliderValue[0]);
    setMultiplier(1 / winChance);
    setSliderValue(value);
  };

  const onbet = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/game/dice", {
        userId: "cm4l7vtcf00005ayw9i7jmprs",
        betAmount,
        multiplier,
        rollOver: sliderValue,
      });

      setRollValue(data.roll);

      toast({
        title: data.roll,
        description: `${data.isWin}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const gameTransaction = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/game/gameTxn")
      console.log(data)
      setGameTransactionData(data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    gameTransaction()
  }, [rollValue])

  return (
    <div className="min-h-screen bg-[#1a2634]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#1a2634] border-b border-gray-800">
        <div className="text-white text-2xl font-bold">Stake</div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-gray-800"
          >
            Sign in
          </Button>
          <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white">
            Register
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 flex gap-8">
        {/* Left Panel */}
        <div className="w-96 space-y-4">
          {/* Mode Toggle */}
          <div className="bg-[#243445] rounded-full p-1 flex">
            <button
              onClick={() => setBetMode("Manual")}
              className={`flex-1 py-2 px-4 rounded-full text-sm ${
                betMode === "Manual"
                  ? "bg-[#2f4358] text-white"
                  : "text-gray-400"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setBetMode("Auto")}
              className={`flex-1 py-2 px-4 rounded-full text-sm ${
                betMode === "Auto" ? "bg-[#2f4358] text-white" : "text-gray-400"
              }`}
            >
              Auto
            </button>
            <button className="px-4 text-gray-400">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Bet Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bet Amount</span>
              <span className="text-gray-400">0.00000000 BTC</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#243445] rounded-lg flex items-center">
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                  className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <span className="pr-3 text-yellow-500">₿</span>
              </div>
              <Button
                variant="outline"
                className="bg-[#243445] border-0 text-white hover:bg-[#2f4358]"
                onClick={() => setBetAmount((prev) => prev / 2)}
              >
                ½
              </Button>
              <Button
                variant="outline"
                className="bg-[#243445] border-0 text-white hover:bg-[#2f4358]"
                onClick={() => setBetAmount((prev) => prev * 2)}
              >
                2×
              </Button>
            </div>
          </div>

          {/* Profit on Win */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Profit on Win</span>
              <span className="text-gray-400">
                {betAmount * multiplier} BTC
              </span>
            </div>
            <div className="bg-[#243445] rounded-lg flex items-center">
              <Input
                type="number"
                value={betAmount * multiplier}
                readOnly
                className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <span className="pr-3 text-yellow-500">₿</span>
            </div>
          </div>

          {/* Bet Button */}
          <Button
            className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white"
            onClick={onbet}
          >
            Bet
          </Button>
        </div>

        {/* Right Panel */}
        <div className="flex-1 space-y-8">
          {/* Slider */}
          <div className="px-8 pt-16">
            <div className="relative">
              <div className="absolute -top-8 w-full flex justify-between text-gray-400">
                <AnimatePresence>
                  <motion.div
                    className="absolute top-0 -translate-y-full mb-2"
                    style={{
                      left: `${rollValue}%`,
                    }}
                    animate={{
                      x: "-50%",
                      y: "-100%",
                      rotate: [0, 360],
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    }}
                  >
                    <span className="flex justify-center p-1 font-bold">
                      {Math.floor(rollValue)}
                    </span>
                    <div className="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-45">
                      <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={(value) => onSliderValueChange(value)}
                max={100}
                step={1}
                className="h-3 "
              />
              
            </div>
          </div>

          {/* Stats Panel */}
          <div className="bg-[#1f2937] rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-gray-400 mb-2">Multiplier</div>
                <div className="bg-[#243445] rounded-lg p-2 flex justify-between items-center">
                  <Input
                    className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={multiplier}
                    type="number"
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                  />
                  <span className="text-gray-400">×</span>
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Roll Over</div>
                <div className="bg-[#243445] rounded-lg p-2 flex justify-between items-center">
                  <Input
                    className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={sliderValue[0]}
                    type="number"
                    onChange={(e) =>
                      setSliderValue([parseFloat(e.target.value)])
                    }
                  />
                  <RotateCw className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Win Chance</div>
                <div className="bg-[#243445] rounded-lg p-3 flex justify-between items-center">
                  <Input
                    className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={winChance}
                    type="number"
                    onChange={(e) => setWinChance(parseFloat(e.target.value))}
                  />
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>
            <TransactionTable gameTransaction={gameTransactionData} />
        </div>
      </div>
    </div>
  );
}
