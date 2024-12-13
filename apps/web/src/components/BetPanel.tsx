"use client";

import { RotateCw } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import AutoPanel from "./AutoPanel";

interface BetPanelProps {}

const BetPanel: FC<BetPanelProps> = ({}) => {
  const [betMode, setBetMode] = useState<"Manual" | "Auto">("Manual");

  const [betAmount, setBetAmount] = useState(0.0);
  const [sliderValue, setSliderValue] = useState([50]);
  const [multiplier, setMultiplier] = useState(2);
  const [winChance, setWinChance] = useState(49.5);
  const [rollValue, setRollValue] = useState(33);

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

  return (
    <div className="p-4 w-[400px] bg-[#1a2634]">
      <Tabs defaultValue="Manual" className="space-y-4 p-4">
        <TabsList className="bg-[#243445] rounded-full p-4 h-11 w-[335px]">
          <TabsTrigger
            onClick={() => setBetMode("Manual")}
            value="Manual"
            className={`flex-1 py-2 px-4 rounded-full text-sm ${
              betMode === "Manual" ? "bg-[#2f4358] text-white" : "text-gray-400"
            }`}
          >
            Manual
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setBetMode("Auto")}
            value="Auto"
            className={`flex-1 py-2 px-4 rounded-full text-sm ${
              betMode === "Auto" ? "bg-[#2f4358] text-white" : "text-gray-400"
            }`}
          >
            Auto
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Manual" className="space-y-4">
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
                  min={0}
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
        </TabsContent>
        <TabsContent value="Auto">
          <AutoPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BetPanel;
