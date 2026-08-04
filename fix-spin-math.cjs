const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldSpinWheel = `    let wheelDeg = 0;
    let spinning = false;
    function spinWheel() {
      if(spinning) return;
      spinning = true;
      const resText = document.getElementById('spinResult');
      resText.innerText = '';
      
      const spins = Math.floor(Math.random() * 3) + 5;
      const segmentAngle = 360 / prizes.length;
      
      let winSegment;
      do {
        winSegment = Math.floor(Math.random() * prizes.length);
      } while(winSegment === 4); // Index 4 is 'Combo Platter', which they can't win
      
      const targetDeg = (360 - (winSegment * segmentAngle)) % 360;
      const offset = Math.floor(Math.random() * 30) - 15; // Random offset within the slice
      
      const currentMod = wheelDeg % 360;
      let diff = targetDeg - currentMod + offset;
      if (diff <= 0) diff += 360;
      
      wheelDeg += diff + (spins * 360);
      
      canvas.style.transform = \`rotate(\${wheelDeg}deg)\`;
      
      setTimeout(() => {
        spinning = false;
        const actualDeg = wheelDeg % 360;
        const segment = Math.round(((360 - actualDeg) % 360) / segmentAngle) % prizes.length;
        if (prizes[segment] === 'Try Again') {
          resText.innerText = 'Ah, close! Try Again!';
        } else {
          resText.innerText = \`You won: \${prizes[segment]}!\`;
        }
      }, 4500);
    }`;

const newSpinWheel = `    let wheelDeg = 0;
    let spinning = false;
    function spinWheel() {
      if(spinning) return;
      spinning = true;
      const resText = document.getElementById('spinResult');
      resText.innerText = '';
      
      const spins = Math.floor(Math.random() * 3) + 5;
      const segmentAngle = 360 / prizes.length;
      
      let winSegment;
      do {
        winSegment = Math.floor(Math.random() * prizes.length);
      } while(winSegment === 4); // Index 4 is 'Combo Platter', which they can't win
      
      // Pointer is at 270 deg. Segment is at winSegment * 45 + 22.5 deg.
      // We want: winSegment * 45 + 22.5 + rotate_angle = 270
      // rotate_angle = 247.5 - winSegment * 45
      let targetDeg = 247.5 - (winSegment * segmentAngle);
      // Ensure positive modulo 360
      targetDeg = (targetDeg % 360 + 360) % 360;
      
      const offset = Math.floor(Math.random() * 30) - 15; // Random offset within the slice
      targetDeg += offset;
      
      const currentMod = wheelDeg % 360;
      let diff = targetDeg - currentMod;
      if (diff <= 0) diff += 360;
      
      wheelDeg += diff + (spins * 360);
      
      const canvas = document.getElementById('wheel');
      canvas.style.transform = \`rotate(\${wheelDeg}deg)\`;
      
      setTimeout(() => {
        spinning = false;
        if (prizes[winSegment] === 'Try Again') {
          resText.innerText = 'Ah, close! Try Again!';
        } else {
          resText.innerText = \`You won: \${prizes[winSegment]}!\`;
        }
      }, 4500);
    }`;

content = content.replace(oldSpinWheel, newSpinWheel);
fs.writeFileSync('index.html', content);
