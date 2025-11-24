import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
    // Fetch products from database
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    });

    // Parse images for each product
    const productsWithParsedImages = products.map(product => ({
        ...product,
        images: JSON.parse(product.images),
        salePrice: product.salePrice || undefined
    }));

    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Shop All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsWithParsedImages.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
