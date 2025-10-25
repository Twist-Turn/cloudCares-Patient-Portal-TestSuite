class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.locator('input[name="fullName"]');
        this.completeRegistrationButton = page.locator('button:has-text("Complete Registration")');
    }

    async enterFullName(fullName) {
        await this.fullNameInput.fill(fullName);
    }

    async clickCompleteRegistration() {
        await this.completeRegistrationButton.click();
    }
}

module.exports = RegistrationPage;