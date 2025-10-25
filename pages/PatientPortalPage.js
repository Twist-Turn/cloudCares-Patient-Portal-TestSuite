class PatientPortalPage {
    constructor(page) {
        this.page = page;
        this.patientPortalButton = page.locator('button:has-text("Patient Portal"), a:has-text("Patient Portal")');
        this.mobileInput = page.locator('input[type="tel"], input[placeholder*="mobile"], input[name="mobile"]');
        this.sendOtpButton = page.locator('button:has-text("Send OTP")');
    }

    async navigate() {
        await this.page.goto('https://patient.dev-cloudcaresindia.com');
        await this.page.waitForLoadState('networkidle');
    }

    async clickPatientPortal() {
        await this.patientPortalButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.patientPortalButton.first().click();
        await this.page.waitForTimeout(3000);
    }

    async enterMobileNumber(mobile) {
        await this.mobileInput.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.mobileInput.first().fill('');
        await this.mobileInput.first().fill(mobile);
        
        const enteredValue = await this.mobileInput.first().inputValue();
        console.log('Entered mobile number:', enteredValue);
    }

    async clickSendOtp() {
        await this.sendOtpButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.sendOtpButton.first().click();
    }
}

module.exports = PatientPortalPage;