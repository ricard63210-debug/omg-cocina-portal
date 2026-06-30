// =====================================================
// OMG COCINA — COMPLETE MENU DATA
// =====================================================

export interface MenuItem {
  name: string
  price: string
  description?: string
  note?: string        // allergy/prep notes
  meatChoice?: boolean // shows meat badge selector
  addons?: string[]
  image?: string       // absolute or relative URL to the dish image
}

export interface MenuCategory {
  id: string
  label: string
  emoji: string
  items: MenuItem[]
}

export interface MeatOption {
  id: string
  label: string
}

export const MEAT_OPTIONS: MeatOption[] = [
  { id: 'veggies', label: 'Veggies' },
  { id: 'carne-asada', label: 'Carne Asada' },
  { id: 'chicken', label: 'Grilled Chicken' },
  { id: 'al-pastor', label: 'Al Pastor' },
  { id: 'carnitas', label: 'Carnitas' },
]

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'appetizers',
    label: 'Appetizers',
    emoji: '🫙',
    items: [
      {
        name: 'Cheese Dip',
        price: '$9.50',
        description: 'Served with tortilla chips',
        addons: ['Add jalapeños +$0.75', 'Add chorizo +$1.50'],
      },
      {
        name: 'Guacamole',
        price: '$10.50',
        description: 'Avocado, cotija cheese, lime, onion, cilantro and tomato. Served with tortilla chips',
      },
      {
        name: 'Roasted Tomatillo Salsa',
        price: '$6.00',
        description: 'Tomatillos, onions, garlic, jalapeños, cilantro and diced avocado. Served with tortilla chips',
      },
      {
        name: 'Tatemada Salsa',
        price: '$6.00',
        description: 'Tomatoes, onions, garlic, jalapeños, and cilantro. Served with tortilla chips',
      },
    ],
  },
  {
    id: 'soup-salads',
    label: 'Soup & Salads',
    emoji: '🥗',
    items: [
      {
        name: 'Green Chicken Pozole',
        price: '$15.00',
      },
      {
        name: 'Chicken Salad',
        price: '$18.00',
        description: 'Grilled chicken breast, romaine, tomato, avocado, grilled corn, and cucumber',
        image: '/dishes/chicken_salad.jpg',
      },
      {
        name: 'Arrachera Salad',
        price: '$19.50',
        description: 'Steak, romaine, tomato, avocado, grilled corn, and cucumber',
        image: '/dishes/arrachera_salad.jpg',
      },
      {
        name: 'Shrimp Salad',
        price: '$19.50',
        description: 'Grilled shrimp, romaine, tomato, avocado, grilled corn, and cucumber',
        image: '/dishes/shrimp_salad.jpg',
      },
      {
        name: 'Salmon Salad',
        price: '$21.00',
        description: 'Achiote marinated salmon, romaine, tomato, avocado, grilled corn, and cucumber. Topped with tamarindo sauce, chipotle aioli sauce, mango mayo habanero, and pico de mango',
      },
    ],
  },
  {
    id: 'tacos',
    label: 'Tacos',
    emoji: '🌮',
    items: [
      {
        name: 'Street Taco',
        price: '$3.00',
        description: 'Choice of meat, cilantro, onion, tomatillo salsa',
        meatChoice: true,
      },
      {
        name: 'Shrimp Taco',
        price: '$5.00',
        description: 'Breaded shrimp, chipotle aioli, mango mayo habanero, pico de mango, cheese, cabbage slaw on corn tortilla',
        image: '/dishes/shrimp_taco.jpg',
      },
      {
        name: 'Fish Taco',
        price: '$5.00',
        description: 'Breaded fish, chipotle aioli, mango mayo habanero, pico de mango, cabbage slaw on corn tortilla',
        image: '/dishes/fish_taco.jpg',
      },
    ],
  },
  {
    id: 'shared-plates',
    label: 'Shared Plates',
    emoji: '🍽️',
    items: [
      {
        name: 'Tostaditas de Mole',
        price: '$18.00',
        description: 'Three crispy tostadas topped with Oaxaca chicken mole negro, beans, pickled red onions, sour cream, cotija cheese and avocado',
        note: '⚠️ Contains nuts/peanuts',
      },
      {
        name: 'Sopes',
        price: '$19.00',
        description: 'Three homemade fried corn masa sopes, topped with your choice of meat, refried beans, cabbage salad, sour cream, cotija cheese and avocado',
        meatChoice: true,
      },
      {
        name: 'Super Nachos',
        price: '$18.00',
        description: 'Housemade tortilla chips, refried beans, choice of meat, melted cheese, guacamole, pico de gallo, sour cream, and jalapeños',
        meatChoice: true,
        image: '/dishes/super_nachos.jpg',
      },
      {
        name: '*Ceviche',
        price: '$18.00',
        description: 'Citrus marinated fish, shrimp, onion, tomato, cilantro, serrano peppers, and avocado. Served with housemade tostadas',
        note: '🍋 Raw/citrus marinated',
      },
      {
        name: '*AguaChile',
        price: '$18.00',
        description: 'Citrus marinated raw shrimp, fresh lime juice, onion, cucumbers, cilantro, serrano peppers, and avocado. Served with housemade tostadas',
        note: '🍋 Raw/citrus marinated',
      },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrees',
    emoji: '🥘',
    items: [
      {
        name: 'OMG Taco Plate',
        price: '$17.00',
        description: 'Two tacos, choice of one meat, cheese, pico de mango, pickled onions, with side of rice',
        note: '⏱ Takes 15–20 min to make',
        meatChoice: true,
        image: '/dishes/omg_taco_plate.jpg',
      },
      {
        name: 'Chile Relleno Plate',
        price: '$16.50',
        description: 'Roasted Poblano pepper stuffed with cheese, dipped in fluffy egg batter with sour cream and cheese on top. Served with rice, refried beans and side salad',
      },
      {
        name: 'Burrito',
        price: '$16.50',
        description: 'Choice of meat, rice, beans, sour cream, shredded cheese, served with lettuce, pico de gallo, guacamole and charred tomato salsa',
        meatChoice: true,
        image: '/dishes/burrito.jpg',
      },
      {
        name: 'Shrimp Burrito',
        price: '$19.00',
        description: 'Shrimp, rice, black beans, sour cream, shredded cheese, served with lettuce, pico de gallo, guacamole and charred tomato salsa',
      },
      {
        name: 'Enchilada Plate',
        price: '$18.00',
        description: 'Three chicken and cheese enchiladas in red guajillo, mole, & green tomatillo sauce, cabbage, pickled onions, topped with cheese, avocado, and sour cream. Served with side of rice',
        note: '⚠️ Mole contains nuts/peanuts',
        image: '/dishes/enchilada_plate.jpg',
      },
      {
        name: 'Quesadilla Plate',
        price: '$17.00',
        description: 'Flour tortilla filled with cheese and choice of meat, served with lettuce, sour cream, guacamole, charred tomato salsa, and a side of rice',
        meatChoice: true,
        image: '/dishes/quesadilla_plate.jpg',
      },
      {
        name: 'Shrimp Quesadilla Plate',
        price: '$18.00',
        description: 'Flour tortilla filled with cheese and shrimp, served with lettuce, sour cream, guacamole, charred tomato salsa, and side rice',
      },
      {
        name: 'Arrachera Plate',
        price: '$25.00',
        description: 'Grilled arrachera steak marinated in house seasoning served on top of grilled onions, served with rice, beans, lettuce, guacamole and choice of tortillas',
      },
      {
        name: 'Carnita Plate',
        price: '$24.00',
        description: 'Citrus braised tender pulled pork with crispy exterior served over a bed of peppers and onions alongside pickled jalapeños, rice, beans, lettuce, pico de gallo, and choice of tortillas',
        image: '/dishes/carnita_plate.jpg',
      },
      {
        name: 'Salmon Caribeño',
        price: '$23.00',
        description: 'Served over a bed of mixed veggies. Salmon topped with tamarind sauce, chipotle aioli sauce, mango mayo habanero, and pico de mango. Served with a side salad',
        image: '/dishes/salmon_caribeno.jpg',
      },
    ],
  },
  {
    id: 'fajitas',
    label: 'Fajitas',
    emoji: '🔥',
    items: [
      {
        name: 'Mix Fajita',
        price: '$30.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
        image: '/dishes/mix_fajita.jpg',
      },
      {
        name: 'Shrimp Fajita',
        price: '$22.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
        image: '/dishes/shrimp_fajita.jpg',
      },
      {
        name: 'Chicken Fajita',
        price: '$18.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
        image: '/dishes/chicken_fajita.jpg',
      },
      {
        name: 'Veggie Fajita',
        price: '$17.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
      },
    ],
  },
  {
    id: 'kids',
    label: 'Kids Menu',
    emoji: '🌟',
    items: [
      {
        name: 'Chicken Tenders & Fries',
        price: '$8.00',
        note: '👶 Kids 12 & Under',
      },
      {
        name: 'Kids Burrito',
        price: '$7.00',
        description: 'Refried beans and cheese, wrapped in a flour tortilla, served with side of rice',
        note: '👶 Kids 12 & Under',
      },
      {
        name: 'Kids Taco Plate',
        price: '$7.00',
        description: 'Flour tortilla with choice of meat and shredded cheese. Served with rice and beans',
        meatChoice: true,
        note: '👶 Kids 12 & Under',
      },
      {
        name: 'Kids Quesadilla Plate',
        price: '$7.00',
        description: 'With melted cheese. Served with rice and beans',
        addons: ['Add meat +$1.50'],
        note: '👶 Kids 12 & Under',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    emoji: '🍚',
    items: [
      { name: 'Rice', price: '$4.50' },
      { name: 'Refried Beans', price: '$4.50' },
      { name: 'Black Beans', price: '$4.50' },
      { name: 'Pickled Jalapeños', price: '$0.75' },
      { name: 'Roasted Jalapeño', price: '$1.00' },
      { name: '2oz Sour Cream', price: '$1.00' },
      { name: 'Flour Tortillas', price: '$2.00' },
      { name: 'Corn Tortillas', price: '$2.00' },
      { name: 'Sliced Avocado', price: '$3.50' },
      { name: 'Bean & Cheese Burrito', price: '$8.99' },
      { name: '*Tostada de Camaron', price: '$5.50' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    emoji: '🍮',
    items: [
      { name: 'Churro', price: '$3.00' },
      { name: 'Rotating Dessert', price: 'Please Ask', description: 'Ask your server about today\'s special dessert' },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    emoji: '🍹',
    items: [
      {
        name: 'Margaritas',
        price: '$10.00',
        description: 'La Rosa (strawberry, chamoy, tajín rim) · Mango Loca (mango, chamoy, tajín rim) · OMG (guava) · El Mañanero (coffee & horchata) · La Chismosa (spicy lime, pink sugar rim, jalapeño)',
      },
      {
        name: 'Frozen Margaritas',
        price: 'Med $12 / Lg $17',
        description: 'Rotating flavors — ask your server',
      },
      { name: 'Paloma', price: '$12.00' },
      { name: 'OG Michelada', price: '$10.00', description: 'Beer of your choice' },
      {
        name: 'Mimosas',
        price: '$9.00/glass',
        description: 'Pineapple, Orange or Mango. Served with champagne',
      },
      {
        name: 'Wine',
        price: 'Ask server',
        description: 'Drytown Cellars Red | Helwig White',
      },
      {
        name: 'Beer',
        price: '$7–$12',
        description: 'Corona $7 · Modelo Especial $7 · Modelo Negra $7 · Pacifico $7 · Sierra Nevada $8 · 805 $8 · Caguama (32oz) $12',
      },
      {
        name: 'Aguas Frescas',
        price: '16oz $5 / 24oz $7.50',
        description: 'Piña con Pepino · Horchata · Rotating flavor',
      },
      {
        name: 'Soda',
        price: '16oz $3.50 / 24oz $4.50',
        description: 'Coke · Diet Coke · Sprite · Fanta · Lemonade · Coke Zero',
      },
      { name: 'Agua Mineral', price: '$3.50' },
      { name: 'Squirt', price: '$3.50' },
      { name: 'Red Bull', price: '$5.00' },
    ],
  },
]
