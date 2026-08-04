const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldDrawWheel = `    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const prizes = ['Free Coffee', 'Free Dessert', 'Free Drink', '10% Off', 'Bonus Points', 'Try Again'];
    const cw = canvas.width, ch = canvas.height, center = cw/2;
    
    function drawWheel() {
      const arc = Math.PI * 2 / prizes.length;
      for (let i = 0; i < prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#060E1C' : '#FFD13B';
        ctx.moveTo(center, center);
        ctx.arc(center, center, center, i * arc, (i + 1) * arc);
        ctx.fill();
        
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#030811';
        ctx.font = "bold 15px Poppins";
        ctx.fillText(prizes[i], center - 30, 6);
        ctx.restore();
      }
    }
    drawWheel();
    
    let wheelDeg = 0;
    let spinning = false;
    function spinWheel() {
      if(spinning) return;
      spinning = true;
      const resText = document.getElementById('spinResult');
      resText.innerText = '';
      
      const spins = Math.floor(Math.random() * 5) + 5;
      const deg = Math.floor(Math.random() * 360);
      wheelDeg += (spins * 360) + deg;
      
      canvas.style.transform = \`rotate(\${wheelDeg}deg)\`;
      
      setTimeout(() => {
        spinning = false;
        const actualDeg = wheelDeg % 360;
        const segment = Math.floor((360 - actualDeg + 90) % 360 / (360 / prizes.length));
        resText.innerText = \`You won: \${prizes[segment]}!\`;
      }, 4500);
    }`;

const newDrawWheel = `    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const prizes = ['Free Coffee', 'Try Again', 'Shiro', '10% Off', 'Combo Platter', 'Try Again', 'Free Drink', 'Free Dessert'];
    const cw = canvas.width, ch = canvas.height, center = cw/2;
    
    function drawWheel() {
      const arc = Math.PI * 2 / prizes.length;
      for (let i = 0; i < prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#060E1C' : '#FFD13B';
        ctx.moveTo(center, center);
        ctx.arc(center, center, center, i * arc - arc/2 - Math.PI/2, (i + 1) * arc - arc/2 - Math.PI/2);
        ctx.fill();
        
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * arc - Math.PI/2);
        ctx.textAlign = "right";
        ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#030811';
        ctx.font = "bold 13px Poppins";
        ctx.fillText(prizes[i], center - 30, 5);
        ctx.restore();
      }
    }
    drawWheel();
    
    let wheelDeg = 0;
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

if (content.includes("const prizes = ['Free Coffee'")) {
  content = content.replace(/const canvas = document\.getElementById\('wheel'\);[\s\S]*?resText\.innerText = `You won: \$\{prizes\[segment\]\}!`;\n      \}, 4500\);\n    \}/, newDrawWheel);
  fs.writeFileSync('index.html', content);
  console.log("Updated drawWheel and spinWheel successfully.");
} else {
  console.log("Could not find the target string.");
}
