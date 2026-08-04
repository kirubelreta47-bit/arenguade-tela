const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove page-view display none
content = content.replace(/\.page-view \{ display: none; min-height: 80vh; \}/, '.page-view { min-height: 80vh; }');
content = content.replace(/#view-home \{ display: block; \}/, '');

// Update navigateTo
const oldNav = `    function navigateTo(viewId) {
      document.querySelectorAll(".page-view").forEach(el => el.style.display = "none");
      document.getElementById(viewId).style.display = "block";
      window.scrollTo(0, 0);
      closeMenu();
    }`;

const newNav = `    function navigateTo(viewId) {
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
    }`;

content = content.replace(oldNav, newNav);

fs.writeFileSync('index.html', content);
