const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove FAB
content = content.replace(/<div class="fab" onclick="toggleCart\(\)">.*?<\/div>/, '');

// Remove cart drawer
content = content.replace(/<div class="cart-drawer" id="cartDrawer">[\s\S]*?<\/div>\s*<\/div>/, '');

// Remove cart variables
content = content.replace(/let cart = \[\];[\s\S]*?const cs = document\.getElementById\('cartSubtotal'\);/, '');

// Remove toggleCart, renderCart, addToCart, modCart, checkout
const cartFuncsRegex = /function toggleCart\(\) \{[\s\S]*?function checkout\(\) \{[\s\S]*?cart = \[\]; renderCart\(\);\n    \}/;
content = content.replace(cartFuncsRegex, '');

fs.writeFileSync('index.html', content);
