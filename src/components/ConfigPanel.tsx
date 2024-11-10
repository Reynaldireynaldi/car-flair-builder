import React from 'react';
import ColorPicker from './ColorPicker';
import WheelSelector from './WheelSelector';
import { useCarConfig } from '@/hooks/useCarConfig';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ConfigPanel = () => {
  const { color, wheelType, setColor, setWheelType } = useCarConfig();
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background/30 backdrop-blur-sm p-6 space-y-6 animate-fade-in border-l border-border/50">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Customize Your Car</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="text-foreground hover:text-foreground/80"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </div>
      <ColorPicker selectedColor={color} onColorSelect={setColor} />
      <WheelSelector selectedWheel={wheelType} onWheelSelect={setWheelType} />
    </div>
  );
};

export default ConfigPanel;