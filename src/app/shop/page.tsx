import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import { products } from "@/lib/data";

export default async function ShopPage() {
    // Fetch products from database with fallback to mock data
    let dbProducts: any[] = [];
    let useMockData = false;

    try {
        dbProducts = await prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        });
    } catch (e) {
        console.error("Database connection failed, falling back to mock data:", e);
        useMockData = true;
    }

    // Process products (either from DB or Mock)
    const displayProducts = useMockData
        ? products // Mock data is already in correct format
        : dbProducts.map(product => {
            // Parse images safely for DB data
            let images: string[] = [];
            try {
                images = JSON.parse(product.images);
            } catch (e) {
                images = ["/placeholder.png"];
            }

            return {
                ...product,
                images: Array.isArray(images) && images.length > 0 ? images : ["/placeholder.png"],
                salePrice: product.salePrice || undefined,
                createdAt: product.createdAt.toISOString()
            };
        });

    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Shop All Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
