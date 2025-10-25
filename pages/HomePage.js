class HomePage {
    constructor(page) {
        this.page = page;
        this.patientPortalButton = page.locator('button:has-text("Patient Portal"), a:has-text("Patient Portal")');
        this.queueRegistrationButton = page.locator('button:has-text("Queue Registration"), a:has-text("Queue Registration")');
    }

    async navigate() {
        await this.page.goto('https://patient.dev-cloudcaresindia.com');
    }

    async clickPatientPortal() {
        await this.patientPortalButton.click();
    }

    async clickQueueRegistration() {
        await this.queueRegistrationButton.click();
    }
}

module.exports = HomePage;