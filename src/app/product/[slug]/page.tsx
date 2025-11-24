import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button"; // Extracting client logic

// This is a server component
export default function ProductPage({ params }: { params: { slug: string } }) {
    const product = products.find((p) => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container py-8 md:py-12">
            <Link
                href="/shop"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image Gallery */}
                <div className="relative aspect-square overflow-hidden rounded-xl border bg-secondary/20">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {product.salePrice && (
                        <div className="absolute top-4 right-4">
                            <Badge variant="destructive" className="text-lg px-3 py-1">
                                SALE
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <Badge variant="secondary" className="mb-3 capitalize">
                            {product.categoryId.replace("cat_", "")}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-baseline gap-3 mt-4">
                            <span className="text-3xl font-bold">
                                R {product.salePrice || product.price}
                            </span>
                            {product.salePrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    R {product.price}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Truck className="h-4 w-4" />
                                <span>Free delivery over R500</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ShieldCheck className="h-4 w-4" />
                                <span>2-year warranty</span>
                            </div>
                        </div>

                        <div className="h-px bg-border my-2" />

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
