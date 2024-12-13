import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AutoPanelProps {}

const AutoPanel: FC<AutoPanelProps> = ({}) => {
  const [betAmount, setBetAmount] = useState(0.0);
  const [numberOfBets, setNumberOfBets] = useState(0);
  const [onWinIncrease, setOnWinIncrease] = useState(0);
  const [onLossIncrease, setOnLossIncrease] = useState(0);
  const [stopProfit, setStopProfit] = useState(0.0);
  const [stopLoss, setStopLoss] = useState(0.0);

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Bet Amount</span>
          <span className="text-gray-400">0.00000000 BTC</span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value))}
              className="bg-[#2a3744] border-0 text-white pl-8"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
              ₿
            </span>
          </div>
          <Button
            variant="outline"
            className="bg-[#2a3744] border-0 text-white hover:bg-[#3a4754]"
          >
            ½
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a3744] border-0 text-white hover:bg-[#3a4754]"
          >
            2×
          </Button>
        </div>
      </div>

      {/* Number of Bets */}
      <div className="space-y-1">
        <span className="text-sm text-gray-300">Number of Bets</span>
        <div className="relative">
          <Input
            type="number"
            value={numberOfBets}
            onChange={(e) => setNumberOfBets(parseFloat(e.target.value))}
            className="bg-[#2a3744] border-0 text-white pr-10"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ∞
          </button>
        </div>
      </div>

      {/* On Win */}
      <div className="space-y-1">
        <span className="text-sm text-gray-300">On Win</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#2a3744] border-0 text-white hover:bg-[#3a4754]"
          >
            Reset
          </Button>
          <div className="flex-1 flex items-center gap-2 bg-[#2a3744] rounded-md px-3">
            <span className="text-sm text-gray-400">Increase by:</span>
            <Input
              type="number"
              value={onWinIncrease}
              onChange={(e) => setOnWinIncrease(parseFloat(e.target.value))}
              className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white w-16 p-0"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>
      </div>

      {/* On Loss */}
      <div className="space-y-1">
        <span className="text-sm text-gray-300">On Loss</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#2a3744] border-0 text-white hover:bg-[#3a4754]"
          >
            Reset
          </Button>
          <div className="flex-1 flex items-center gap-2 bg-[#2a3744] rounded-md px-3">
            <span className="text-sm text-gray-400">Increase by:</span>
            <Input
              type="number"
              value={onLossIncrease}
              onChange={(e) => setOnLossIncrease(parseFloat(e.target.value))}
              className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0 w-16 p-0"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>
      </div>

      {/* Stop on Profit */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Stop on Profit</span>
          <span className="text-gray-400">0.00000000 BTC</span>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={stopProfit}
            onChange={(e) => setStopProfit(parseFloat(e.target.value))}
            className="bg-[#2a3744] border-0 text-white pl-8"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
            ₿
          </span>
        </div>
      </div>

      {/* Stop on Loss */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Stop on Loss</span>
          <span className="text-gray-400">0.00000000 BTC</span>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
            className="bg-[#2a3744] border-0 text-white pl-8"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
            ₿
          </span>
        </div>
      </div>

      {/* Start Button */}
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
        Start Autobet
      </Button>
    </div>
  );
};

export default AutoPanel;
