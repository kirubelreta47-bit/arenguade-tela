/* ==========================================================================
   ARENGUADE TILA - MENU DATA & EVENTS DATA
   ========================================================================== */

/**
 * Menu data grouped by category, including Amharic/English names,
 * description, ingredient lists, prices, heat levels, and pairings.
 */
var menuData = {
  "የፆም ምሳ": [
    { n: "አይነት", en: "Assorted Fasting Dishes", d: "Traditional Platter, Mixed Veggies", ings: ["Traditional Platter", "Mixed Veggies"], p: 450, heat: 1, pair: "☕ Best with: Spiced Tea" },
    { n: "የፆም አገልግል", en: "Fasting Agalta Platter", d: "Misir, Atkilt, Dinich Wot, Nifro, Betkel Fit, Gomen, Shigna", ings: ["Misir", "Atkilt", "Dinich Wot", "Nifro", "Betkel Fit", "Gomen", "Shigna"], p: 620, heat: 2, pair: "🍻 Best with: Cold St. George Beer" },
    { n: "ሽሮ ፈሰስ", en: "Shiro Feses", d: "Slow-cooked Chickpea Sauce, Garlic, Fresh Injera", ings: ["Slow-cooked Chickpea Sauce", "Garlic", "Fresh Injera"], p: 350, heat: 2, pair: "🍷 Best with: Tej" },
    { n: "ተጋቢኖ", en: "Tegabino Shiro", d: "Sizzling Clay Pot Shiro, Jalapeño, Spiced Butter (Fasting)", ings: ["Sizzling Clay Pot Shiro", "Jalapeño", "Spiced Butter (Fasting)"], p: 400, heat: 3, pair: "🍹 Best with: Fresh Juice" }
  ],
  "የፍስክ ምሳ": [
    { n: "የፍስክ አገልግል", d: "Assorted meat dishes: Kitfo · Tibs · Firfir · Gomen · Shigna", p: 780 },
    { n: "ባናቱ", d: "Siga Firfir · Enkulal · Doro", p: 620 },
    { n: "ምንቸት በቀይ", d: "Minced meat in red spiced sauce", p: 350 },
    { n: "ምንቸት በአልጫ", d: "Minced meat in mild alicha sauce", p: 350 },
    { n: "ቅቅል", d: "Traditional kikil bone broth stew", p: 480 },
    { n: "ጥብስ", d: "Beef tibs", p: 750 },
    { n: "ሸክላ ጥብስ", d: "Special shekla tibs", p: 780 },
    { n: "ስጋ ፍርፍር", d: "Beef firfir", p: 500 },
    { n: "ቋንጣ ፍርፍር", d: "Home-style dried meat firfir with ayib & kibbeh", p: 480 },
    { n: "የፍስክ ኮምቦ", d: "Meat combo platter: Kitfo · Tibs · Firfir & more", p: 750 }
  ],
  "ቁርስ": [
    { n: "ጨጨብሳ", d: "Chechebsa with kibbeh, spices & honey", p: 250 },
    { n: "ስፔሻል ጨጨብሳ", d: "Special chechebsa with ayib · egg", p: 350 },
    { n: "ፉል", d: "Ful medames with egg · tomato · onion · chilli", p: 250 },
    { n: "ፉል ስፔሻል", d: "Special ful with egg · tomato · ayib", p: 350 },
    { n: "ፈጢራ", d: "Fetira (Ethiopian layered pastry)", p: 250 },
    { n: "ፈጢራ ስፔሻል", d: "Special fetira with egg · honey · kibbeh", p: 350 },
    { n: "ፍርፍር", d: "Firfir (bread pieces in spiced sauce)", p: 280 },
    { n: "ሀፍ ሀፍ", d: "Half & half combination", p: 500 },
    { n: "ዱለት", d: "Dulet (minced tripe & liver)", p: 550 },
    { n: "ስፔሻል ዱለት", d: "Special dulet with egg · ayib · kibbeh", p: 680 },
    { n: "እንቁላል ፍርፍር", d: "Scrambled egg firfir", p: 320 },
    { n: "እንቁላል በስልስ", d: "Egg with silsi sauce", p: 350 },
    { n: "እንቁላል በስጋ", d: "Egg with beef", p: 420 },
    { n: "ቁርስ ኮምቦ", d: "Breakfast combo: egg · chechebsa · firfir", p: 420 }
  ],
  "Pizza": [
    { n: "Vegetable Pizza", d: "Mushroom · cooked veg · oregano", p: 450 },
    { n: "Tuna Fasting Pizza", d: "Tuna · garlic · oregano", p: 650 },
    { n: "Margherita Pizza", d: "Mozzarella cheese · oregano · hot tomato sauce", p: 700 },
    { n: "Chalazion Pizza", d: "Minced beef · mozzarella · mushroom · oregano", p: 780 },
    { n: "Tuna with Cheese Pizza", d: "Tuna · shredded mozzarella cheese", p: 800 },
    { n: "Meat Lover Pizza", d: "Mozzarella · minced beef · black olive · oregano", p: 800 },
    { n: "The Super Pizza", d: "Mozzarella · chicken · minced beef · mushroom · black olives · tuna", p: 950 }
  ],
  "Burger": [
    { n: "Beef Burger", d: "BBQ sauce · tomato · onion · mayonnaise · lettuce · french fries", p: 550 },
    { n: "Cheese Burger", d: "Provolone cheese · tomato · onion · mayonnaise · lettuce · french fries", p: 620 },
    { n: "Special Burger", d: "Provolone cheese · beef · mortadella · tomato · onion · mayonnaise · lettuce · french fries", p: 730 },
    { n: "French Fries", d: "Batter fried potatoes · ketchup", p: 250 }
  ],
  "Sandwich": [
    { n: "Egg Sandwich", d: "Egg · lettuce · tomato · onion · french fries", p: 300 },
    { n: "Vegetable Sandwich", d: "Grilled veg · lettuce", p: 350 },
    { n: "Tuna Sandwich", d: "Tuna · onion · tomato · cheese · lettuce · french fries", p: 480 },
    { n: "Club Sandwich", d: "Minced beef · boiled egg · chopped tomato · chilli · lettuce · mayonnaise · french fries", p: 620 },
    { n: "Steak Sandwich", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750 },
    { n: "Chicken Sandwich", d: "Tender chicken · grilled tomato · onion · green chilli · lettuce · french fries", p: 780 }
  ],
  "Wrap": [
    { n: "Vegetable Wrap", d: "Cooked vegetable · mushroom · avocado · fries", p: 420 },
    { n: "Avocado Wrap", d: "Avocado · black pepper · french fries", p: 480 },
    { n: "Tuna Wrap", d: "Tuna · grilled tomato · onion · lettuce · fries · avocado · green chilli", p: 570 },
    { n: "Beef Wrap", d: "Grilled beef · onion · tomato · mozzarella cheese · french fries", p: 750 },
    { n: "Chicken Wrap", d: "Tender chicken · grilled tomato · onion · lettuce · fries · green chilli", p: 850 }
  ],
  "Spaghetti": [
    { n: "Spaghetti with Tomato Sauce", d: "Classic spaghetti in tomato sauce", p: 420 },
    { n: "Spaghetti with Veg", d: "Spaghetti with mixed vegetables", p: 450 },
    { n: "Carbonara", d: "Creamy carbonara spaghetti", p: 580 },
    { n: "Lasagna", d: "Baked layered lasagna", p: 720 }
  ],
  "Salad": [
    { n: "Arenguade Tila Special Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · papaya · avocado · mango · parsley dressing", p: 470 },
    { n: "Italian Salad", d: "Tomato · kiar · freeze salad · chaina salad · onion · green chilli · parsley dressing · mozzarella · olives", p: 580 },
    { n: "Tuna Salad", d: "Tuna · tomato · kiyar · freeze salad · chaina salad · onion · green chilli · parsley dressing", p: 680 },
    { n: "Chicken Caesar Salad", d: "Grilled chicken · chaina salad · freeze salad · carrot · onion · mayonnaise dressing", p: 850 }
  ],
  "ክትፎ": [
    { n: "ጥሬ ክትፎ", d: "Lean raw kitfo — mildly seasoned minced beef", p: 500 },
    { n: "ክትፎ ኖርማል", d: "Standard kitfo portion with all accompaniments", p: 1200 },
    { n: "ክትፎ ስፔሻል", d: "Premium special kitfo — full portion, all accompaniments", p: 1700 }
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
  { i: '🥂', t: 'Weekend Supper', s: 'Sat & Sun, 6PM–10PM', d: 'Handcrafted cocktails, signature mocktails & a rich dinner spread. A meal that becomes a memory.' }
];
