// Relish Pizza Bar — seed data
const u = (id, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const seedData = {
  menu: [
    // Signature Pizzas
    { id: 1, name: 'Margherita', nameUr: 'مارگریٹا', description: 'San Marzano tomato, fior di latte, basil, cold-pressed olive oil.', descriptionUr: 'تازہ ٹماٹر، موزاریلا چیز، تلسی اور زیتون کا تیل۔', price: 1250, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1574071318508-1cdbab80d002'), available: true },
    { id: 2, name: 'Truffle Mushroom', nameUr: 'ٹرفل مشروم', description: 'Wild mushrooms, black truffle cream, aged parmesan, thyme.', descriptionUr: 'مشروم، کالا ٹرفل کریم، پرانا پارمیزان اور تھائم۔', price: 1850, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1513104890138-7c749659a591'), available: true },
    { id: 3, name: 'Chicken Fajita', nameUr: 'چکن فاہیتا', description: 'Char-grilled chicken, capsicum, red onion, smoked mozzarella.', descriptionUr: 'گرل چکن، شملہ مرچ، لال پیاز اور اسموکڈ موزاریلا۔', price: 1550, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1595854341625-f33ee10dbf94'), available: true },
    { id: 4, name: 'Pepperoni Classico', nameUr: 'پیپرونی کلاسیکو', description: 'Beef pepperoni, chilli honey drizzle, fresh oregano.', descriptionUr: 'بیف پیپرونی، مرچ شہد اور تازہ اوریگانو۔', price: 1650, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1565299624946-b28f40a0ae38'), available: true },
    { id: 5, name: 'Quattro Formaggi', nameUr: 'کواٹرو فارماگی', description: 'Mozzarella, gorgonzola, taleggio, parmesan, walnut.', descriptionUr: 'چار قسم کی چیز اور اخروٹ۔', price: 1750, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1628840042765-356cda07504e'), available: true },
    { id: 6, name: 'BBQ Chicken', nameUr: 'بی بی کیو چکن', description: 'Smoky barbecue glaze, grilled chicken, red onion, coriander.', descriptionUr: 'بی بی کیو ساس، گرل چکن، لال پیاز اور ہرا دھنیا۔', price: 1600, category: 'Signature Pizzas', categoryUr: 'خصوصی پیزا', image: '🍕', imageUrl: u('photo-1571407970349-bc81e7e96d47'), available: true },

    // Grill & Mains
    { id: 7, name: 'Beef Tenderloin', nameUr: 'بیف ٹینڈرلوئن', description: '220g grass-fed tenderloin, peppercorn jus, truffle mash.', descriptionUr: 'بیف ٹینڈرلوئن، کالی مرچ جوس اور ٹرفل میش۔', price: 3850, category: 'Grill & Mains', categoryUr: 'گرل اور مینز', image: '🥩', imageUrl: u('photo-1546833999-b9f581a1996d'), available: true },
    { id: 8, name: 'Grilled Salmon', nameUr: 'گرل سالمن', description: 'Atlantic salmon, lemon beurre blanc, seasonal greens.', descriptionUr: 'سالمن، لیموں مکھن ساس اور موسمی سبزیاں۔', price: 2950, category: 'Grill & Mains', categoryUr: 'گرل اور مینز', image: '🐟', imageUrl: u('photo-1467003909585-2f8a72700288'), available: true },
    { id: 9, name: 'Lamb Chops', nameUr: 'لیمب چاپس', description: 'Herb-crusted rack of lamb, rosemary jus, roasted garlic.', descriptionUr: 'جڑی بوٹیوں والے لیمب چاپس، روزمیری جوس اور بھنا لہسن۔', price: 3450, category: 'Grill & Mains', categoryUr: 'گرل اور مینز', image: '🍖', imageUrl: u('photo-1544025162-d76694265947'), available: true },
    { id: 10, name: 'Grilled Chicken Steak', nameUr: 'گرل چکن سٹیک', description: 'Marinated chicken breast, mushroom sauce, hand-cut fries.', descriptionUr: 'میرینیٹ چکن بریسٹ، مشروم ساس اور فرائز۔', price: 1950, category: 'Grill & Mains', categoryUr: 'گرل اور مینز', image: '🍗', imageUrl: u('photo-1598103442097-8b74394b95c6'), available: true },

    // Pasta & Risotto
    { id: 11, name: 'Truffle Alfredo', nameUr: 'ٹرفل الفریڈو', description: 'Fettuccine, cream, black truffle, parmesan crisp.', descriptionUr: 'فیٹوچینی، کریم، کالا ٹرفل اور پارمیزان۔', price: 1750, category: 'Pasta & Risotto', categoryUr: 'پاستا اور ریزوتو', image: '🍝', imageUrl: u('photo-1621996346565-e3dbc646d9a9'), available: true },
    { id: 12, name: 'Penne Arrabbiata', nameUr: 'پینے ارابیاطہ', description: 'Spicy tomato, garlic, chilli flakes, basil.', descriptionUr: 'مصالحے دار ٹماٹر، لہسن، مرچ اور تلسی۔', price: 1450, category: 'Pasta & Risotto', categoryUr: 'پاستا اور ریزوتو', image: '🍝', imageUrl: u('photo-1551183053-bf91a1d81141'), available: true },
    { id: 13, name: 'Wild Mushroom Risotto', nameUr: 'وائلڈ مشروم ریزوتو', description: 'Arborio rice, wild mushrooms, parmesan, white wine.', descriptionUr: 'آربوریو چاول، مشروم، پارمیزان اور سفید وائن۔', price: 1850, category: 'Pasta & Risotto', categoryUr: 'پاستا اور ریزوتو', image: '🍚', imageUrl: u('photo-1476124369491-e7addf5db371'), available: true },

    // Burgers
    { id: 14, name: 'Relish Wagyu Burger', nameUr: 'ریلش ویگو برگر', description: 'Wagyu patty, aged cheddar, caramelised onion, brioche bun.', descriptionUr: 'ویگو پیٹی، پرانا چیدر، کیریملائزڈ پیاز اور بریوش بن۔', price: 2250, category: 'Burgers', categoryUr: 'برگر', image: '🍔', imageUrl: u('photo-1568901346375-23c9450c58cd'), available: true },
    { id: 15, name: 'Zinger Burger', nameUr: 'زنگر برگر', description: 'Crispy chicken fillet, lettuce, house mayo, soft bun.', descriptionUr: 'کرسپی چکن فلیٹ، سلاد، میو اور نرم بن۔', price: 850, category: 'Burgers', categoryUr: 'برگر', image: '🍔', imageUrl: u('photo-1606755962773-d324e0a13086'), available: true },
    { id: 16, name: 'Beef Burger', nameUr: 'بیف برگر', description: 'Grilled beef patty, cheese, pickles, house sauce.', descriptionUr: 'گرل بیف پیٹی، چیز، اچار اور خاص ساس۔', price: 950, category: 'Burgers', categoryUr: 'برگر', image: '🍔', imageUrl: u('photo-1550547660-d9450f859349'), available: true },

    // Sides
    { id: 17, name: 'Truffle Parmesan Fries', nameUr: 'ٹرفل پارمیزان فرائز', description: 'Hand-cut fries, truffle oil, parmesan, chives.', descriptionUr: 'فرائز، ٹرفل تیل، پارمیزان اور چائیوز۔', price: 650, category: 'Sides', categoryUr: 'سائیڈ', image: '🍟', imageUrl: u('photo-1573080496219-bb080dd4f877'), available: true },
    { id: 18, name: 'Garlic Bread', nameUr: 'گارلک بریڈ', description: 'Freshly baked focaccia, garlic butter, parsley.', descriptionUr: 'تازہ فوکاسیا، لہسن مکھن اور پودینہ۔', price: 450, category: 'Sides', categoryUr: 'سائیڈ', image: '🥖', imageUrl: u('photo-1573140247632-f8fd74997d5c'), available: true },
    { id: 19, name: 'Buffalo Wings (6)', nameUr: 'بفیلو ونگز (6)', description: 'Spicy fried wings, blue cheese dip.', descriptionUr: 'مصالحے دار فرائیڈ ونگز اور چیز ڈپ۔', price: 750, category: 'Sides', categoryUr: 'سائیڈ', image: '🍗', imageUrl: u('photo-1608039755401-742074f0548d'), available: true },

    // Desserts
    { id: 20, name: 'Chocolate Lava Cake', nameUr: 'چاکلیٹ لاوا کیک', description: 'Warm dark chocolate fondant, vanilla bean gelato.', descriptionUr: 'گرم ڈارک چاکلیٹ کیک اور ونیلا آئس کریم۔', price: 650, category: 'Desserts', categoryUr: 'میٹھا', image: '🍫', imageUrl: u('photo-1606313564200-e75d5e30476c'), available: true },
    { id: 21, name: 'New York Cheesecake', nameUr: 'نیو یارک چیز کیک', description: 'Baked vanilla cheesecake, berry coulis.', descriptionUr: 'بیکڈ ونیلا چیز کیک اور بیری ساس۔', price: 650, category: 'Desserts', categoryUr: 'میٹھا', image: '🍰', imageUrl: u('photo-1533134242443-d4fd215305ad'), available: true },
    { id: 22, name: 'Tiramisu', nameUr: 'ٹیرامیسو', description: 'Espresso-soaked savoiardi, mascarpone, cocoa.', descriptionUr: 'ایسپریسو میں بھیگے بسکٹ، مسکارپون اور کوکو۔', price: 700, category: 'Desserts', categoryUr: 'میٹھا', image: '🍮', imageUrl: u('photo-1571877227200-a0d98ea607e9'), available: true },

    // Drinks
    { id: 23, name: 'Mint Margarita', nameUr: 'منٹ مارگریٹا', description: 'Fresh mint, lemon, soda, crushed ice.', descriptionUr: 'تازہ پودینہ، لیموں، سوڈا اور برف۔', price: 380, category: 'Drinks', categoryUr: 'مشروبات', image: '🥤', imageUrl: u('photo-1551538827-9c037cb4f32a'), available: true },
    { id: 24, name: 'Fresh Lime Soda', nameUr: 'فریش لائم سوڈا', description: 'Lime, soda, a touch of sweetness.', descriptionUr: 'لیموں، سوڈا اور ہلکی مٹھاس۔', price: 320, category: 'Drinks', categoryUr: 'مشروبات', image: '🍋', imageUrl: u('photo-1513558161293-cdaf765ed2fd'), available: true },
    { id: 25, name: 'Espresso', nameUr: 'ایسپریسو', description: 'Double shot, single origin.', descriptionUr: 'ڈبل شاٹ، خاص کافی۔', price: 350, category: 'Drinks', categoryUr: 'مشروبات', image: '☕', imageUrl: u('photo-1510707577719-ae7c14805e3a'), available: true },
    { id: 26, name: 'Soft Drink 500ml', nameUr: 'سافٹ ڈرنک 500ml', description: 'Chilled bottle.', descriptionUr: 'ٹھنڈی بوتل۔', price: 120, category: 'Drinks', categoryUr: 'مشروبات', image: '🥫', imageUrl: u('photo-1581636625402-29b2a704ef13'), available: true }
  ],

  tables: [
    { id: 1, name: 'T1', seats: 2, status: 'free' },
    { id: 2, name: 'T2', seats: 2, status: 'free' },
    { id: 3, name: 'T3', seats: 4, status: 'free' },
    { id: 4, name: 'T4', seats: 4, status: 'occupied' },
    { id: 5, name: 'T5', seats: 4, status: 'free' },
    { id: 6, name: 'T6', seats: 6, status: 'free' },
    { id: 7, name: 'T7', seats: 6, status: 'free' },
    { id: 8, name: 'T8', seats: 8, status: 'occupied' },
    { id: 9, name: 'P1', seats: 10, status: 'free' },
    { id: 10, name: 'P2', seats: 12, status: 'free' }
  ],

  reviews: [
    { id: 1, name: 'Ayesha K.', rating: 5, text: 'The truffle mushroom pizza is extraordinary — easily the best in Bahawalpur. Service was impeccable from start to finish.', createdAt: '2026-09-20T14:10:00.000Z', approved: true },
    { id: 2, name: 'Bilal R.', rating: 5, text: 'A genuinely five-star experience. The tenderloin was cooked perfectly and the ambience is wonderful.', createdAt: '2026-09-28T19:45:00.000Z', approved: true },
    { id: 3, name: 'Fatima S.', rating: 5, text: 'We ordered for the whole family and everything arrived hot and beautifully packed. Relish is now our weekend ritual.', createdAt: '2026-10-02T20:15:00.000Z', approved: true }
  ],

  orders: [],
  reservations: [],
  messages: []
};
