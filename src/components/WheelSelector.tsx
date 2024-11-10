import React from 'react';
import { Card } from '@/components/ui/card';
import { wheelTypes } from '@/hooks/useCarConfig';

interface WheelSelectorProps {
  selectedWheel: string;
  onWheelSelect: (wheelType: string) => void;
}

const WheelSelector = ({ selectedWheel, onWheelSelect }: WheelSelectorProps) => {
  return (
    <Card className="p-4 bg-config-panel backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-3">Wheels</h3>
      <div className="space-y-2">
        {wheelTypes.map((wheel) => (
          <button
            key={wheel.id}
            className={`w-full p-3 rounded transition-colors ${
              selectedWheel === wheel.id
                ? 'bg-white/20 text-white'
                : 'bg-transparent hover:bg-white/10 text-gray-300'
            }`}
            onClick={() => onWheelSelect(wheel.id)}
          >
            <div className="flex justify-between items-center">
              <span>{wheel.name}</span>
              <span className="text-sm">
                {wheel.price > 0 ? `+$${wheel.price.toLocaleString()}` : 'Included'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default WheelSelector;