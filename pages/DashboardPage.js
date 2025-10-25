class DashboardPage {
    constructor(page) {
        this.page = page;
        this.registerNewPatientButton = page.locator('button:has-text("Register New Patient")');
    }

    async clickRegisterNewPatient() {
        await this.registerNewPatientButton.click();
    }
}

module.exports = DashboardPage;