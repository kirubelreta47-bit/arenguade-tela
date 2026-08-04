const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove FAB and drawerOverlay
content = content.replace(/<!-- FAB CART -->\s*<div class="drawer-overlay" id="drawerOverlay" onclick="toggleCart\(\)"><\/div>/, '');

// Remove CSS cart styles
content = content.replace(/\/\* 6\. ONLINE ORDERING CART \(DRAWERS & FAB\) \*\/[\s\S]*?\.cart-item \{[\s\S]*?\}/, '');
content = content.replace(/\.cart-drawer \{ padding: 24px 16px; \}/, '');

// Remove all cart logic manually using string split and match
const cartLogicStart = "// Cart Logic";
const cartLogicEnd = "    // Spin Wheel Canvas Logic";

if (content.includes(cartLogicStart) && content.includes(cartLogicEnd)) {
    const p1 = content.split(cartLogicStart)[0];
    const p2 = cartLogicEnd + content.split(cartLogicEnd)[1];
    content = p1 + p2;
}

fs.writeFileSync('index.html', content);
