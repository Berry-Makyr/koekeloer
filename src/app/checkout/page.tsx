import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
            <CheckoutForm />
        </div>
    );
}
