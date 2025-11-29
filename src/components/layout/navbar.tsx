"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const cartItems = useCartStore((state) => state.items);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo and navigation */}
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tight text-primary">Koekeloer</span>
                    </Link>
                    {/* Desktop links */}
                    <nav className="hidden md:flex gap-6">
                        <Link href="/shop" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            Shop
                        </Link>
                        <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            Categories
                        </Link>
                    </nav>
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden flex items-center"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Right side: search, cart, user */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="h-9 w-64 rounded-md border border-input bg-transparent px-9 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]"
                                >
                                    {itemCount}
                                </Badge>
                            )}
                            <span className="sr-only">Cart</span>
                        </Button>
                    </Link>

                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders">Orders</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Mobile navigation links */}
            {mobileOpen && (
                <nav className="absolute top-full left-0 w-full bg-background border-b md:hidden">
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-primary">
                            Shop
                        </Link>
                        <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary">
                            Categories
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
