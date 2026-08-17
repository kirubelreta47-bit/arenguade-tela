/* ==========================================================================
   ARENGUADE TILA - REWARDS WHEEL & SOUND SYNTHESIZER
   ========================================================================== */

const WHEEL_PRIZES = [
  'Free Coffee',        // Index 0: Rare win (1 in 150)
  'Special Burger',     // Index 1: Display item (0% win)
  'Try Again',          // Index 2: Common (99.33%)
  'House Pizza',        // Index 3: Display item (0% win)
  'Free Dessert',       // Index 4: Rare win (1 in 150)
  'Try Again',          // Index 5: Common (99.33%)
  'Strawberry Juice',   // Index 6: Display item (0% win)
  'Free Drink',         // Index 7: Rare win (1 in 150)
  'Combo Platter',      // Index 8: Display item (0% win)
  'Try Again'           // Index 9: Common (99.33%)
];

let wheelDeg = 0;
let isSpinning = false;

/**
 * Draws the canvas wheel graphics in deep dark gold and midnight luxury theme
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
    // Alternating between deep luxury midnight and rich dark gold
    ctx.fillStyle = i % 2 === 0 ? '#080F1D' : '#A67C1E';
    ctx.moveTo(center, center);
    ctx.arc(center, center, center - 2, i * arc, (i + 1) * arc);
    ctx.fill();

    // Slice border in dark gold
    ctx.strokeStyle = 'rgba(166, 124, 30, 0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text label
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(i * arc + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = i % 2 === 0 ? '#D4AF37' : '#030811';
    ctx.font = "bold 11.5px 'Outfit', 'Poppins', sans-serif";
    ctx.fillText(WHEEL_PRIZES[i], center - 22, 4);
    ctx.restore();
  }

  // Draw elegant dark gold center hub
  ctx.beginPath();
  ctx.arc(center, center, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#A67C1E';
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner dark dot in hub
  ctx.beginPath();
  ctx.arc(center, center, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#030811';
  ctx.fill();

  // Outer dark gold rim
  ctx.beginPath();
  ctx.arc(center, center, center - 2, 0, Math.PI * 2);
  ctx.strokeStyle = '#A67C1E';
  ctx.lineWidth = 3.5;
  ctx.stroke();
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
 * Odds: 1 in 150 chance to win Free Coffee, Free Dessert, or Free Drink.
 * Other times (149 in 150) lands on Try Again.
 * Display items (Special Burger, House Pizza, Strawberry Juice, Combo Platter) never land (0%).
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
  const rareWinChance = Math.floor(Math.random() * 150) === 0; // 1 in 150

  if (rareWinChance) {
    const winOptions = [0, 4, 7]; // Free Coffee, Free Dessert, Free Drink
    winSegment = winOptions[Math.floor(Math.random() * winOptions.length)];
  } else {
    const tryAgainOptions = [2, 5, 9]; // Try Again slices
    winSegment = tryAgainOptions[Math.floor(Math.random() * tryAgainOptions.length)];
  }

  let targetDeg = 270 - ((winSegment + 0.5) * segmentAngle);
  targetDeg = (targetDeg % 360 + 360) % 360;

  // Small organic offset within slice
  const offset = Math.floor(Math.random() * (segmentAngle * 0.5)) - (segmentAngle * 0.25);
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
        resText.innerText = 'Ah, so close! Try Again next time!';
      } else {
        resText.innerText = `🎉 Congratulations! You won: ${WHEEL_PRIZES[winSegment]}!`;
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

  // Clean up any previously injected dynamic wrappers
  const existingHidden = document.getElementById('hiddenEventsContainer');
  if (existingHidden) existingHidden.remove();
  const existingBtn = document.getElementById('showMoreEventsWrapper');
  if (existingBtn) existingBtn.remove();

  // Show first 6 events
  const visibleEvents = eventsList.slice(0, 6);
  const hiddenEvents = eventsList.slice(6);

  let html = visibleEvents.map((e, index) => `
    <div class="event-card glass reveal" style="--delay: ${index * 0.1}s">
      <div style="font-size:40px; margin-bottom:10px;">${e.i}</div>
      <h3 style="font-size:24px;">${e.t}</h3>
      <div><span class="event-pill">${e.s}</span></div>
      <p class="event-desc">${e.d}</p>
      <button class="btn btn-o btn-sm" onclick="navigateTo('view-reservations');">Book Table</button>
    </div>
  `).join('');

  eventsContainer.innerHTML = html;

  // Add hidden events and show more button if additional events exist
  if (hiddenEvents.length > 0) {
    let hiddenHtml = `
      <div id="hiddenEventsContainer" style="display: none; grid-column: 1 / -1; padding-top: 24px;">
        <div class="grid grid-2" style="gap: 24px;">
    `;
    
    hiddenEvents.forEach((e, index) => {
      hiddenHtml += `
        <div class="event-card glass reveal" style="--delay: ${(6 + index) * 0.1}s">
          <div style="font-size:40px; margin-bottom:10px;">${e.i}</div>
          <h3 style="font-size:24px;">${e.t}</h3>
          <div><span class="event-pill">${e.s}</span></div>
          <p class="event-desc">${e.d}</p>
          <button class="btn btn-o btn-sm" onclick="navigateTo('view-reservations');">Book Table</button>
        </div>
      `;
    });
    
    hiddenHtml += `
        </div>
      </div>
      <div id="showMoreEventsWrapper" style="grid-column: 1 / -1; text-align: center; margin-top: 32px;">
        <button class="btn pulse-btn" onclick="toggleHiddenEvents()" id="showMoreBtn" 
          style="padding: 12px 32px; font-size: 12px; letter-spacing: 1px;">
          Show More Events
        </button>
      </div>
    `;

    eventsContainer.insertAdjacentHTML('afterend', hiddenHtml);
  }
}

/**
 * Toggle hidden events visibility
 */
function toggleHiddenEvents() {
  const hiddenContainer = document.getElementById('hiddenEventsContainer');
  const showMoreBtn = document.getElementById('showMoreBtn');
  
  if (!hiddenContainer || !showMoreBtn) return;

  const isHidden = hiddenContainer.style.display === 'none';
  
  if (isHidden) {
    hiddenContainer.style.display = 'block';
    hiddenContainer.style.animation = 'fadeIn 0.6s ease';
    showMoreBtn.textContent = 'Show Less Events';
  } else {
    hiddenContainer.style.display = 'none';
    showMoreBtn.textContent = 'Show More Events';
  }
}
