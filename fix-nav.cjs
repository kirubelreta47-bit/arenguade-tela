const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldNav = `    function navigateTo(viewId) {
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

const newNav = `    function navigateTo(viewId) {
      const mainPage = document.getElementById('main-scroll-page');
      const fullMenuPage = document.getElementById('full-menu-page');
      
      if (viewId === 'view-full-menu') {
        mainPage.style.display = 'none';
        fullMenuPage.style.display = 'block';
        window.scrollTo(0, 0);
      } else {
        mainPage.style.display = 'block';
        fullMenuPage.style.display = 'none';
        
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
      }
      closeMenu();
    }`;

content = content.replace(oldNav, newNav);

fs.writeFileSync('index.html', content);
