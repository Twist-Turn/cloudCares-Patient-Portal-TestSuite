const { expect } = require('@playwright/test');

class PatientDashboardPage {
    constructor(page) {
        this.page = page;

        // Sidebar locators based on actual UI
        this.overviewMenu = page.locator('a:has-text("Overview"), [href*="overview"]');
        this.appointmentsMenu = page.locator('a:has-text("Appointments"), [href*="appointments"]');
        this.prescriptionsMenu = page.locator('a:has-text("Prescriptions"), [href*="prescriptions"]');
        this.diagnosesMenu = page.locator('a:has-text("Diagnoses"), [href*="diagnoses"]');
        this.visitHistoryMenu = page.locator('a:has-text("Visit History"), [href*="visit-history"]');
        this.labReportsMenu = page.locator('a:has-text("Lab Reports"), [href*="lab-reports"]');
        this.queueStatusMenu = page.locator('a:has-text("Queue Status"), [href*="queue-status"]');
        this.purchaseMedicinesMenu = page.locator('a:has-text("Purchase Medicines"), [href*="purchase-medicines"]');
        this.chatWithCCareMenu = page.locator('a:has-text("Chat with CCare AI"), [href*="chat"]');

        // Welcome message text
        this.welcomeMessage = page.locator('text=Welcome back,');
    }

    // Wait for dashboard to load after login
    async waitForDashboard() {
        await this.page.waitForURL('**/patient/portal**', { timeout: 20000 });
        await expect(this.welcomeMessage).toBeVisible({ timeout: 10000 });
    }

    // Verify dashboard loaded correctly
    async verifyDashboardLoaded() {
        await expect(this.page).toHaveURL(/\/patient\/portal/);
        await expect(this.welcomeMessage).toBeVisible();
    }

    // Click all visible sidebar items and take screenshots
    async clickAllSidebarItems() {
        const menuItems = [
            { name: 'Overview', locator: this.overviewMenu },
            { name: 'Appointments', locator: this.appointmentsMenu },
            { name: 'Prescriptions', locator: this.prescriptionsMenu },
            { name: 'Diagnoses', locator: this.diagnosesMenu },
            { name: 'Visit History', locator: this.visitHistoryMenu },
            { name: 'Lab Reports', locator: this.labReportsMenu },
            { name: 'Queue Status', locator: this.queueStatusMenu },
            { name: 'Purchase Medicines', locator: this.purchaseMedicinesMenu },
            { name: 'Chat with CCare AI', locator: this.chatWithCCareMenu }
        ];

        for (const item of menuItems) {
            if (await item.locator.isVisible()) {
                console.log(`🔹 Clicking ${item.name}`);
                await item.locator.click();
                await this.page.waitForTimeout(1500);
                await this.page.screenshot({ path: `sidebar-${item.name.toLowerCase().replace(/\s+/g, '-')}.png` });
            } else {
                console.log(`⚠️ ${item.name} not visible, skipping`);
            }
        }
    }

    // Get current page URL (for validation/debug)
    async getCurrentUrl() {
        return this.page.url();
    }
}

module.exports = PatientDashboardPage;
