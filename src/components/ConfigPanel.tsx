import React from 'react';
import ColorPicker from './ColorPicker';
import WheelSelector from './WheelSelector';
import { useCarConfig } from '@/hooks/useCarConfig';

const ConfigPanel = () => {
  const { color, wheelType, setColor, setWheelType } = useCarConfig();

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-black/30 backdrop-blur-sm p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Customize Your Car</h2>
      <ColorPicker selectedColor={color} onColorSelect={setColor} />
      <WheelSelector selectedWheel={wheelType} onWheelSelect={setWheelType} />
    </div>
  );
};

export default ConfigPanel;