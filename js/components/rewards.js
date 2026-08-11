/* ==========================================================================
   ARENGUADE TILA - REWARDS WHEEL & SOUND SYNTHESIZER
   ========================================================================== */

const WHEEL_PRIZES = [
  'Free Coffee', 
  'Try Again', 
  'Free Dessert', 
  '10% Off', 
  'Combo Platter', 
  'Try Again', 
  'Free Drink', 
  'Try Again'
];

let wheelDeg = 0;
let isSpinning = false;

/**
 * Draws the canvas wheel graphics
 */
function drawWheel() {
  const canvas = document.getElementById('wheel');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const cw = canvas.width;
  const ch = canvas.height;
  const center = cw / 2;
  const arc = (Math.PI * 2) / WHEEL_PRIZES.length;

  ctx.clearRect(0, 0, cw, ch);
  for (let i = 0; i < WHEEL_PRIZES.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? '#1A2333' : '#FFD13B';
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, i * arc, (i + 1) * arc);
    ctx.fill();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(i * arc + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#030811';
    ctx.font = "bold 13px Poppins";
    ctx.fillText(WHEEL_PRIZES[i], center - 30, 5);
    ctx.restore();
  }
}

/**
 * Web Audio Context Synthesizer helpers
 */
async function initAudioContext() {
  if (!window.audioCtx) {
    window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (window.audioCtx.state === 'suspended') {
    await window.audioCtx.resume();
  }
}

function scheduleTickSound(time) {
  try {
    if (!window.audioCtx) return;
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.linearRampToValueAtTime(400, time + 0.05);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.linearRampToValueAtTime(0.01, time + 0.05);
    osc.start(time);
    osc.stop(time + 0.05);
  } catch (err) {
    console.error("Tick audio synthesizer notice:", err);
  }
}

function scheduleWinSound(time) {
  try {
    if (!window.audioCtx) return;
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, time);
    osc.frequency.linearRampToValueAtTime(600, time + 0.1);
    osc.frequency.linearRampToValueAtTime(800, time + 0.3);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.3, time + 0.1);
    gain.gain.linearRampToValueAtTime(0.01, time + 1.0);
    osc.start(time);
    osc.stop(time + 1.0);
  } catch (err) {
    console.error("Win audio synthesizer notice:", err);
  }
}

/**
 * Executes spin wheel rotation and audio feedback
 */
async function spinWheel() {
  if (isSpinning) return;
  await initAudioContext();
  isSpinning = true;

  const resText = document.getElementById('spinResult');
  if (resText) resText.innerText = '';

  const spins = Math.floor(Math.random() * 3) + 5;
  const segmentAngle = 360 / WHEEL_PRIZES.length;

  let winSegment;
  do {
    winSegment = Math.floor(Math.random() * WHEEL_PRIZES.length);
  } while (WHEEL_PRIZES[winSegment] !== 'Free Coffee' && WHEEL_PRIZES[winSegment] !== 'Try Again');

  let targetDeg = 247.5 - (winSegment * segmentAngle);
  targetDeg = (targetDeg % 360 + 360) % 360;

  const offset = Math.floor(Math.random() * 30) - 15;
  targetDeg += offset;

  const currentMod = wheelDeg % 360;
  let diff = targetDeg - currentMod;
  if (diff <= 0) diff += 360;

  wheelDeg += diff + (spins * 360);

  const canvas = document.getElementById('wheel');
  if (canvas) {
    canvas.style.transform = `rotate(${wheelDeg}deg)`;
  }

  const audioNow = window.audioCtx ? window.audioCtx.currentTime : 0;
  const ticks = Math.floor((diff + (spins * 360)) / 20);

  for (let i = 0; i < ticks; i++) {
    const progress = i / ticks;
    const timeProgress = 1 - Math.pow(1 - progress, 0.33);
    if (window.audioCtx) {
      scheduleTickSound(audioNow + (timeProgress * 4.5));
    }
  }

  if (window.audioCtx) {
    scheduleWinSound(audioNow + 4.5);
  }

  setTimeout(() => {
    isSpinning = false;
    if (resText) {
      if (WHEEL_PRIZES[winSegment] === 'Try Again') {
        resText.innerText = 'Ah, close! Try Again!';
      } else {
        resText.innerText = `You won: ${WHEEL_PRIZES[winSegment]}!`;
      }
    }
  }, 4500);
}

/**
 * Render weekly events section
 */
function renderEventsList() {
  const eventsContainer = document.getElementById('weeklyEvents');
  if (!eventsContainer || !eventsList) return;

  eventsContainer.innerHTML = eventsList.map((e, index) => `
    <div class="event-card glass reveal" style="--delay: ${index * 0.1}s">
      <div style="font-size:40px; margin-bottom:10px;">${e.i}</div>
      <h3 style="font-size:24px;">${e.t}</h3>
      <div><span class="event-pill">${e.s}</span></div>
      <p class="event-desc">${e.d}</p>
      <button class="btn btn-o btn-sm" onclick="navigateTo('view-reservations');">Book Table</button>
    </div>
  `).join('');
}
