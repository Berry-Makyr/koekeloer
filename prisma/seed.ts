import { prisma } from "./lib/prisma";

const products = [
    {
        name: "Wireless Noise-Cancelling Headphones",
        slug: "wireless-noise-cancelling-headphones",
        description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
        price: 3499,
        salePrice: 2999,
        images: JSON.stringify(["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"]),
        categoryId: "cat_electronics",
        stock: 50,
        featured: true
    },
    {
        name: "Smart Watch Pro",
        slug: "smart-watch-pro",
        description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications.",
        price: 4999,
        images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"]),
        categoryId: "cat_electronics",
        stock: 30,
        featured: true
    },
    {
        name: "Minimalist Desk Lamp",
        slug: "minimalist-desk-lamp",
        description: "Modern LED desk lamp with adjustable brightness and color temperature.",
        price: 899,
        images: JSON.stringify(["https://images.unsplash.com/photo-1507473888900-52e1ad14592d?w=800&q=80"]),
        categoryId: "cat_home",
        stock: 100,
        featured: false
    },
    {
        name: "Premium Leather Backpack",
        slug: "premium-leather-backpack",
        description: "Handcrafted genuine leather backpack with laptop compartment.",
        price: 2499,
        salePrice: 1999,
        images: JSON.stringify(["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"]),
        categoryId: "cat_fashion",
        stock: 25,
        featured: true
    },
    {
        name: "Wireless Keyboard & Mouse Combo",
        slug: "wireless-keyboard-mouse-combo",
        description: "Ergonomic wireless keyboard and mouse set with long battery life.",
        price: 1299,
        images: JSON.stringify(["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"]),
        categoryId: "cat_electronics",
        stock: 75,
        featured: false
    },
    {
        name: "Ceramic Coffee Mug Set",
        slug: "ceramic-coffee-mug-set",
        description: "Set of 4 handmade ceramic mugs, perfect for your morning coffee.",
        price: 599,
        images: JSON.stringify(["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"]),
        categoryId: "cat_home",
        stock: 150,
        featured: false
    }
];

async function main() {
    console.log("Seeding database...");

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        });
    }

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
