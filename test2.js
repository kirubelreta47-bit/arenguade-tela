    function navigateTo(viewId) {
      const el = document.getElementById(viewId);
      if(el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
      }
      closeMenu();
    }
    // Scroll Animations & Navbar
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
    function closeMenu() { document.getElementById('navLinks').classList.remove('open'); }

    // Data Generation
    const menuData = {
      "የፆም ምሳ": [
        {n: "አይነት", d: "Assorted fasting dishes", p: 450},
        {n: "የፆም አግልግል", d: "Misir · Atkilt · Dinich Wot · Nifro · Betkel Fit · Gomen · Shigna", p: 620},
        {n: "ሽሮ ፈሰስ", d: "Shiro sauce served with injera", p: 350},
        {n: "ትጎቢዮ", d: "Fasting tegobio dish", p: 400},
        {n: "የፆም ኮምቦ", d: "Fasting combo platter", p: 670},
        {n: "ሱፍ ፍትፍት", d: "Sunflower seed fitfit", p: 320},
        {n: "የፆም ነመን ክትፎ", d: "Lean fasting kitfo variation", p: 380}
      ],
      "የፍስክ ምሳ": [
        {n: "የፍስክ አግልግል", d: "Assorted meat dishes: Kitfo · Tibs · Firfir · Gomen · Shigna", p: 780},
        {n: "ባንቱ", d: "Siga Firfir · Enkuklal · Doro", p: 620},
        {n: "ምንቸት በቀይ", d: "Minced meat in red spiced sauce", p: 350},
        {n: "ምንቸት በአልጫ", d: "Minced meat in mild alicha sauce", p: 350},
        {n: "ቅቅል", d: "Traditional kikil bone broth stew", p: 480},
        {n: "ጥብስ", d: "Beef tibs", p: 750},
        {n: "ጫካን ጥብስ", d: "Special tibs", p: 780},
        {n: "ስጎ ፍርፍር", d: "Beef firfir", p: 500},
        {n: "ዱንጥ ፍርፍር", d: "Home-style firfir with ayib & kibbeh", p: 480},
        {n: "የፍስክ ኮምቦ", d: "Meat combo platter: Kitfo · Tibs · Firfir & more", p: 750}
      ],
      "ቁርስ": [
        {n: "ጪጪብሳ", d: "Chechebsa with kibbeh, potash & honey", p: 250},
        {n: "አስቴኛል ጪጪብሳ", d: "Special chechebsa with potash · ayib · egg", p: 350},
        {n: "ፋል", d: "Ful medames with egg · tomato · onion · chilli", p: 250},
        {n: "ፋል አስቴኛል", d: "Special ful with egg · tomato · ayib · enkuklal", p: 350},
        {n: "ፈጥራ", d: "Fetira (Ethiopian pancake)", p: 250},
        {n: "ፈጥራ አስቴኛል", d: "Special fetira with enkuklal · egg · kibbeh", p: 350},
        {n: "ፍርፍር", d: "Firfir (bread pieces in spiced sauce)", p: 280},
        {n: "ሃፍ ሃፍ", d: "Half & half combination", p: 500},
        {n: "ዱለት", d: "Dulet (minced tripe & liver)", p: 550},
        {n: "አስቴኛል ዱለት", d: "Special dulet with egg · ayib · kibbeh", p: 680},
        {n: "አንቁላል ፍርፍር", d: "Egg firfir", p: 320},
        {n: "አንቁላል ስልስ", d: "Egg with silsi sauce", p: 350},
        {n: "አንቁላል ብሰጎ", d: "Egg with beef", p: 420},
        {n: "ብራክ ፋስት ኮምቦ", d: "Breakfast combo: egg · chechebsa · firfir", p: 420}
      ],
      "Pizza": [
        {n: "Vegetable Pizza", d: "Mushroom · cooked veg · oregano", p: 450},
        {n: "Tuna Fasting Pizza", d: "Tuna · garlic · oregano", p: 650},
        {n: "Margherita Pizza", d: "Mozzarella cheese · oregano · hot tomato sauce", p: 700},
        {n: "Chalazion Pizza", d: "Minced beef · mozzarella · mushroom · oregano", p: 780},
        {n: "Tuna with Cheese Pizza", d: "Tuna · shredded mozzarella cheese", p: 800},
        {n: "Meat Lover Pizza", d: "Mozzarella · minced beef · black olive · oregano", p: 800},
        {n: "The Super Pizza", d: "Mozzarella · chicken · minced beef · mushroom · black olives · tuna", p: 950}
      ],
      "Burger": [
        {n: "Beef Burger", d: "BBQ sauce · tomato · onion · mayonnaise · lettuce · french fries", p: 550},
        {n: "Cheese Burger", d: "Provolone cheese · tomato · onion · mayonnaise · lettuce · french fries", p: 620},
        {n: "Special Burger", d: "Provolone cheese · beef · mortadella · tomato · onion · mayonnaise · lettuce · french fries", p: 730},
        {n: "French Fries", d: "Batter fried potatoes · ketchup", p: 250}
      ],
      "Sandwich": [
        {n: "Egg Sandwich", d: "Egg · lettuce · tomato · onion · french fries", p: 300},
        {n: "Vegetable Sandwich", d: "Grilled veg · lettuce", p: 350},
        {n: "Tuna Sandwich", d: "Tuna · onion · tomato · cheese · lettuce · french fries", p: 480},
        {n: "Club Sandwich", d: "Minced beef · boiled egg · chopped tomato · chilli · lettuce · mayonnaise · french fries", p: 620},
        {n: "Steak Sandwich", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750},
        {n: "Chicken Sandwich", d: "Tender chicken · grilled tomato · onion · green chilli · lettuce · french fries", p: 780}
      ],
      "Wrap": [
        {n: "Vegetable Wrap", d: "Cooked vegetable · mushroom · avocado · fries", p: 420},
        {n: "Avocado Wrap", d: "Avocado · black pepper · french fries", p: 480},
        {n: "Tuna Wrap", d: "Tuna · grilled tomato · onion · lettuce · fries · avocado · green chilli", p: 570},
        {n: "Beef Wrap", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750},
        {n: "Chicken Wrap", d: "Tender chicken · grilled tomato · onion · lettuce · fries · green chilli", p: 850}
      ],
      "Spaghetti": [
        {n: "Spaghetti with Tomato Sauce", d: "Classic spaghetti in tomato sauce", p: 420},
        {n: "Spaghetti with Veg", d: "Spaghetti with mixed vegetables", p: 450},
        {n: "Carbonara", d: "Creamy carbonara spaghetti", p: 580},
        {n: "Lasagna", d: "Baked layered lasagna", p: 720}
      ],
      "Salad": [
        {n: "Arenguade Tila Special Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · papaya · avocado · mango · parsley dressing", p: 470},
        {n: "Italian Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · parsley dressing · mozzarella · olives", p: 580},
        {n: "Tuna Salad", d: "Tuna · tomato · kiyar · freeze salad · chaina salad · onion · green chilli · parsley dressing", p: 680},
        {n: "Chicken Caesar Salad", d: "Grilled chicken · chaina salad · freeze salad · carrot · onion · mayonnaise dressing", p: 850}
      ],
      "ክትፎ": [
        {n: "ነመን ክትፎ", d: "Lean kitfo — mildly seasoned minced beef", p: 500},
        {n: "ክትፎ ኖርማል", d: "Standard kitfo portion with all accompaniments", p: 1200},
        {n: "ክትፎ ስቴኛል", d: "Premium special kitfo — full portion, all accompaniments", p: 1700}
      ]
    };

    const tabsCont = document.getElementById('menuTabs');
    const gridCont = document.getElementById('menuGrid');
    let activeTabText = "የፆም ምሳ";

    
    
    let isMoreOpen = false;
    let showAllItems = false;
    function renderMenu() {
      const keys = Object.keys(menuData);
      const visibleKeys = keys.slice(0, 4);
      const moreKeys = keys.slice(4);

      let html = visibleKeys.map(k => 
        `<button class="tab ${k === activeTabText ? 'active' : ''}" onclick="switchTab('${k}')">${k}</button>`
      ).join('');

      html += `<div style="position: relative; display: inline-block;">
        <button class="tab ${moreKeys.includes(activeTabText) ? 'active' : ''}" onclick="toggleMoreTabs(event)">More ▾</button>
        <div id="moreTabsDropdown" style="display: ${isMoreOpen ? 'grid' : 'none'}; grid-template-columns: repeat(3, 1fr); gap: 10px; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: var(--nm); border: 1px solid rgba(212,175,55,0.3); padding: 15px; border-radius: 8px; z-index: 100; min-width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          ${moreKeys.map(k => 
            `<button class="tab ${k === activeTabText ? 'active' : ''}" style="width: 100%; text-align: center; font-size: 11px; padding: 8px;" onclick="switchTab('${k}')">${k}</button>`
          ).join('')}
        </div>
      </div>`;
      
      tabsCont.innerHTML = html;

      const items = menuData[activeTabText];
      const limit = showAllItems ? items.length : 4;
      const visibleItems = items.slice(0, limit);

      gridCont.innerHTML = visibleItems.map((itm, i) => `
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20${encodeURIComponent(itm.n)}%20${encodeURIComponent(activeTabText === 'Pizza' || activeTabText === 'Burger' || activeTabText === 'Sandwich' || activeTabText === 'Wrap' || activeTabText === 'Spaghetti' || activeTabText === 'Salad' ? activeTabText : 'ethiopian food plate')}%20photography%20restaurant?width=500&height=350&nologo=true" alt="${itm.n}" loading="lazy">
          <div class="menu-card-body">
            <div>
              <h3 class="mb-1" style="font-size:20px;">${itm.n}</h3>
              <p class="gray mb-2" style="font-size:13px; min-height:40px;">${itm.d}</p>
            </div>
            <div class="flex" style="justify-content:space-between; margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:15px;">
              <span class="gold" style="font-weight:600; font-size:18px;">${itm.p} ETB</span>
              <button class="btn btn-o btn-sm" onclick="addToCart('${itm.n}', ${itm.p})">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');

      const viewMoreBtnCont = document.getElementById('viewMoreBtnCont');
      if (items.length > 4 && !showAllItems) {
        if(!viewMoreBtnCont) {
          const btnHtml = `<div id="viewMoreBtnCont" style="text-align: center; margin-top: 40px; width: 100%;"><button class="btn" onclick="showMoreItems()">View Full Menu</button></div>`;
          gridCont.insertAdjacentHTML('afterend', btnHtml);
        } else {
          viewMoreBtnCont.style.display = 'block';
        }
      } else {
        if(viewMoreBtnCont) {
          viewMoreBtnCont.style.display = 'none';
        }
      }
    }

    function showMoreItems() {
      showAllItems = true;
      renderMenu();
    }

    function toggleMoreTabs(e) {
      if(e) e.stopPropagation();
      isMoreOpen = !isMoreOpen;
      renderMenu();
    }

    // Close more dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('moreTabsDropdown');
      if(isMoreOpen && dropdown && !e.target.closest('.menu-tabs')) {
        isMoreOpen = false;
        renderMenu();
      }
    });

    function switchTab(t) { 
      activeTabText = t; 
      isMoreOpen = false;
      showAllItems = false;
      renderMenu(); 
    }


    renderMenu();

    // Events
    const eventsList = [
      {i:'🎲', t:'Game Night', s:'Every Thursday', d:'Chess, Uno, Jenga & board games. Winners earn restaurant rewards.'},
      {i:'❤️', t:'Couples Night', s:'Every Friday', d:'Candlelight dinner, special menu, romantic lighting. Reservation recommended.'},
      {i:'🎤', t:'Open Mic', s:'1st & 3rd Saturday', d:'Music, poetry, comedy, storytelling. Supporting local artists.'},
      {i:'🎵', t:'Live Music', s:'Every Sunday', d:'Live performances from local musicians. Relax with great food.'}
    ];
    document.getElementById('weeklyEvents').innerHTML = eventsList.map((e, index) => `
      <div class="event-card glass reveal" style="--delay: ${index * 0.1}s">
        <div style="font-size:40px; margin-bottom:10px;">${e.i}</div>
        <h3 style="font-size:24px;">${e.t}</h3>
        <div><span class="event-pill">${e.s}</span></div>
        <p class="gray" style="font-size:14px; margin-bottom: 20px; flex-grow:1;">${e.d}</p>
        <button class="btn btn-o btn-sm" onclick="navigateTo('view-reservations');">Book Table</button>
      </div>
    `).join('');

    

    // Testimonials
    const testData = [
      {n: "Mihret A.", c: "Addis Ababa", q: "The Doro Wot here is just like my grandmother used to make. Absolutely stunning atmosphere and flavors."},
      {n: "David L.", c: "London", q: "Best Ethiopian restaurant experience I've had. The traditional coffee ceremony is breathtaking. Will return!"},
      {n: "Sara T.", c: "Nairobi", q: "A perfect blend of modern elegance and authentic culture. The staff is incredibly warm and welcoming."},
      {n: "Abel K.", c: "Addis Ababa", q: "Our go-to spot for family dinners. The Tibs are always sizzling perfectly. Beautiful interior design too."},
      {n: "Jessica M.", c: "New York", q: "The vegan fasting options are unbelievably good. The Shiro Tegamino is a must-try for everyone."}
    ];
    document.getElementById('testTrack').innerHTML = testData.map(t => `
      <div class="test-slide" style="padding: 0 16px;">
        <img src="https://picsum.photos/seed/${t.n.replace(/\s/g,'')}/100/100" alt="Avatar" style="width: 48px; height: 48px; margin: 0 auto 12px;">
        <h4 class="gold" style="font-size: 14px;">${t.n}</h4>
        <p class="gray mb-1" style="font-size: 11px;">${t.c}</p>
        <div class="stars" style="font-size: 12px; margin-bottom: 8px;">★★★★★</div>
        <p class="italic" style="font-size: 13px;">"${t.q}"</p>
      </div>
    `).join('');
    
    // Slider Logic
    const track = document.getElementById('testTrack');
    const dotsCont = document.getElementById('testDots');
    let curSlide = 0;
    
    dotsCont.innerHTML = testData.map((_, i) => `<div class="dot ${i===0?'active':''}" onclick="goToSlide(${i})"></div>`).join('');
    
    function goToSlide(idx) {
      curSlide = idx % testData.length;
      track.style.transform = `translateX(-${curSlide * 20}%)`;
      document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === curSlide));
    }
    setInterval(() => goToSlide(curSlide + 1), 5000);

    // Spin Wheel Canvas Logic
        const canvas = document.getElementById('wheel');
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
      
      canvas.style.transform = `rotate(${wheelDeg}deg)`;
      
      setTimeout(() => {
        spinning = false;
        const actualDeg = wheelDeg % 360;
        const segment = Math.round(((360 - actualDeg) % 360) / segmentAngle) % prizes.length;
        if (prizes[segment] === 'Try Again') {
          resText.innerText = 'Ah, close! Try Again!';
        } else {
          resText.innerText = `You won: ${prizes[segment]}!`;
        }
      }, 4500);
    }

    // Cart Logic
    let cart = [];
    const cd = document.getElementById('cartDrawer');
    const co = document.getElementById('drawerOverlay');
    const ci = document.getElementById('cartItems');
    const cb = document.getElementById('cartBadge');
    const cs = document.getElementById('cartSubtotal');

    function toggleCart() {
      cd.classList.toggle('open');
      co.classList.toggle('active');
    }

    function addToCart(name, price) {
      let item = cart.find(i => i.n === name);
      item ? item.q++ : cart.push({n: name, p: price, q: 1});
      renderCart();
      cb.style.transform = "scale(1.5)";
      setTimeout(() => cb.style.transform = "scale(1)", 200);
    }
    
    function modCart(n, delta) {
      let idx = cart.findIndex(i => i.n === n);
      if(idx < 0) return;
      cart[idx].q += delta;
      if(cart[idx].q <= 0) cart.splice(idx, 1);
      renderCart();
    }
    
    function renderCart() {
      let sum = 0, count = 0;
      if(cart.length === 0) {
        ci.innerHTML = '<p class="gray text-center mt-4">Your cart is empty.</p>';
      } else {
        ci.innerHTML = cart.map(c => {
          sum += c.p * c.q; count += c.q;
          return `<div class="cart-item">
            <div><div class="gold" style="font-weight:500;">${c.n}</div><div class="gray" style="font-size:13px;">${c.p} ETB</div></div>
            <div class="flex" style="gap:10px; background:rgba(0,0,0,0.3); border-radius:4px; padding:2px;">
              <button class="btn btn-o btn-sm" style="border:none; padding:4px 8px;" onclick="modCart('${c.n}', -1)">-</button> 
              <span style="min-width:15px; text-align:center; font-size:14px;">${c.q}</span> 
              <button class="btn btn-o btn-sm" style="border:none; padding:4px 8px;" onclick="modCart('${c.n}', 1)">+</button>
            </div>
          </div>`;
        }).join('');
      }
      cs.innerText = sum + ' ETB';
      cb.innerText = count;
    }

    function startCheckout() {
      if(cart.length === 0) return alert('Cart is empty!');
      toggleCart();
      openModal('checkoutModal');
    }

    document.getElementById('checkoutForm').onsubmit = (e) => {
      e.preventDefault();
      closeModal('checkoutModal');
      alert("Thank you! Your order has been received for pickup. We'll call you to confirm.");
      cart = []; renderCart();
    };

    // Forms & Modals
    document.getElementById('resForm').onsubmit = (e) => {
      e.preventDefault();
      const wrap = document.getElementById('reservationFormWrapper');
      wrap.innerHTML = `
        <div class="text-center" style="padding: 40px 20px;">
          <div style="font-size: 60px; color: #2ecc71; margin-bottom: 20px;">✔</div>
          <h2 class="gold mb-2">Table Reserved!</h2>
          <p class="gray">Your request has been securely logged. We will contact you shortly via phone to confirm your perfect evening.</p>
          <button class="btn btn-o" style="margin-top:30px;" onclick="location.reload()">Book Another</button>
        </div>
      `;
    };

    function openModal(id) { document.getElementById(id).classList.add('active'); }
    function closeModal(id) { document.getElementById(id).classList.remove('active'); }
    
    // Lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    let lbImages = [];
    let lbCur = 0;
    
    function openLightbox(src) {
      lbImages = Array.from(document.querySelectorAll('.masonry-item img')).map(img => img.src);
      lbCur = lbImages.indexOf(src);
      lbImg.src = src;
      lb.classList.add('active');
    }
    function closeLightbox() { lb.classList.remove('active'); }
    function lbNavigate(dir) {
      event.stopPropagation();
      lbCur = (lbCur + dir + lbImages.length) % lbImages.length;
      lbImg.src = lbImages[lbCur];
    }
    
    window.onclick = function(e) {
      if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
      if(e.target.id === 'lightbox') closeLightbox();
    }
    
    // Add observers to dynamically generated elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
