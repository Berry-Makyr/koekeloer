import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { payfast } from "@/lib/payments/payfast";
import { z } from "zod";

const checkoutSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        quantity: z.number(),
        price: z.number(),
    })),
    shippingInfo: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        address: z.string(),
        city: z.string(),
        postalCode: z.string(),
    }),
});

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();
        const { items, shippingInfo } = checkoutSchema.parse(body);

        // Calculate total
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Create Order in DB
        const order = await prisma.order.create({
            data: {
                userId: session?.user?.id, // Optional, can be null for guest
                total,
                status: "PENDING",
                shippingInfo: JSON.stringify(shippingInfo),
                items: {
                    create: items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });

        // Generate PayFast Form
        const paymentData = await payfast.generatePaymentForm({
            id: order.id,
            amount: total,
            itemName: `Order #${order.id}`,
            email: shippingInfo.email,
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
        });

        return NextResponse.json({
            orderId: order.id,
            paymentUrl: paymentData.url,
            paymentFields: paymentData.fields,
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { message: "Failed to initiate checkout" },
            { status: 500 }
        );
    }
}
