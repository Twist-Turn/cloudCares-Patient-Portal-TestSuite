class LoginPage {
    constructor(page) {
        this.page = page;
        this.mobileInput = page.locator('input[name="mobile"]');
        this.sendOtpButton = page.locator('button:has-text("Send OTP")');
    }

    async navigate() {
        await this.page.goto('https://patient.dev-cloudcaresindia.com'); // Replace with actual URL
    }

    async enterMobileNumber(mobile) {
        await this.mobileInput.fill(mobile);
    }

    async clickSendOtp() {
        await this.sendOtpButton.click();
    }
}

module.exports = LoginPage;