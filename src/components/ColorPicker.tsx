import React from 'react';
import { Card } from '@/components/ui/card';
import { carColors } from '@/hooks/useCarConfig';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => {
  return (
    <Card className="p-4 bg-config-panel backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-3">Exterior Color</h3>
      <div className="grid grid-cols-5 gap-2">
        {carColors.map((color) => (
          <button
            key={color.value}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedColor === color.value ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorSelect(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </Card>
  );
};

export default ColorPicker;