import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
    return (
        <div className="container py-8 md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shop All</h1>
                    <p className="text-muted-foreground mt-2">
                        Explore our curated collection of premium goods.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
