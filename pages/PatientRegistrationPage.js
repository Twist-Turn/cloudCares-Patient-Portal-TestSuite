class PatientRegistrationPage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.locator('input[name="fullName"], input[name="name"], #fullName, [placeholder*="Full Name"]');
        this.completeRegistrationButton = page.locator('button:has-text("Complete Registration")');
    }

    async waitForRegistrationPage() {
        await this.page.waitForTimeout(3000);
        await this.fullNameInput.first().waitFor({ state: 'visible', timeout: 10000 });
    }

    async enterFullName(fullName) {
        await this.fullNameInput.first().fill(fullName);
        
        const enteredValue = await this.fullNameInput.first().inputValue();
        console.log('Entered full name:', enteredValue);
    }

    async clickCompleteRegistration() {
        await this.completeRegistrationButton.click();
    }

    async isRegistrationPageLoaded() {
        return await this.fullNameInput.isVisible();
    }
}

module.exports = PatientRegistrationPage;