    function navigateTo(viewId) {
      var mainPage = document.getElementById('main-scroll-page');
      var fullMenuPage = document.getElementById('full-menu-page');
      
      if (viewId === 'view-full-menu') {
        mainPage.style.display = 'none';
        fullMenuPage.style.display = 'block';
        window.scrollTo(0, 0);
      } else {
        mainPage.style.display = 'block';
        fullMenuPage.style.display = 'none';
        
        var el = document.getElementById(viewId);
        if(el) {
          var offset = 80;
          var bodyRect = document.body.getBoundingClientRect().top;
          var elementRect = el.getBoundingClientRect().top;
          var elementPosition = elementRect - bodyRect;
          var offsetPosition = elementPosition - offset;

          window.scrollTo({
               top: offsetPosition,
               behavior: "smooth"
          });
        }
      }
      closeMenu();
    }
    // Scroll Animations & Navbar
    var nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    var observer = new IntersectionObserver(entries => {
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
    var menuData = {
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

    var tabsCont = document.getElementById('menuTabs');
    var gridCont = document.getElementById('menuGrid');
    var activeTabText = "የፆም ምሳ";

    
    
        var fullMenuActiveTab = "የፆም ምሳ";

    function renderFeaturedMenu() {
      var gridCont = document.getElementById('menuGrid');
      var tabsCont = document.getElementById('menuTabs');
      if (tabsCont) tabsCont.style.display = 'none'; // hide tabs on featured menu
      
      // Get first 4 items from first category
      var featuredItems = menuData["የፆም ምሳ"].slice(0, 4);
      
      gridCont.innerHTML = featuredItems.map((itm, i) => `
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20${encodeURIComponent(itm.n)}%20ethiopian%20food%20plate%20photography%20restaurant?width=500&height=350&nologo=true" alt="${itm.n}" loading="lazy">
          <div class="menu-card-body">
            <div>
              <h3 class="mb-1" style="font-size:20px;">${itm.n}</h3>
              <p class="gray mb-2" style="font-size:13px; min-height:40px;">${itm.d}</p>
            </div>
            <div class="flex" style="justify-content:space-between; margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:15px;">
              <span class="gold" style="font-weight:600; font-size:18px;">${itm.p} ETB</span>
              
            </div>
          </div>
        </div>
      `).join('');

      var btnHtml = `<div style="text-align: center; margin-top: 40px; width: 100%;"><button class="btn" onclick="navigateTo('view-full-menu'); return false;">View Full Menu</button></div>`;
      gridCont.insertAdjacentHTML('afterend', btnHtml);
    }

    function renderFullMenu() {
      var tabsCont = document.getElementById('fullMenuTabs');
      var gridCont = document.getElementById('fullMenuGrid');
      
      var keys = Object.keys(menuData);
      
      var tabsHtml = keys.map(k => 
        `<button class="tab ${k === fullMenuActiveTab ? 'active' : ''}" onclick="switchFullTab('${k}')">${k}</button>`
      ).join('');
      
      tabsCont.innerHTML = tabsHtml;

      var items = menuData[fullMenuActiveTab];
      gridCont.innerHTML = items.map((itm, i) => `
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20${encodeURIComponent(itm.n)}%20${encodeURIComponent(fullMenuActiveTab === 'Pizza' || fullMenuActiveTab === 'Burger' || fullMenuActiveTab === 'Sandwich' || fullMenuActiveTab === 'Wrap' || fullMenuActiveTab === 'Spaghetti' || fullMenuActiveTab === 'Salad' ? fullMenuActiveTab : 'ethiopian food plate')}%20photography%20restaurant?width=500&height=350&nologo=true" alt="${itm.n}" loading="lazy">
          <div class="menu-card-body">
            <div>
              <h3 class="mb-1" style="font-size:20px;">${itm.n}</h3>
              <p class="gray mb-2" style="font-size:13px; min-height:40px;">${itm.d}</p>
            </div>
            <div class="flex" style="justify-content:space-between; margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:15px;">
              <span class="gold" style="font-weight:600; font-size:18px;">${itm.p} ETB</span>
              
            </div>
          </div>
        </div>
      `).join('');
    }

    function switchFullTab(t) { 
      fullMenuActiveTab = t; 
      renderFullMenu(); 
    }

    // Call both
    renderFeaturedMenu();
    renderFullMenu();


    

    // Events
    var eventsList = [
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
    var testData = [
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
    var track = document.getElementById('testTrack');
    var dotsCont = document.getElementById('testDots');
    var curSlide = 0;
    
    dotsCont.innerHTML = testData.map((_, i) => `<div class="dot ${i===0?'active':''}" onclick="goToSlide(${i})"></div>`).join('');
    
    function goToSlide(idx) {
      curSlide = idx % testData.length;
      track.style.transform = `translateX(-${curSlide * 20}%)`;
      document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === curSlide));
    }
    setInterval(() => goToSlide(curSlide + 1), 5000);

    // Spin Wheel Canvas Logic
        var canvas = document.getElementById('wheel');
    var ctx = canvas.getContext('2d');
    var prizes = ['Free Coffee', 'Try Again', 'Shiro', '10% Off', 'Combo Platter', 'Try Again', 'Free Drink', 'Free Dessert'];
    var cw = canvas.width, ch = canvas.height, center = cw/2;
    
    function drawWheel() {
      ctx.clearRect(0, 0, cw, ch);
      var arc = Math.PI * 2 / prizes.length;
      for (var i = 0; i < prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#1A2333' : '#FFD13B';
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
    }
    drawWheel();
    
    var wheelDeg = 0;
    var spinning = false;
    function spinWheel() {
      if(spinning) return;
      spinning = true;
      var resText = document.getElementById('spinResult');
      resText.innerText = '';
      
      var spins = Math.floor(Math.random() * 3) + 5;
      var segmentAngle = 360 / prizes.length;
      
      var winSegment;
      do {
        winSegment = Math.floor(Math.random() * prizes.length);
      } while(winSegment === 4); // Index 4 is 'Combo Platter', which they can't win
      
      // Pointer is at 270 deg. Segment is at winSegment * 45 + 22.5 deg.
      // We want: winSegment * 45 + 22.5 + rotate_angle = 270
      // rotate_angle = 247.5 - winSegment * 45
      var targetDeg = 247.5 - (winSegment * segmentAngle);
      // Ensure positive modulo 360
      targetDeg = (targetDeg % 360 + 360) % 360;
      
      var offset = Math.floor(Math.random() * 30) - 15; // Random offset within the slice
      targetDeg += offset;
      
      var currentMod = wheelDeg % 360;
      var diff = targetDeg - currentMod;
      if (diff <= 0) diff += 360;
      
      wheelDeg += diff + (spins * 360);
      
      var canvas = document.getElementById('wheel');
      canvas.style.transform = `rotate(${wheelDeg}deg)`;
      
      setTimeout(() => {
        spinning = false;
        if (prizes[winSegment] === 'Try Again') {
          resText.innerText = 'Ah, close! Try Again!';
        } else {
          resText.innerText = `You won: ${prizes[winSegment]}!`;
        }
      }, 4500);
    }


    // Forms & Modals
    document.getElementById('resForm').onsubmit = (e) => {
      e.preventDefault();
      var wrap = document.getElementById('reservationFormWrapper');
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
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lb-img');
    var lbImages = [];
    var lbCur = 0;
    
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
