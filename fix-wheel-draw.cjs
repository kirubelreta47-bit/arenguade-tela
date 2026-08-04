const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldDrawWheel = `    function drawWheel() {
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
    }`;

const newDrawWheel = `    function drawWheel() {
      ctx.clearRect(0, 0, cw, ch);
      const arc = Math.PI * 2 / prizes.length;
      for (let i = 0; i < prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#060E1C' : '#FFD13B';
        ctx.moveTo(center, center);
        // Standard drawing, segment 0 starts at 0 rad (right)
        ctx.arc(center, center, center, i * arc, (i + 1) * arc);
        ctx.fill();
        
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#030811';
        ctx.font = "bold 13px Poppins";
        ctx.fillText(prizes[i], center - 30, 5);
        ctx.restore();
      }
    }`;

if (content.includes("i * arc - arc/2 - Math.PI/2")) {
  content = content.replace(oldDrawWheel, newDrawWheel);
  fs.writeFileSync('index.html', content);
  console.log("Updated drawWheel.");
}
