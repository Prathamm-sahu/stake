import { RotateCw } from 'lucide-react';
import { FC, useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

interface BetPanelProps {
  
}

const BetPanel: FC<BetPanelProps> = ({}) => {
  const [betMode, setBetMode] = useState<"Manual" | "Auto">("Manual");

  return (
    <div>
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
            {/* <button className="px-4 text-gray-400">
              <RotateCw className="w-4 h-4" />
            </button> */}
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
    </div>
  )
}

export default BetPanel