"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            quantity: 1,
            image: product.images[0],
        });
    };

    return (
        <Link href={`/product/${product.slug}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg group cursor-pointer border-border/50">
                <div className="aspect-square relative overflow-hidden bg-secondary/20">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.salePrice && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            SALE
                        </div>
                    )}
                </div>
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1 capitalize">
                        {product.categoryId.replace("cat_", "")} {/* Simple mapping for now */}
                    </div>
                    <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">
                            R {product.salePrice || product.price}
                        </span>
                        {product.salePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                                R {product.price}
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Button
                        className="w-full gap-2"
                        onClick={handleAddToCart}
                        variant="secondary"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
