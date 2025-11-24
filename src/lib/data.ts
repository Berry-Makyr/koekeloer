import { Category, Product } from "@/types";

export const categories: Category[] = [
    {
        id: "cat_1",
        name: "Electronics",
        slug: "electronics",
        description: "Gadgets and gizmos",
    },
    {
        id: "cat_2",
        name: "Home & Living",
        slug: "home-living",
        description: "Decor and furniture",
    },
    {
        id: "cat_3",
        name: "Fashion",
        slug: "fashion",
        description: "Trendy clothing and accessories",
    },
];

export const products: Product[] = [
    {
        id: "prod_1",
        name: "Wireless Noise-Cancelling Headphones",
        slug: "wireless-headphones",
        description: "Experience silence with our premium noise-cancelling headphones. Features 30-hour battery life and plush ear cushions.",
        price: 3499,
        salePrice: 2999,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        ],
        categoryId: "cat_1",
        stock: 50,
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: "prod_2",
        name: "Minimalist Wooden Desk Lamp",
        slug: "wooden-desk-lamp",
        description: "Handcrafted wooden desk lamp with adjustable arm. Perfect for your home office or bedside table.",
        price: 850,
        images: [
            "https://images.unsplash.com/photo-1507473888900-52e1ad14592d?w=800&q=80",
        ],
        categoryId: "cat_2",
        stock: 25,
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: "prod_3",
        name: "Classic Denim Jacket",
        slug: "classic-denim-jacket",
        description: "A timeless wardrobe staple. Made from 100% organic cotton denim with a vintage wash.",
        price: 1200,
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        ],
        categoryId: "cat_3",
        stock: 100,
        createdAt: new Date().toISOString(),
    },
    {
        id: "prod_4",
        name: "Smart Fitness Watch",
        slug: "smart-fitness-watch",
        description: "Track your workouts, heart rate, and sleep with this advanced fitness tracker. Water-resistant up to 50m.",
        price: 1999,
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", // Placeholder, reused for demo
        ],
        categoryId: "cat_1",
        stock: 15,
        createdAt: new Date().toISOString(),
    },
    {
        id: "prod_5",
        name: "Ceramic Coffee Mug Set",
        slug: "ceramic-mug-set",
        description: "Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe.",
        price: 450,
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
        ],
        categoryId: "cat_2",
        stock: 40,
        createdAt: new Date().toISOString(),
    },
];
