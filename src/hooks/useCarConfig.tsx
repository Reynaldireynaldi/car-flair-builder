import { create as createStore } from 'zustand';

interface CarConfig {
  color: string;
  wheelType: string;
  setColor: (color: string) => void;
  setWheelType: (wheelType: string) => void;
}

export const useCarConfig = createStore<CarConfig>((set) => ({
  color: '#FF0000',
  wheelType: 'standard',
  setColor: (color) => set({ color }),
  setWheelType: (wheelType) => set({ wheelType }),
}));

export const carColors = [
  { name: 'Crimson Red', value: '#DC143C' },
  { name: 'Midnight Blue', value: '#191970' },
  { name: 'Forest Green', value: '#228B22' },
  { name: 'Jet Black', value: '#000000' },
  { name: 'Pearl White', value: '#F5F5F5' },
];

export const wheelTypes = [
  { id: 'standard', name: 'Standard', price: 0 },
  { id: 'sport', name: 'Sport', price: 1200 },
  { id: 'luxury', name: 'Luxury', price: 2400 },
];