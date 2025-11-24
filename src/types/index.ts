export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface ProductVariant {
    id: string;
    name: string; // e.g., "Size: M", "Color: Red"
    sku: string;
    price: number;
    stock: number;
    options: Record<string, string>; // { Size: "M", Color: "Red" }
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    salePrice?: number;
    images: string[];
    categoryId: string;
    stock: number; // Aggregate stock or simple stock if no variants
    variants?: ProductVariant[];
    featured?: boolean;
    createdAt: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariantId?: string;
}
