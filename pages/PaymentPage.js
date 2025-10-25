class PaymentPage {
    constructor(page) {
        this.page = page;
        this.proceedToPaymentButton = page.locator('button:has-text("Proceed to Payment")');
    }

    async clickProceedToPayment() {
        await this.proceedToPaymentButton.click();
    }

    async waitForRazorpay() {
        // Wait for Razorpay to load - adjust selector based on your implementation
        await this.page.waitForSelector('.razorpay-container, [class*="razorpay"]', { timeout: 10000 });
    }
}

module.exports = PaymentPage;