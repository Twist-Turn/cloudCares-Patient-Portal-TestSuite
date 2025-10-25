class OtpPage {
    constructor(page) {
        this.page = page;
        // Direct selectors for the OTP inputs based on your debug output
        this.otpInput1 = page.locator('input[name="otp1"]');
        this.otpInput2 = page.locator('input[name="otp2"]');
        this.otpInput3 = page.locator('input[name="otp3"]');
        this.otpInput4 = page.locator('input[name="otp4"]');
        this.verifyOtpButton = page.locator('button:has-text("Verify OTP")');
        this.otpSentMessage = page.locator('text=OTP sent to');
    }

    async waitForOtpPage() {
        await this.verifyOtpButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async enterOtp(otp) {
        console.log('Entering OTP:', otp);
        
        // Clear any existing values first
        await this.otpInput1.fill('');
        await this.otpInput2.fill('');
        await this.otpInput3.fill('');
        await this.otpInput4.fill('');
        
        await this.page.waitForTimeout(500);
        
        // Fill each OTP digit in the specific inputs
        await this.otpInput1.fill(otp[0]);
        await this.page.waitForTimeout(200);
        
        await this.otpInput2.fill(otp[1]);
        await this.page.waitForTimeout(200);
        
        await this.otpInput3.fill(otp[2]);
        await this.page.waitForTimeout(200);
        
        await this.otpInput4.fill(otp[3]);
        await this.page.waitForTimeout(500);
        
        // Verify the OTP was entered correctly
        const value1 = await this.otpInput1.inputValue();
        const value2 = await this.otpInput2.inputValue();
        const value3 = await this.otpInput3.inputValue();
        const value4 = await this.otpInput4.inputValue();
        
        console.log('OTP Values entered:', value1, value2, value3, value4);
    }

    async clickVerifyOtp() {
        await this.verifyOtpButton.click();
    }

    async getOtpSentMessage() {
        return await this.otpSentMessage.textContent();
    }
}

module.exports = OtpPage;