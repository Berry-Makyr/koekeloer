import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
    // Fetch products from database
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    });

    // Parse images for each product safely
    const productsWithParsedImages = products.map(product => {
        let images: string[] = [];
        try {
            images = JSON.parse(product.images);
        } catch (e) {
            console.error(`Failed to parse images for product ${product.id}:`, e);
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
                {productsWithParsedImages.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
