/* ==========================================================================
   ARENGUADE TILA - MENU DATA & EVENTS DATA
   ========================================================================== */

/**
 * Sample thumbnail URLs (Unsplash) so menu cards preview with images.
 * Replace any `img` value with your own file path later, e.g.:
 *   img: "/images/menu/kitfo.jpg"
 */
var SAMPLE_IMG = {
  platter: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&h=200&q=80",
  stew: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&h=200&q=80",
  meat: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=200&h=200&q=80",
  breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&h=200&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&h=200&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&h=200&q=80",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=200&h=200&q=80",
  wrap: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=200&h=200&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=200&h=200&q=80",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&h=200&q=80",
  kitfo: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&h=200&q=80",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=200&h=200&q=80"
};

/**
 * Menu data grouped by category, including Amharic/English names,
 * description, ingredient lists, prices, heat levels, and pairings.
 */
var menuData = {
  "የፆም ምሳ": [
    { n: "አይነት", en: "Assorted Fasting Dishes", d: "Traditional Platter, Mixed Veggies", ings: ["Traditional Platter", "Mixed Veggies"], p: 450, heat: 1, pair: "☕ Best with: Spiced Tea", img: SAMPLE_IMG.platter },
    { n: "የፆም አገልግል", en: "Fasting Agalta Platter", d: "Misir, Atkilt, Dinich Wot, Nifro, Betkel Fit, Gomen, Shigna", ings: ["Misir", "Atkilt", "Dinich Wot", "Nifro", "Betkel Fit", "Gomen", "Shigna"], p: 620, heat: 2, pair: "🍻 Best with: Cold St. George Beer", img: SAMPLE_IMG.platter },
    { n: "ሽሮ ፈሰስ", en: "Shiro Feses", d: "Slow-cooked Chickpea Sauce, Garlic, Fresh Injera", ings: ["Slow-cooked Chickpea Sauce", "Garlic", "Fresh Injera"], p: 350, heat: 2, pair: "🍷 Best with: Tej", img: SAMPLE_IMG.stew },
    { n: "ተጋቢኖ", en: "Tegabino Shiro", d: "Sizzling Clay Pot Shiro, Jalapeño, Spiced Butter (Fasting)", ings: ["Sizzling Clay Pot Shiro", "Jalapeño", "Spiced Butter (Fasting)"], p: 400, heat: 3, pair: "🍹 Best with: Fresh Juice", img: SAMPLE_IMG.stew }
  ],
  "የፍስክ ምሳ": [
    { n: "የፍስክ አገልግል", d: "Assorted meat dishes: Kitfo · Tibs · Firfir · Gomen · Shigna", p: 780, img: SAMPLE_IMG.meat },
    { n: "ባናቱ", d: "Siga Firfir · Enkulal · Doro", p: 620, img: SAMPLE_IMG.meat },
    { n: "ምንቸት በቀይ", d: "Minced meat in red spiced sauce", p: 350 },
    { n: "ምንቸት በአልጫ", d: "Minced meat in mild alicha sauce", p: 350 },
    { n: "ቅቅል", d: "Traditional kikil bone broth stew", p: 480, img: SAMPLE_IMG.stew },
    { n: "ጥብስ", d: "Beef tibs", p: 750, img: SAMPLE_IMG.meat },
    { n: "ሸክላ ጥብስ", d: "Special shekla tibs", p: 780, img: SAMPLE_IMG.meat },
    { n: "ስጋ ፍርፍር", d: "Beef firfir", p: 500 },
    { n: "ቋንጣ ፍርፍር", d: "Home-style dried meat firfir with ayib & kibbeh", p: 480 },
    { n: "የፍስክ ኮምቦ", d: "Meat combo platter: Kitfo · Tibs · Firfir & more", p: 750, img: SAMPLE_IMG.platter }
  ],
  "ቁርስ": [
    { n: "ጨጨብሳ", d: "Chechebsa with kibbeh, spices & honey", p: 250, img: SAMPLE_IMG.breakfast },
    { n: "ስፔሻል ጨጨብሳ", d: "Special chechebsa with ayib · egg", p: 350, img: SAMPLE_IMG.breakfast },
    { n: "ፉል", d: "Ful medames with egg · tomato · onion · chilli", p: 250, img: SAMPLE_IMG.breakfast },
    { n: "ፉል ስፔሻል", d: "Special ful with egg · tomato · ayib", p: 350 },
    { n: "ፈጢራ", d: "Fetira (Ethiopian layered pastry)", p: 250 },
    { n: "ፈጢራ ስፔሻል", d: "Special fetira with egg · honey · kibbeh", p: 350 },
    { n: "ፍርፍር", d: "Firfir (bread pieces in spiced sauce)", p: 280 },
    { n: "ሀፍ ሀፍ", d: "Half & half combination", p: 500 },
    { n: "ዱለት", d: "Dulet (minced tripe & liver)", p: 550, img: SAMPLE_IMG.meat },
    { n: "ስፔሻል ዱለት", d: "Special dulet with egg · ayib · kibbeh", p: 680 },
    { n: "እንቁላል ፍርፍር", d: "Scrambled egg firfir", p: 320, img: SAMPLE_IMG.breakfast },
    { n: "እንቁላል በስልስ", d: "Egg with silsi sauce", p: 350 },
    { n: "እንቁላል በስጋ", d: "Egg with beef", p: 420 },
    { n: "ቁርስ ኮምቦ", d: "Breakfast combo: egg · chechebsa · firfir", p: 420 }
  ],
  "Pizza": [
    { n: "Vegetable Pizza", d: "Mushroom · cooked veg · oregano", p: 450, img: SAMPLE_IMG.pizza },
    { n: "Tuna Fasting Pizza", d: "Tuna · garlic · oregano", p: 650 },
    { n: "Margherita Pizza", d: "Mozzarella cheese · oregano · hot tomato sauce", p: 700, img: SAMPLE_IMG.pizza },
    { n: "Chalazion Pizza", d: "Minced beef · mozzarella · mushroom · oregano", p: 780 },
    { n: "Tuna with Cheese Pizza", d: "Tuna · shredded mozzarella cheese", p: 800 },
    { n: "Meat Lover Pizza", d: "Mozzarella · minced beef · black olive · oregano", p: 800, img: SAMPLE_IMG.pizza },
    { n: "The Super Pizza", d: "Mozzarella · chicken · minced beef · mushroom · black olives · tuna", p: 950, img: SAMPLE_IMG.pizza }
  ],
  "Burger": [
    { n: "Beef Burger", d: "BBQ sauce · tomato · onion · mayonnaise · lettuce · french fries", p: 550, img: SAMPLE_IMG.burger },
    { n: "Cheese Burger", d: "Provolone cheese · tomato · onion · mayonnaise · lettuce · french fries", p: 620, img: SAMPLE_IMG.burger },
    { n: "Special Burger", d: "Provolone cheese · beef · mortadella · tomato · onion · mayonnaise · lettuce · french fries", p: 730, img: SAMPLE_IMG.burger },
    { n: "French Fries", d: "Batter fried potatoes · ketchup", p: 250, img: SAMPLE_IMG.fries }
  ],
  "Sandwich": [
    { n: "Egg Sandwich", d: "Egg · lettuce · tomato · onion · french fries", p: 300, img: SAMPLE_IMG.sandwich },
    { n: "Vegetable Sandwich", d: "Grilled veg · lettuce", p: 350 },
    { n: "Tuna Sandwich", d: "Tuna · onion · tomato · cheese · lettuce · french fries", p: 480, img: SAMPLE_IMG.sandwich },
    { n: "Club Sandwich", d: "Minced beef · boiled egg · chopped tomato · chilli · lettuce · mayonnaise · french fries", p: 620, img: SAMPLE_IMG.sandwich },
    { n: "Steak Sandwich", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750 },
    { n: "Chicken Sandwich", d: "Tender chicken · grilled tomato · onion · green chilli · lettuce · french fries", p: 780 }
  ],
  "Wrap": [
    { n: "Vegetable Wrap", d: "Cooked vegetable · mushroom · avocado · fries", p: 420, img: SAMPLE_IMG.wrap },
    { n: "Avocado Wrap", d: "Avocado · black pepper · french fries", p: 480, img: SAMPLE_IMG.wrap },
    { n: "Tuna Wrap", d: "Tuna · grilled tomato · onion · lettuce · fries · avocado · green chilli", p: 570 },
    { n: "Beef Wrap", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750, img: SAMPLE_IMG.wrap },
    { n: "Chicken Wrap", d: "Tender chicken · grilled tomato · onion · lettuce · fries · green chilli", p: 850 }
  ],
  "Spaghetti": [
    { n: "Spaghetti with Tomato Sauce", d: "Classic spaghetti in tomato sauce", p: 420, img: SAMPLE_IMG.pasta },
    { n: "Spaghetti with Veg", d: "Spaghetti with mixed vegetables", p: 450 },
    { n: "Carbonara", d: "Creamy carbonara spaghetti", p: 580, img: SAMPLE_IMG.pasta },
    { n: "Lasagna", d: "Baked layered lasagna", p: 720, img: SAMPLE_IMG.pasta }
  ],
  "Salad": [
    { n: "Arenguade Tila Special Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · papaya · avocado · mango · parsley dressing", p: 470, img: SAMPLE_IMG.salad },
    { n: "Italian Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · parsley dressing · mozzarella · olives", p: 580, img: SAMPLE_IMG.salad },
    { n: "Tuna Salad", d: "Tuna · tomato · kiyar · freeze salad · chaina salad · onion · green chilli · parsley dressing", p: 680 },
    { n: "Chicken Caesar Salad", d: "Grilled chicken · chaina salad · freeze salad · carrot · onion · mayonnaise dressing", p: 850, img: SAMPLE_IMG.salad }
  ],
  "ክትፎ": [
    { n: "ጥሬ ክትፎ", d: "Lean raw kitfo — mildly seasoned minced beef", p: 500, img: SAMPLE_IMG.kitfo },
    { n: "ክትፎ ኖርማል", d: "Standard kitfo portion with all accompaniments", p: 1200, img: SAMPLE_IMG.kitfo },
    { n: "ክትፎ ስፔሻል", d: "Premium special kitfo — full portion, all accompaniments", p: 1700, img: SAMPLE_IMG.kitfo }
  ]
};

/**
 * Weekly events listing data
 */
var eventsList = [
  { i: '🎲', t: 'Game Night', s: 'Every Thursday', d: 'Chess, Uno, Jenga & board games — winners earn restaurant rewards.' },
  { i: '❤️', t: 'Couples Night', s: 'Every Friday', d: 'Candlelight dinner with a special menu and romantic ambiance. Reservation recommended.' },
  { i: '🎤', t: 'Open Mic', s: '1st & 3rd Saturday', d: 'Music, poetry, comedy & storytelling — celebrating local voices.' },
  { i: '🎵', t: 'Live Music', s: 'Every Sunday', d: 'Unwind to live performances from the best local musicians in the city.' },
  { i: '🎧', t: 'DJ Night', s: 'Every Friday & Saturday', d: 'Resident DJs spinning Afrobeats, R&B & global hits. The floors come alive after dark.' },
  { i: '🥂', t: 'Weekend Supper', s: 'Sat & Sun, 6PM–10PM', d: 'Handcrafted cocktails, signature mocktails & a rich dinner spread. A meal that becomes a memory.' },
  { i: '🎨', t: 'Live Sketch & Painting', s: '2nd & 4th Saturday', d: 'Local artists create live art while you dine. Original pieces available for purchase. A creative evening you\'ll cherish.' },
  { i: '🖼️', t: 'Art Exhibition', s: '1st Sunday of Month', d: 'Curated showcase of Ethiopian and contemporary art. Meet the artists, enjoy wine, celebrate creativity. Admission free with reservation.' }
];
