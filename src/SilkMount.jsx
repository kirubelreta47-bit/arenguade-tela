import React from 'react';
import { createRoot } from 'react-dom/client';
import Silk from './Silk';

export function mountSilk(elementId) {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <Silk 
        speed={5} 
        scale={1} 
        color="#060E1C" 
        noiseIntensity={1.5} 
        rotation={0} 
      />
    );
  }
}

// Automatically mount if element exists on load
window.addEventListener('DOMContentLoaded', () => {
  mountSilk('silk-container');
});
