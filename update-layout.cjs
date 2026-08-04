const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Extract view-reservations
const resMatch = content.match(/<div class="page-view" id="view-reservations">[\s\S]*?<\/section>\s*<\/div>/);
if (resMatch) {
    content = content.replace(resMatch[0], '');
    
    // Insert view-reservations before view-contact
    content = content.replace(/<div class="page-view" id="view-contact">/, resMatch[0] + '\n\n  <div class="page-view" id="view-contact">');
}

// 2. Modify view-contact
const testMatch = content.match(/<!-- 15\. TESTIMONIALS -->[\s\S]*?<!-- 17\. CONTACT -->/);
if (testMatch) {
    content = content.replace(testMatch[0], '<!-- 17. CONTACT -->');
}

content = content.replace(/<h2 class="gold text-center mb-4 text-huge" style="font-size: 42px;">We'd love to welcome you.<\/h2>/, '<h2 class="gold text-center mb-4 text-huge" style="font-size: 36px;">Contact Us</h2>');

const socialIconsOld = `<div class="social-icons">
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">TK</a>
            <a href="#">TG</a>
          </div>`;
          
const socialIconsNew = `<div class="social-icons">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="TikTok">TT</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Telegram">TG</a>
          </div>`;
          
content = content.replace(socialIconsOld, socialIconsNew);

// 3. Insert view-rate after view-contact
const rateUsHTML = `
  <div class="page-view" id="view-rate">
  <!-- RATE US -->
  <section id="rate" style="padding: 60px 0;">
    <div class="container reveal">
      <div class="text-center mb-4">
        <h2 class="gold mb-1" style="font-size: 36px;">Rate Us</h2>
        <p class="gray">We value your feedback. Let us know how we did!</p>
      </div>
      <div style="max-width: 600px; margin: 0 auto; background: var(--nm); padding: 40px; border-radius: var(--br); border: 1px solid rgba(212,175,55,0.1);">
        <form onsubmit="event.preventDefault(); alert('Thank you for your rating!'); this.reset();">
          <div class="stars" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; font-size: 40px; color: var(--g); cursor: pointer;">
            <span onclick="setRating(1)">★</span><span onclick="setRating(2)">★</span><span onclick="setRating(3)">★</span><span onclick="setRating(4)">★</span><span onclick="setRating(5)">☆</span>
          </div>
          <input type="hidden" id="ratingValue" value="4">
          <textarea placeholder="Tell us about your experience..." rows="4" required style="width: 100%; margin-bottom: 20px;"></textarea>
          <button type="submit" class="btn" style="width: 100%;">Submit Rating</button>
        </form>
      </div>
    </div>
  </section>
  </div>`;

content = content.replace(/<\/section>\s*<\/div>\s*<\/div>\s*<!-- FULL MENU PAGE -->/, '</section>\n  </div>\n' + rateUsHTML + '\n\n</div>\n\n  <!-- FULL MENU PAGE -->');

// 4. Update Nav Links
const navLinksOld = `<li><a href="#" onclick="navigateTo('view-reservations'); return false;">Reservations</a></li>
      <li><a href="#" onclick="navigateTo('view-contact'); return false;">Contact</a></li>`;
const navLinksNew = `<li><a href="#" onclick="navigateTo('view-reservations'); return false;">Reservations</a></li>
      <li><a href="#" onclick="navigateTo('view-contact'); return false;">Contact</a></li>
      <li><a href="#" onclick="navigateTo('view-rate'); return false;">Rate Us</a></li>`;

content = content.replace(navLinksOld, navLinksNew);

// 5. Remove Testimonial JS Logic
const testJs = /const testData = \[[\s\S]*?setInterval\(\(\) => goToSlide\(curSlide \+ 1\), 5000\);/;
if (testJs.test(content)) {
    content = content.replace(testJs, '');
}

// 6. Add rating JS logic
const jsInsert = `
    function setRating(val) {
      document.getElementById('ratingValue').value = val;
      const stars = document.querySelectorAll('.stars span');
      stars.forEach((s, i) => {
        s.innerText = i < val ? '★' : '☆';
      });
    }
`;

content = content.replace(/<\/script>/, jsInsert + '\n  </script>');

fs.writeFileSync('index.html', content);
console.log("Updated Layout");
