/* ==========================================================================
   ARENGUADE TILA - MENU DATA & EVENTS DATA
   ========================================================================== */

/**
 * Menu image mappings from public/Menu images/
 */
var MENU_IMG = {
  dulet: "/Menu images/Dulet.png",
  chechebsa: "/Menu images/chechbsa.jpg",
  ful: "/Menu images/ful.jpg",
  fetira: "/Menu images/fetira.jpg",
  clubSandwich: "/Menu images/club-sandwich.jpg",
  vegSandwich: "/Menu images/vegetable-sandwich.jpg",
  fastingCombo: "/Menu images/fasting-comb.jpg",
  specialSalad: "/Menu images/special-salad.jpg",
  vegWrap: "/Menu images/vegetable-wrap.jpg",
  avocadoWrap: "/Menu images/avocado-wrap.jpg",
  beefWrap: "/Menu images/beef-wrap.jpg",
  tunaWrap: "/Menu images/tuna-wrap.jpg",
  specialBurger: "/Menu images/special-burger.jpg",
  margheritaPizza: "/Menu images/margharita-pizza.jpg",
  vegPizza: "/Menu images/vegetable-pizza.jpg"
};

/**
 * Menu data grouped by category, including Amharic/English names,
 * description, ingredient lists, prices, heat levels, pairings, and real images.
 */
var menuData = {
  "Breakfast / ቁርስ": [
    { n: "Dulet (ዱለት)", en: "Dulet", d: "Traditional spiced minced beef and organ meat sauté", p: 550, img: MENU_IMG.dulet, heat: 2, pair: "☕ Best with: Spiced Tea" },
    { n: "Special Dulet (እስፔሻል ዱለት)", en: "Special Dulet", d: "ዱለት ፣ አይብ ፣ ቆጮ", ings: ["ዱለት", "አይብ", "ቆጮ"], p: 680, img: MENU_IMG.dulet, heat: 2, pair: "☕ Best with: Ethiopian Coffee" },
    { n: "Chechebsa (ጨጨብሳ)", en: "Chechebsa", d: "በእትክት ቅቤ የታሸ ቂጣ ፣ ማር", ings: ["በእትክት ቅቤ የታሸ ቂጣ", "ማር"], p: 250, img: MENU_IMG.chechebsa, pair: "☕ Best with: Spiced Tea" },
    { n: "Special Chechebsa (እስፔሻል ጨጨብሳ)", en: "Special Chechebsa", d: "በቂቤ የታሸ ቂጣ ፣ እንቁላል ፣ እርጎ", ings: ["በቂቤ የታሸ ቂጣ", "እንቁላል", "እርጎ"], p: 350, img: MENU_IMG.chechebsa, pair: "☕ Best with: Buna / Spiced Tea" },
    { n: "Ful (ፉል)", en: "Ful Medames", d: "ባቄላ ክክ / ድፍን ባቄላ ፣ ቲማቲም ሰላጣ ፣ ቃሪያ ፣ ሽንኩርት", ings: ["ባቄላ ክክ / ድፍን ባቄላ", "ቲማቲም ሰላጣ", "ቃሪያ", "ሽንኩርት"], p: 250, img: MENU_IMG.ful },
    { n: "Special Ful (ፉል እስፔሻል)", en: "Special Ful", d: "ባቄላ ክክ / ድፍን ባቄላ ፣ ቲማቲም ሰላጣ ፣ እርጎ ፣ እንቁላል ፣ ቱና/ስጋ ፣ ቃሪያ ፣ ሽንኩርት", ings: ["ባቄላ ክክ / ድፍን ባቄላ", "ቲማቲም ሰላጣ", "እርጎ", "እንቁላል", "ቱና / ስጋ", "ቃሪያ", "ሽንኩርት"], p: 350, img: MENU_IMG.ful },
    { n: "Fetira (ፈጢራ)", en: "Fetira", d: "Flaky layered pastry", ings: ["Flaky Layered Pastry", "Honey"], p: 250, img: MENU_IMG.fetira },
    { n: "Special Fetira (ፈጢራ እስፔሻል)", en: "Special Fetira", d: "እንቁላል ፣ እርጎ ፣ ቂጣ", ings: ["እንቁላል", "እርጎ", "ቂጣ"], p: 320, img: MENU_IMG.fetira },
    { n: "Firfir (ፍርፍር)", en: "Firfir", d: "Spiced shredded injera in savory sauce", ings: ["Shredded Injera", "Berbere Sauce", "Spices"], p: 350, img: MENU_IMG.dulet, heat: 2 }
  ],
  "Sandwiches / ሳንድዊች": [
    { n: "Egg Sandwich", en: "Egg Sandwich", d: "Egg, lettuce, tomato, onion, french fries", ings: ["Egg", "Lettuce", "Tomato", "Onion", "French Fries"], p: 350, img: MENU_IMG.clubSandwich },
    { n: "Vegetable Sandwich", en: "Vegetable Sandwich", d: "Grilled veg, lettuce, french fries", ings: ["Grilled Veggies", "Lettuce", "French Fries"], p: 350, img: MENU_IMG.vegSandwich },
    { n: "Tuna Sandwich", en: "Tuna Sandwich", d: "Tuna, onion, tomato, cheese, lettuce, french fries", ings: ["Tuna", "Onion", "Tomato", "Cheese", "Lettuce", "French Fries"], p: 480, img: MENU_IMG.clubSandwich },
    { n: "Club Sandwich", en: "Club Sandwich", d: "Minced beef, boiled egg, chopped tomato, chilli, lettuce, mayonnaise sauce, french fries", ings: ["Minced Beef", "Boiled Egg", "Chopped Tomato", "Chilli", "Lettuce", "Mayonnaise", "French Fries"], p: 620, img: MENU_IMG.clubSandwich, pair: "🍹 Best with: Fresh Juice" },
    { n: "Steak Sandwich", en: "Steak Sandwich", d: "Grilled beef, onion, tomato, mozzarella, cheese, french fries", ings: ["Grilled Beef", "Onion", "Tomato", "Mozzarella", "Cheese", "French Fries"], p: 750, img: MENU_IMG.clubSandwich, pair: "🍻 Best with: Cold Beer" },
    { n: "Chicken Sandwich", en: "Chicken Sandwich", d: "Tender chicken, grilled tomato, onion, green chilli, lettuce, french fries", ings: ["Tender Chicken", "Grilled Tomato", "Onion", "Green Chilli", "Lettuce", "French Fries"], p: 780, img: MENU_IMG.clubSandwich, heat: 1 }
  ],
  "Fasting Lunch / የጾም ምሳ": [
    { n: "Fasting Agelgil (የጾም አገልግል)", en: "Fasting Agelgil Platter", d: "ምስር ፣ ክክ ፣ ድፍን ምስር ፣ ሰላጣ ፣ ሩዝ በአትክልት ፣ ጎመን ፣ ሽሮ", ings: ["ምስር", "ክክ", "ድፍን ምስር", "ሰላጣ", "ሩዝ በአትክልት", "ጎመን", "ሽሮ"], p: 620, heat: 2, pair: "🍻 Best with: Cold St. George Beer", img: MENU_IMG.fastingCombo },
    { n: "Fasting Combo (የጾም ኮምቦ)", en: "Fasting Combo Platter", d: "Assorted fasting platter", ings: ["Traditional Platter", "Mixed Veggies", "Shiro", "Injera"], p: 670, heat: 1, pair: "☕ Best with: Spiced Tea", img: MENU_IMG.fastingCombo },
    { n: "Gomen Kitfo (ጎመን ክትፎ)", en: "Gomen Kitfo", d: "Finely chopped seasoned collard greens", ings: ["Collard Greens", "Ethiopian Spices", "Ayib (Optional)"], p: 550, heat: 1, pair: "🍷 Best with: Tej", img: MENU_IMG.fastingCombo }
  ],
  "Non-Fasting Lunch / የፍስክ ምሳ": [
    { n: "Fesik Agelgil (የፍስክ አገልግል)", en: "Fesik Agelgil Platter", d: "ምንቸት በቀይ/በአልጫ ፣ አይብ ፣ ጎመንክትፎ ፣ መረቅ ፍርፍር", ings: ["ምንቸት በቀይ / በአልጫ", "አይብ", "ጎመን ክትፎ", "መረቅ ፍርፍር"], p: 780, heat: 2, pair: "🍷 Best with: Tej", img: MENU_IMG.dulet },
    { n: "Chikna Tibs (ጭቅና ጥብስ)", en: "Chikna Tibs", d: "Tender sautéed prime beef fillet", ings: ["Prime Beef Fillet", "Rosemary", "Onion", "Jalapeño", "Awaze"], p: 780, heat: 2, pair: "🍷 Best with: Tej or Red Wine", img: MENU_IMG.dulet },
    { n: "Banatu (ባናቱ)", en: "Banatu", d: "ስጋ ፍርፍር ፣ እንቁላል ፣ ዱለት", ings: ["ስጋ ፍርፍር", "እንቁላል", "ዱለት"], p: 620, heat: 2, pair: "🍻 Best with: Cold Beer", img: MENU_IMG.dulet },
    { n: "Fesik Combo (የፍስክ ኮምቦ)", en: "Fesik Combo", d: "ምንቸት አብስ ፣ ጥብስ ፣ ስጋፍርፍር ሩዝ በስጋ", ings: ["ምንቸት አብስ", "ጥብስ", "ስጋ ፍርፍር", "ሩዝ በስጋ"], p: 750, heat: 2, pair: "🍷 Best with: House Tej", img: MENU_IMG.dulet }
  ],
  "Salads / ሰላጣ": [
    { n: "Arenguade Tila Special Salad", en: "Special House Salad", d: "Tomato, cucumber, freeze salad, china salad, onion, green chilli, papaya, avocado, mango, parsley dressing", ings: ["Tomato", "Cucumber", "Freeze Salad", "China Salad", "Onion", "Green Chilli", "Papaya", "Avocado", "Mango", "Parsley Dressing"], p: 520, img: MENU_IMG.specialSalad, pair: "🍹 Best with: Fresh Smoothie" },
    { n: "Italian Salad", en: "Italian Salad", d: "Tomato, cucumber, freeze salad, china salad, onion, green chilli, parsley dressing, mozzarella cheese, olives", ings: ["Tomato", "Cucumber", "Freeze Salad", "China Salad", "Onion", "Green Chilli", "Parsley Dressing", "Mozzarella Cheese", "Olives"], p: 580, img: MENU_IMG.specialSalad },
    { n: "Tuna Salad", en: "Tuna Salad", d: "Tuna, tomato, cucumber, freeze salad, china salad, green onion, chilli, parsley dressing", ings: ["Tuna", "Tomato", "Cucumber", "Freeze Salad", "China Salad", "Green Onion", "Chilli", "Parsley Dressing"], p: 680, img: MENU_IMG.specialSalad },
    { n: "Chicken Caesar Salad", en: "Chicken Caesar Salad", d: "Grilled chicken, china salad, freeze salad, carrot, green onion, mayonnaise dressing", ings: ["Grilled Chicken", "China Salad", "Freeze Salad", "Carrot", "Green Onion", "Mayonnaise Dressing"], p: 880, img: MENU_IMG.specialSalad }
  ],
  "Wraps / ራፕ": [
    { n: "Vegetable Wrap", en: "Vegetable Wrap", d: "Cooked vegetable, mushroom, avocado, fries", ings: ["Cooked Vegetables", "Mushroom", "Avocado", "French Fries"], p: 420, img: MENU_IMG.vegWrap },
    { n: "Avocado Wrap", en: "Avocado Wrap", d: "Avocado, black pepper, french fries", ings: ["Fresh Avocado", "Black Pepper", "French Fries", "Tortilla"], p: 480, img: MENU_IMG.avocadoWrap },
    { n: "Beef Wrap", en: "Beef Wrap", d: "Grilled beef, onion, tomato, mozzarella cheese, french fries", ings: ["Grilled Beef", "Onion", "Tomato", "Mozzarella Cheese", "French Fries"], p: 880, img: MENU_IMG.beefWrap, pair: "🍹 Best with: Lemonade" },
    { n: "Tuna Wrap", en: "Tuna Wrap", d: "Tuna wrap, grilled tomato, onion, lettuce, french fries, avocado, green chilli", ings: ["Tuna", "Grilled Tomato", "Onion", "Lettuce", "French Fries", "Avocado", "Green Chilli"], p: 570, img: MENU_IMG.tunaWrap, heat: 1 },
    { n: "Chicken Wrap", en: "Chicken Wrap", d: "Tender chicken, grilled tomato, onion, lettuce, french fries, green chilli", ings: ["Tender Chicken", "Grilled Tomato", "Onion", "Lettuce", "French Fries", "Green Chilli"], p: 880, img: MENU_IMG.beefWrap, heat: 1 }
  ],
  "Burgers & Sides / በርገር": [
    { n: "Beef Burger", en: "Classic Beef Burger", d: "BBQ sauce, tomato, onion, mayonnaise, lettuce, french fries", ings: ["Beef Patty", "BBQ Sauce", "Tomato", "Onion", "Mayonnaise", "Lettuce", "French Fries"], p: 550, img: MENU_IMG.specialBurger },
    { n: "Double Cheese Burger", en: "Double Cheese Burger", d: "Provolone cheese, tomato, onion, mayonnaise, lettuce, french fries", ings: ["Double Beef Patty", "Provolone Cheese", "Tomato", "Onion", "Mayonnaise", "Lettuce", "French Fries"], p: 620, img: MENU_IMG.specialBurger },
    { n: "Special Burger", en: "Special House Burger", d: "Provolone cheese, beef mortadella, tomato, onion, mayonnaise, lettuce, french fries", ings: ["Beef Patty", "Provolone Cheese", "Beef Mortadella", "Tomato", "Onion", "Mayonnaise", "Lettuce", "French Fries"], p: 900, img: MENU_IMG.specialBurger, pair: "🥤 Best with: Soft Drink" },
    { n: "French Fries (የድንች ጥብስ)", en: "Crispy French Fries", d: "Batter fried potatoes, ketchup", ings: ["Fresh Cut Potatoes", "Special Seasoning", "Ketchup"], p: 250, img: MENU_IMG.specialBurger }
  ],
  "Pizza / ፒዛ": [
    { n: "Vegetable Pizza", en: "Vegetable Pizza", d: "Mushroom, cooked veg, oregano", ings: ["Mushroom", "Cooked Veggies", "Oregano", "Tomato Sauce"], p: 450, img: MENU_IMG.vegPizza },
    { n: "Tuna Fasting Pizza", en: "Tuna Fasting Pizza", d: "Tuna, garlic, oregano", ings: ["Tuna", "Garlic", "Oregano", "Fasting Crust"], p: 650, img: MENU_IMG.vegPizza },
    { n: "Margherita Pizza", en: "Margherita Pizza", d: "Mozzarella cheese, oregano, hot tomato sauce", ings: ["Mozzarella Cheese", "Oregano", "Hot Tomato Sauce", "Fresh Basil"], p: 700, img: MENU_IMG.margheritaPizza },
    { n: "Chalazion Pizza", en: "Chalazion Pizza", d: "Minced beef, mozzarella, mushroom, oregano", ings: ["Minced Beef", "Mozzarella", "Mushroom", "Oregano"], p: 780, img: MENU_IMG.margheritaPizza },
    { n: "Tuna With Cheese Pizza", en: "Tuna With Cheese Pizza", d: "Tuna, mozzarella cheese, oregano", ings: ["Tuna", "Mozzarella Cheese", "Oregano", "Tomato Sauce"], p: 800, img: MENU_IMG.margheritaPizza },
    { n: "Meat Lover Pizza", en: "Meat Lover Pizza", d: "Mozzarella cheese, minced beef, black olive, oregano", ings: ["Mozzarella Cheese", "Minced Beef", "Black Olive", "Oregano"], p: 800, img: MENU_IMG.margheritaPizza, pair: "🍷 Best with: Red Wine" },
    { n: "The Super Pizza", en: "The Super Pizza", d: "Mozzarella cheese, chicken, minced beef, mushroom, black olives, tuna", ings: ["Mozzarella Cheese", "Chicken", "Minced Beef", "Mushroom", "Black Olives", "Tuna"], p: 950, img: MENU_IMG.margheritaPizza, pair: "🍻 Best with: Cold Beer" },
    { n: "Chicken Super Pizza", en: "Chicken Super Pizza", d: "Tender chicken, mozzarella cheese, oregano, tomato sauce", ings: ["Tender Chicken", "Mozzarella Cheese", "Oregano", "Tomato Sauce"], p: 1300, img: MENU_IMG.margheritaPizza }
  ]
};

/**
 * Weekly events listing data
 */
var eventsList = [
  { i: '🎲', t: 'Game Night', s: 'Every Thursday', d: 'Chess, Uno, Jenga & board games — winners earn restaurant rewards.' },
  { i: '❤️', t: 'Couples Night', s: 'Every Friday', d: 'Candlelight dinner with a special menu and romantic ambiance. Reservation recommended.' },
  { i: '🍹', t: 'Beverage & Happy Hour Specials', s: 'Daily · 3:00 PM – 7:00 PM', d: 'Enjoy 20% off all handcrafted specialty coffees, fresh fruit smoothies, signature cocktails, and herbal teas. Relax and unwind.' },
  { i: '🎤', t: 'Open Mic', s: '1st & 3rd Saturday', d: 'Music, poetry, comedy & storytelling — celebrating local voices.' },
  { i: '🎵', t: 'Live Music', s: 'Every Sunday', d: 'Unwind to live performances from the best local musicians in the city.' },
  { i: '🎧', t: 'DJ Night', s: 'Every Friday & Saturday', d: 'Resident DJs spinning Afrobeats, R&B & global hits. The floors come alive after dark.' },
  { i: '🥂', t: 'Weekend Supper', s: 'Sat & Sun, 6PM–10PM', d: 'Handcrafted cocktails, signature mocktails & a rich dinner spread. A meal that becomes a memory.' },
  { i: '🎨', t: 'Live Sketch & Painting', s: '2nd & 4th Saturday', d: 'Local artists create live art while you dine. Original pieces available for purchase. A creative evening you\'ll cherish.' },
  { i: '🖼️', t: 'Art Exhibition', s: '1st Sunday of Month', d: 'Curated showcase of Ethiopian and contemporary art. Meet the artists, enjoy wine, celebrate creativity. Admission free with reservation.' }
];
