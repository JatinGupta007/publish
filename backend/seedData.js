const MenuItem = require('./Models/menuItemModel');

const initialMenuItems = [
    {
        id: 1,
        name: "Sandwich",
        category: "Snacks",
        price: 50,
        description: "Fresh vegetable sandwich with cheese and special sauce",
        preparationTime: 10,
        image: "/a1.avif",
        available: true,
        quantity: 20
    },
    {
        id: 2,
        name: "Coffee",
        category: "Beverages",
        price: 30,
        description: "Fresh brewed coffee with milk and sugar",
        preparationTime: 5,
        image: "/a2.avif",
        available: true,
        quantity: 32
    },
    {
        id: 3,
        name: "Light Orange Juice",
        category: "Beverages",
        price: 60,
        description: "Fresh orange juice with less sugar",
        preparationTime: 5,
        image: "/a3.avif",
        available: true,
        quantity: 26
    },
    {
        id: 4,
        name: "Tea",
        category: "Beverages",
        price: 20,
        description: "Classic Indian tea with milk and sugar",
        preparationTime: 5,
        image: "/a5.avif",
        available: true,
        quantity: 18
    },
    {
        id: 5,
        name: "Chocolate Chip Cookies",
        category: "Snacks",
        price: 10,
        description: "Fresh baked cookies with chocolate chips",
        preparationTime: 3,
        image: "/a6.avif",
        available: true,
        quantity: 24
    },
    {
        id: 6,
        name: "Jeera Masala Soda",
        category: "Beverages",
        price: 25,
        description: "Refreshing cumin flavored soda",
        preparationTime: 2,
        image: "/a7.avif",
        available: true,
        quantity: 18
    },
    {
        id: 7,
        name: "Fresh Veggie Pizza",
        category: "Snacks",
        price: 100,
        description: "Fresh pizza with mixed vegetables and cheese",
        preparationTime: 20,
        image: "/a8.avif",
        available: true,
        quantity: 18
    },
    {
        id: 8,
        name: "Burger",
        category: "Snacks",
        price: 45,
        description: "Vegetable burger with cheese and special sauce",
        preparationTime: 15,
        image: "/a4.jpeg",
        available: true,
        quantity: 12
    },
    {
        id: 9,
        name: "Fries",
        category: "Snacks",
        price: 60,
        description: "Crispy french fries with seasoning",
        preparationTime: 10,
        image: "/a9.avif",
        available: true,
        quantity: 17
    },
    {
        id: 10,
        name: "Ice Cream",
        category: "Desserts",
        price: 40,
        description: "Various flavors of ice cream",
        preparationTime: 2,
        image: "/a10.avif",
        available: true,
        quantity: 25
    },
    {
        id: 11,
        name: "Chilly Potato",
        category: "Chinese",
        price: 50,
        description: "Spicy potato fries in Chinese style",
        preparationTime: 15,
        image: "/a11.avif",
        available: true,
        quantity: 35
    },
    {
        id: 12,
        name: "White Sauce Pasta",
        category: "Italian",
        price: 60,
        description: "Creamy pasta in white sauce",
        preparationTime: 20,
        image: "/a12.avif",
        available: true,
        quantity: 33
    },
    {
        id: 13,
        name: "Masala Dosa",
        category: "South Indian",
        price: 100,
        description: "Crispy crepe filled with spiced potato mixture",
        preparationTime: 15,
        image: "/a13.avif",
        available: true,
        quantity: 17
    },
    {
        id: 14,
        name: "Veg Noodles",
        category: "Chinese",
        price: 120,
        description: "Stir-fried noodles with mixed vegetables",
        preparationTime: 15,
        image: "/a14.avif",
        available: true,
        quantity: 18
    },
    {
        id: 15,
        name: "Poori Aloo",
        category: "North Indian",
        price: 60,
        description: "Deep fried bread served with potato curry",
        preparationTime: 12,
        image: "/a15.avif",
        available: true,
        quantity: 25
    },
    {
        id: 16,
        name: "Aloo Pyaaz Paratha",
        category: "North Indian",
        price: 60,
        description: "Stuffed flatbread with potato and onion",
        preparationTime: 15,
        image: "/a16.avif",
        available: true,
        quantity: 29
    },
    {
        id: 17,
        name: "Veg Biryani",
        category: "Main Course",
        price: 120,
        description: "Fragrant rice cooked with mixed vegetables and aromatic spices",
        preparationTime: 20,
        image: "/s1.jpg",
        available: true,
        quantity: 15
    },
    {
        id: 18,
        name: "Paneer Butter Masala",
        category: "Main Course",
        price: 150,
        description: "Cottage cheese cubes in rich tomato gravy with butter and cream",
        preparationTime: 25,
        image: "/a16.avif",
        available: true,
        quantity: 20
    },
    {
        id: 19,
        name: "Cold Coffee",
        category: "Beverages",
        price: 80,
        description: "Chilled coffee blended with ice cream and chocolate sauce",
        preparationTime: 10,
        image: "/a2.avif",
        available: true,
        quantity: 30
    },
    {
        id: 20,
        name: "Chole Bhature",
        category: "North Indian",
        price: 90,
        description: "Spiced chickpeas curry served with fluffy fried bread",
        preparationTime: 20,
        image: "/cholebhature.jpg",
        available: true,
        quantity: 25
    },
    {
        id: 21,
        name: "Samosa",
        category: "Snacks",
        price: 30,
        description: "Crispy pastry filled with spiced potatoes and green peas",
        preparationTime: 5,
        image: "/samosa.jpg",
        available: true,
        quantity: 40
    },
    {
        id: 22,
        name: "Veg Spring Roll",
        category: "Chinese",
        price: 60,
        description: "Crispy rolls filled with vegetables and noodles",
        preparationTime: 15,
        image: "/springroll.jpg",
        available: true,
        quantity: 30
    },
    {
        id: 23,
        name: "Idli Sambhar",
        category: "South Indian",
        price: 70,
        description: "Steamed rice cakes served with lentil soup and chutney",
        preparationTime: 15,
        image: "/idlisambhar.jpg",
        available: true,
        quantity: 35
    },
    {
        id: 24,
        name: "Butter Naan",
        category: "North Indian",
        price: 40,
        description: "Soft tandoor-baked bread brushed with butter",
        preparationTime: 10,
        image: "/butternaan.jpg",
        available: true,
        quantity: 50
    },
    {
        id: 25,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 110,
        description: "Mixed vegetable dumplings in spicy sauce",
        preparationTime: 20,
        image: "/vegmanchurian.jpg",
        available: true,
        quantity: 25
    },
    {
        id: 26,
        name: "Masala Tea",
        category: "Beverages",
        price: 20,
        description: "Indian spiced tea with milk",
        preparationTime: 5,
        image: "/masalatea.jpg",
        available: true,
        quantity: 40
    },
    {
        id: 27,
        name: "Vegetable Fried Rice",
        category: "Chinese",
        price: 90,
        description: "Wok-fried rice with mixed vegetables and soy sauce",
        preparationTime: 15,
        image: "/friedrice.jpg",
        available: true,
        quantity: 30
    }
];

async function seedDatabase() {
    try {
        // Clear existing menu items
        await MenuItem.deleteMany({});
        console.log('Cleared existing menu items');

        // Insert new menu items
        await MenuItem.insertMany(initialMenuItems);
        console.log('Menu items seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = seedDatabase;
