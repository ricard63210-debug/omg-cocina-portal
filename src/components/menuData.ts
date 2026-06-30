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
  ingredients?: string[] // list of ingredients
  spicy?: boolean
  glutenFree?: boolean
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
        ingredients: ['Grilled chicken breast', 'Romaine lettuce', 'Tomatoes', 'Avocado slice', 'Grilled sweet corn', 'Fresh cucumber', 'House dressing'],
        glutenFree: true,
        spicy: false,
      },
      {
        name: 'Arrachera Salad',
        price: '$19.50',
        description: 'Steak, romaine, tomato, avocado, grilled corn, and cucumber',
        image: '/dishes/arrachera_salad.jpg',
        ingredients: ['Grilled arrachera steak', 'Romaine lettuce', 'Tomatoes', 'Avocado slice', 'Grilled sweet corn', 'Fresh cucumber', 'House dressing'],
        glutenFree: true,
        spicy: false,
      },
      {
        name: 'Shrimp Salad',
        price: '$19.50',
        description: 'Grilled shrimp, romaine, tomato, avocado, grilled corn, and cucumber',
        image: '/dishes/shrimp_salad.jpg',
        ingredients: ['Seasoned grilled shrimp', 'Romaine lettuce', 'Tomatoes', 'Avocado slice', 'Grilled sweet corn', 'Fresh cucumber', 'House dressing'],
        glutenFree: true,
        spicy: false,
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
        ingredients: ['Crispy breaded shrimp', 'Tomatillo salsa', 'Chipotle aioli', 'Mango-habanero mayo', 'Pico de mango', 'Melted cheese', 'Shredded cabbage', 'Warm corn tortilla'],
        glutenFree: false,
        spicy: true,
      },
      {
        name: 'Fish Taco',
        price: '$5.00',
        description: 'Breaded fish, chipotle aioli, mango mayo habanero, pico de mango, cabbage slaw on corn tortilla',
        image: '/dishes/fish_taco.jpg',
        ingredients: ['Crispy breaded fish fillet', 'Tomatillo salsa', 'Chipotle aioli', 'Mango-habanero mayo', 'Pico de mango', 'Shredded cabbage', 'Warm corn tortilla'],
        glutenFree: false,
        spicy: true,
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
        ingredients: ['Crispy housemade tortilla chips', 'Warm refried beans', 'Choice of meat (Carne Asada, Chicken, etc.)', 'Melted Monterey Jack cheese', 'Fresh guacamole', 'Pico de gallo', 'Mexican sour cream', 'Pickled jalapeños'],
        glutenFree: true,
        spicy: true,
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
        ingredients: ['Two tacos with choice of meat', 'Melted cheese', 'Pico de mango', 'Pickled red onions', 'Mexican red rice'],
        glutenFree: true,
        spicy: false,
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
        ingredients: ['Choice of meat', 'Mexican red rice', 'Refried beans', 'Sour cream', 'Shredded cheese blend', 'Lettuce', 'Pico de gallo', 'Fresh guacamole', 'Charred tomato salsa', 'Large flour tortilla'],
        glutenFree: false,
        spicy: false,
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
        ingredients: ['Three corn tortillas stuffed with chicken and cheese', 'Red guajillo pepper sauce', 'Rich mole negro sauce', 'Green tomatillo salsa', 'Shredded cabbage', 'Pickled red onions', 'Melted cheese', 'Avocado slice', 'Mexican sour cream', 'Side of rice'],
        glutenFree: false,
        spicy: true,
      },
      {
        name: 'Quesadilla Plate',
        price: '$17.00',
        description: 'Flour tortilla filled with cheese and choice of meat, served with lettuce, sour cream, guacamole, charred tomato salsa, and a side of rice',
        meatChoice: true,
        image: '/dishes/quesadilla_plate.jpg',
        ingredients: ['Folded flour tortilla with melted cheese', 'Choice of meat', 'Shredded lettuce', 'Sour cream', 'Fresh guacamole', 'Charred tomato salsa', 'Side of rice'],
        glutenFree: false,
        spicy: false,
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
        ingredients: ['Slow-cooked citrus-marinated pulled pork (carnitas)', 'Grilled bell peppers & onions', 'Pickled jalapeños', 'Mexican red rice', 'Refried beans', 'Shredded lettuce', 'Pico de gallo', 'Choice of warm corn or flour tortillas'],
        glutenFree: true,
        spicy: true,
      },
      {
        name: 'Salmon Caribeño',
        price: '$23.00',
        description: 'Served over a bed of mixed veggies. Salmon topped with tamarind sauce, chipotle aioli sauce, mango mayo habanero, and pico de mango. Served with a side salad',
        image: '/dishes/salmon_caribeno.jpg',
        ingredients: ['Pan-seared salmon fillet', 'Rich tamarindo glaze', 'Chipotle aioli sauce', 'Mango-habanero mayo', 'Pico de mango', 'Assorted mixed grilled vegetables', 'Fresh side salad'],
        glutenFree: true,
        spicy: true,
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
        ingredients: ['Grilled chicken breast slices', 'Tender steak slices', 'Sautéed bell peppers and sweet onions', 'Mexican red rice', 'Refried beans', 'Shredded lettuce', 'Pico de gallo', 'Sour cream', 'Choice of warm tortillas'],
        glutenFree: true,
        spicy: false,
      },
      {
        name: 'Shrimp Fajita',
        price: '$22.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
        image: '/dishes/shrimp_fajita.jpg',
        ingredients: ['Succulent grilled shrimp', 'Sautéed bell peppers and sweet onions', 'Mexican red rice', 'Refried beans', 'Shredded lettuce', 'Pico de gallo', 'Sour cream', 'Choice of warm tortillas'],
        glutenFree: true,
        spicy: false,
      },
      {
        name: 'Chicken Fajita',
        price: '$18.00',
        description: 'Served with rice, beans, lettuce, pico de gallo, sour cream and choice of tortillas',
        image: '/dishes/chicken_fajita.jpg',
        ingredients: ['Marinated grilled chicken breast slices', 'Sautéed bell peppers and sweet onions', 'Mexican red rice', 'Refried beans', 'Shredded lettuce', 'Pico de gallo', 'Sour cream', 'Choice of warm tortillas'],
        glutenFree: true,
        spicy: false,
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
