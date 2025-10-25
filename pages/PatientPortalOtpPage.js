class PatientPortalOtpPage {
    constructor(page) {
        this.page = page;
        this.otpInput1 = page.locator('input[name="otp1"]');
        this.otpInput2 = page.locator('input[name="otp2"]');
        this.otpInput3 = page.locator('input[name="otp3"]');
        this.otpInput4 = page.locator('input[name="otp4"]');
        this.verifyOtpButton = page.locator('button:has-text("Verify OTP")');
    }

    async waitForOtpPage() {
        await this.verifyOtpButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async enterOtp(otp) {
        console.log('Entering OTP:', otp);
        
        await this.otpInput1.fill('');
        await this.otpInput2.fill('');
        await this.otpInput3.fill('');
        await this.otpInput4.fill('');
        
        await this.page.waitForTimeout(500);
        
        await this.otpInput1.fill(otp[0]);
        await this.page.waitForTimeout(200);
        await this.otpInput2.fill(otp[1]);
        await this.page.waitForTimeout(200);
        await this.otpInput3.fill(otp[2]);
        await this.page.waitForTimeout(200);
        await this.otpInput4.fill(otp[3]);
        await this.page.waitForTimeout(500);
    }

    async clickVerifyOtp() {
        await this.verifyOtpButton.click();
    }
}

module.exports = PatientPortalOtpPage;