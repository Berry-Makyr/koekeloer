import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { products } from "@/lib/data";

// This is a server component that fetches from database
export default async function ProductPage({ params }: { params: { slug: string } }) {
    let product: any = null;
    let useMockData = false;

    try {
        product = await prisma.product.findUnique({
            where: { slug: params.slug }
        });
    } catch (e) {
        console.error("Database connection failed, checking mock data:", e);
        useMockData = true;
    }

    // If DB failed or returned null, check mock data
    if (!product) {
        // Check mock data
        const mockProduct = products.find(p => p.slug === params.slug);
        if (mockProduct) {
            product = mockProduct;
            useMockData = true;
        } else {
            notFound();
        }
    }

    // Prepare product data for display
    let images: string[] = [];

    if (useMockData) {
        // Mock data is already in correct format
        images = product.images;
    } else {
        // Parse images from JSON string safely for DB data
        try {
            images = JSON.parse(product.images);
        } catch (e) {
            images = ["/placeholder.png"];
        }
    }

    // Ensure we have at least one image
    if (!Array.isArray(images) || images.length === 0) {
        images = ["/placeholder.png"];
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
                        src={images[0]}
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

                        <AddToCartButton product={{
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            description: product.description,
                            price: product.price,
                            salePrice: product.salePrice || undefined,
                            images: images,
                            categoryId: product.categoryId,
                            stock: product.stock,
                            featured: product.featured,
                            createdAt: useMockData ? product.createdAt : (product.createdAt ? product.createdAt.toISOString() : new Date().toISOString())
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
