import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, ShieldCheck, Truck, CreditCard, CheckCircle } from "lucide-react";

export default function Home({ searchParams }: { searchParams: { success?: string } }) {
  const featuredProducts = products.filter((p) => p.featured);
  const showSuccess = searchParams.success === "true";

  return (
    <div className="flex flex-col min-h-screen">
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-900 p-4 text-center text-green-800 dark:text-green-200 flex items-center justify-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Order placed successfully! Thank you for shopping with Koekeloer.</span>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Abstract background pattern or image could go here */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
            Premium Shopping, <span className="text-blue-400">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Discover South Africa's finest collection of electronics, home goods, and fashion.
            Secure checkout and fast delivery nationwide.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/shop">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 border-none">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white/10 hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-b">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Nationwide Delivery</h3>
            <p className="text-muted-foreground">Fast and reliable shipping to your door, anywhere in SA.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Secure Payments</h3>
            <p className="text-muted-foreground">Bank-level security with 3D Secure and instant EFT options.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Easy Returns</h3>
            <p className="text-muted-foreground">Hassle-free 30-day return policy for your peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/shop" className="group flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
              View all products
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
