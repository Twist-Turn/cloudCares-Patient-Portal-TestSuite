class PatientSelectionPage {
    constructor(page) {
        this.page = page;
        this.registerNewPatientButton = page.locator('text=Register New Patient');
        this.patientCards = page.locator('text=tester'); // Patient names
        this.backButton = page.locator('text=Back');
    }

    async waitForPatientSelection() {
        await this.page.waitForTimeout(3000);
        await this.registerNewPatientButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async getPatientCount() {
        return await this.patientCards.count();
    }

    async isPatientSelectionPage() {
        return await this.registerNewPatientButton.isVisible();
    }
}

module.exports = PatientSelectionPage;