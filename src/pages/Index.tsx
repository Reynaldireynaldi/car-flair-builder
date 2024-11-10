import React from 'react';
import CarViewer from '@/components/CarViewer';
import ConfigPanel from '@/components/ConfigPanel';

const Index = () => {
  return (
    <div className="relative w-full h-screen bg-background">
      <CarViewer />
      <ConfigPanel />
    </div>
  );
};

export default Index;