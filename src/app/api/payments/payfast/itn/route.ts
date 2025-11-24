import { NextResponse } from "next/server";
import { payfast } from "@/lib/payments/payfast";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        // PayFast sends data as form-urlencoded
        const text = await req.text();
        const params = new URLSearchParams(text);
        const data: Record<string, string> = {};

        params.forEach((value, key) => {
            data[key] = value;
        });

        console.log("PayFast ITN received:", data);

        // 1. Validate Signature
        if (!payfast.validateWebhook(data)) {
            console.error("Invalid PayFast signature");
            return new NextResponse("Invalid signature", { status: 400 });
        }

        // 2. Check Payment Status
        const paymentStatus = data.payment_status;
        const orderId = data.m_payment_id;
        const pfPaymentId = data.pf_payment_id;

        if (paymentStatus === "COMPLETE") {
            // Update Order
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "PAID",
                    paymentId: pfPaymentId,
                    paymentMethod: "PayFast",
                },
            });
            console.log(`Order ${orderId} marked as PAID`);
        } else {
            console.log(`Payment status for order ${orderId}: ${paymentStatus}`);
        }

        return new NextResponse("OK", { status: 200 });
    } catch (error) {
        console.error("ITN Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
