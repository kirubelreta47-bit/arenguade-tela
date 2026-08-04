const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// We'll replace the links to use hash routing or onclick
content = content.replace(/<a href="#hero" onclick="closeMenu\(\)">Home<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-home\\\'); return false;">Home</a>');
content = content.replace(/<a href="#about" onclick="closeMenu\(\)">About<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-about\\\'); return false;">About</a>');
content = content.replace(/<a href="#menu" onclick="closeMenu\(\)">Menu<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-menu\\\'); return false;">Menu</a>');
content = content.replace(/<a href="#events" onclick="closeMenu\(\)">Events<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-events\\\'); return false;">Events</a>');
content = content.replace(/<a href="#social" onclick="closeMenu\(\)">Rewards<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-rewards\\\'); return false;">Rewards</a>');
content = content.replace(/<a href="#reservations" onclick="closeMenu\(\)">Reservations<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-reservations\\\'); return false;">Reservations</a>');
content = content.replace(/<a href="#contact" onclick="closeMenu\(\)">Contact<\/a>/, '<a href="#" onclick="navigateTo(\\\'view-contact\\\'); return false;">Contact</a>');

// Also update the logo link
content = content.replace(/<a href="#" aria-label="Home">/, '<a href="#" onclick="navigateTo(\\\'view-home\\\'); return false;" aria-label="Home">');

// Wrap sections in page-views
// We can use string splitting or just regex. It's safer to use split/replace if we're careful.
// Let's inject CSS first
content = content.replace(/<\/style>/, `
    .page-view { display: none; min-height: 80vh; }
    #view-home { display: block; }
  </style>`);

// Now let's inject the JS
content = content.replace(/\/\/ Scripts/, `// Scripts
    function navigateTo(viewId) {
      document.querySelectorAll('.page-view').forEach(el => el.style.display = 'none');
      document.getElementById(viewId).style.display = 'block';
      window.scrollTo(0, 0);
      closeMenu();
    }
`);

// Now wrap sections manually
content = content.replace(/<!-- 2\. HERO -->/, '<div class="page-view" id="view-home">\n  <!-- 2. HERO -->');
// End view-home before ABOUT
content = content.replace(/<!-- 3\. ABOUT -->/, '</div>\n\n  <div class="page-view" id="view-about">\n  <!-- 3. ABOUT -->');
// End view-about before MENU
content = content.replace(/<!-- 5\. MENU -->/, '</div>\n\n  <div class="page-view" id="view-menu">\n  <!-- 5. MENU -->');
// End view-menu before RESERVATIONS
content = content.replace(/<!-- 7\. RESERVATIONS -->/, '</div>\n\n  <div class="page-view" id="view-reservations">\n  <!-- 7. RESERVATIONS -->');
// End view-reservations before EVENTS
content = content.replace(/<!-- 8\. EVENTS -->/, '</div>\n\n  <div class="page-view" id="view-events">\n  <!-- 8. EVENTS -->');
// End view-events before SPIN WHEEL
content = content.replace(/<!-- 10\. SPIN WHEEL -->/, '</div>\n\n  <div class="page-view" id="view-rewards">\n  <!-- 10. SPIN WHEEL -->');
// End view-rewards before TESTIMONIALS
content = content.replace(/<!-- 15\. TESTIMONIALS -->/, '</div>\n\n  <div class="page-view" id="view-contact">\n  <!-- 15. TESTIMONIALS -->');

// Let's move TESTIMONIALS to view-home? Or keep it in contact? Let's keep it in view-home.
// Or just let it be in view-contact before contact section? Contact has Testimonials then Contact. That's fine.

// End view-contact before FOOTER
content = content.replace(/<!-- 18\. FOOTER -->/, '</div>\n\n  <!-- 18. FOOTER -->');


fs.writeFileSync('index.html', content);
