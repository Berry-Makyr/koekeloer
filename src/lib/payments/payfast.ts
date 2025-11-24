import crypto from "crypto";
import { PaymentProvider, PaymentRequest } from "./types";

interface PayFastConfig {
    merchantId: string;
    merchantKey: string;
    passPhrase?: string;
    sandbox?: boolean;
    returnUrl?: string;
    cancelUrl?: string;
    notifyUrl?: string;
}

export class PayFastService implements PaymentProvider {
    private config: PayFastConfig;
    private baseUrl: string;

    constructor(config: PayFastConfig) {
        this.config = config;
        this.baseUrl = config.sandbox
            ? "https://sandbox.payfast.co.za/eng/process"
            : "https://www.payfast.co.za/eng/process";
    }

    private generateSignature(data: Record<string, string>): string {
        // 1. Sort the object by key
        const sortedKeys = Object.keys(data).sort();

        // 2. Create the query string
        let queryString = sortedKeys
            .map((key) => {
                // PayFast requires spaces to be replaced by +
                const value = data[key].trim().replace(/ /g, "+");
                return `${key}=${encodeURIComponent(value)}`;
            })
            .join("&");

        // 3. Append passphrase if it exists
        if (this.config.passPhrase) {
            queryString += `&passphrase=${encodeURIComponent(this.config.passPhrase.trim().replace(/ /g, "+"))}`;
        }

        // 4. MD5 hash
        return crypto.createHash("md5").update(queryString).digest("hex");
    }

    async generatePaymentForm(request: PaymentRequest): Promise<{
        url: string;
        fields: Record<string, string>;
    }> {
        const data: Record<string, string> = {
            merchant_id: this.config.merchantId,
            merchant_key: this.config.merchantKey,
            return_url: this.config.returnUrl || "",
            cancel_url: this.config.cancelUrl || "",
            notify_url: this.config.notifyUrl || "",

            // Transaction Details
            m_payment_id: request.id,
            amount: request.amount.toFixed(2),
            item_name: request.itemName,

            // Payer Details
            email_address: request.email,
        };

        if (request.firstName) data.name_first = request.firstName;
        if (request.lastName) data.name_last = request.lastName;

        // Remove empty fields
        Object.keys(data).forEach((key) => {
            if (!data[key]) delete data[key];
        });

        // Generate signature
        data.signature = this.generateSignature(data);

        return {
            url: this.baseUrl,
            fields: data,
        };
    }

    validateWebhook(data: Record<string, string>): boolean {
        const { signature, ...rest } = data;

        // Re-generate signature to verify
        const calculatedSignature = this.generateSignature(rest);

        return signature === calculatedSignature;
    }
}

// Singleton instance for the app
export const payfast = new PayFastService({
    merchantId: process.env.PAYFAST_MERCHANT_ID || "10000100", // Sandbox Default
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a", // Sandbox Default
    passPhrase: process.env.PAYFAST_PASSPHRASE,
    sandbox: process.env.NODE_ENV !== "production",
    returnUrl: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/?success=true`,
    cancelUrl: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/checkout?canceled=true`,
    notifyUrl: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/payments/payfast/itn`,
});
