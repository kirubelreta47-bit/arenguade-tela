const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldRewardsStr = `  <div class="page-view" id="view-rewards">
  <!-- 10. SPIN WHEEL -->
  <section class="bg-mid" style="position: relative; overflow: hidden; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div id="silk-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;"></div>
    <div class="container reveal" style="position: relative; z-index: 1;">
      <div class="center flex col" style="max-width: 500px; margin: 0 auto; padding: 40px;">
        <h2 class="gold mb-2" style="font-size: 32px;">Spin & Win</h2>
        <p class="gray mb-4" style="font-size: 14px;">Unlocked after spending 2000 ETB in one order. Try your luck!</p>
        <div class="wheel-wrap" style="display: none; animation: float 6s ease-in-out infinite;">
          <div class="wheel-pointer"></div>
          <canvas id="wheel" width="320" height="320"></canvas>
        </div>
        <button class="btn pulse-btn" style="margin-top: 30px; width: 200px;" onclick="spinWheel()" id="spinBtn">SPIN WHEEL</button>
        <div id="spinResult" class="gold" style="margin-top: 15px; font-weight: 600; height: 24px; transition: all 0.3s ease;"></div>
      </div>
    </div>
  </section>

  <!-- 11. SOCIAL MEDIA REWARDS -->
  <section id="social" style="padding: 60px 0;">
    <div class="container reveal">
      <div class="center flex col" style="text-align: center; max-width: 600px; margin: 0 auto; padding: 40px; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
        <h2 class="gold mb-2" style="font-size: 32px;">Tag & Win</h2>
        <p class="gray mb-4" style="font-size: 15px;">Tag us in your social media posts with <strong class="gold">#ArenguadeTila</strong> for a chance to win a free meal! A new winner is selected every month.</p>
        <div class="flex center" style="gap: 15px; margin-top: 10px;">
          <a href="#" class="btn btn-o" style="padding: 10px 24px;">📸 Follow on Instagram</a>
        </div>
      </div>
    </div>
  </section>`;

const newRewardsStr = `  <div class="page-view" id="view-rewards" style="position: relative; overflow: hidden; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0;">
    <div id="silk-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;"></div>
    
  <!-- 10. SPIN WHEEL -->
  <section style="position: relative; z-index: 1; width: 100%; padding: 40px 0;">
    <div class="container reveal">
      <div class="center flex col" style="max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 class="gold mb-2" style="font-size: 32px;">Spin & Win</h2>
        <p class="gray mb-4" style="font-size: 14px;">Unlocked after spending 2000 ETB in one order. Try your luck!</p>
        <div class="wheel-wrap" style="animation: float 6s ease-in-out infinite;">
          <div class="wheel-pointer"></div>
          <canvas id="wheel" width="320" height="320"></canvas>
        </div>
        <button class="btn pulse-btn" style="margin-top: 30px; width: 200px;" onclick="spinWheel()" id="spinBtn">SPIN WHEEL</button>
        <div id="spinResult" class="gold" style="margin-top: 15px; font-weight: 600; height: 24px; transition: all 0.3s ease;"></div>
      </div>
    </div>
  </section>

  <!-- 11. SOCIAL MEDIA REWARDS -->
  <section id="social" style="position: relative; z-index: 1; width: 100%; padding: 40px 0;">
    <div class="container reveal">
      <div class="center flex col" style="text-align: center; max-width: 600px; margin: 0 auto; padding: 40px; background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
        <h2 class="gold mb-2" style="font-size: 32px;">Tag & Win</h2>
        <p class="gray mb-4" style="font-size: 15px;">Tag us in your social media posts with <strong class="gold">#ArenguadeTila</strong> for a chance to win a free meal! A new winner is selected every month.</p>
        <div class="flex center" style="gap: 15px; margin-top: 10px;">
          <a href="#" class="btn btn-o" style="padding: 10px 24px;">📸 Follow on Instagram</a>
        </div>
      </div>
    </div>
  </section>`;

if (content.includes(oldRewardsStr)) {
  content = content.replace(oldRewardsStr, newRewardsStr);
} else {
  console.log("Could not find the old string exactly.");
}

// Ensure the canvas CSS is correct, restore border-radius 50% but make it look nice without the extra circle space behind it
const oldCanvasCss = '.wheel-wrap canvas { width: 100%; height: 100%; transition: transform 4.5s cubic-bezier(0.1, 0.7, 0.1, 1); }';
const newCanvasCss = '.wheel-wrap canvas { width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(212,175,55,0.3); box-shadow: 0 0 40px rgba(0,0,0,0.3); transition: transform 4.5s cubic-bezier(0.1, 0.7, 0.1, 1); background: transparent; }';
if (content.includes(oldCanvasCss)) {
  content = content.replace(oldCanvasCss, newCanvasCss);
}

fs.writeFileSync('index.html', content);
