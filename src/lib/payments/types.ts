export interface PaymentRequest {
    id: string;
    amount: number;
    itemName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface PaymentProvider {
    generatePaymentForm: (request: PaymentRequest) => Promise<{
        url: string;
        fields: Record<string, string>;
    }>;
    validateWebhook: (data: Record<string, string>) => boolean;
}
