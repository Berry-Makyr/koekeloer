"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            quantity: 1,
            image: product.images[0],
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            className="w-full md:w-auto text-lg h-12"
            onClick={handleAddToCart}
            disabled={isAdded}
        >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
    );
}
