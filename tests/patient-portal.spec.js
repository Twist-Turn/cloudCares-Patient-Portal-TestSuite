const { test, expect } = require('@playwright/test');
const PatientPortalPage = require('../pages/PatientPortalPage');
const PatientPortalOtpPage = require('../pages/PatientPortalOtpPage');
const PatientSelectionPage = require('../pages/PatientSelectionPage');
const PatientDashboardPage = require('../pages/PatientDashboardPage');

test.describe('Patient Portal - Correct Flow with Patient Selection', () => {
    let patientPortalPage, otpPage, patientSelectionPage, dashboardPage;

    test.beforeEach(async ({ page }) => {
        patientPortalPage = new PatientPortalPage(page);
        otpPage = new PatientPortalOtpPage(page);
        patientSelectionPage = new PatientSelectionPage(page);
        dashboardPage = new PatientDashboardPage(page);
    });

    test('Select existing patient and go to dashboard', async ({ page }) => {
        test.setTimeout(60000);

        // Step 1: Open the URL and click Patient Portal
        await test.step('Open application and click Patient Portal', async () => {
            await patientPortalPage.navigate();
            await page.screenshot({ path: 'step1-homepage.png' });
            
            await patientPortalPage.clickPatientPortal();
            await page.screenshot({ path: 'step1-after-portal-click.png' });
            
            await expect(patientPortalPage.mobileInput).toBeVisible({ timeout: 10000 });
        });

        // Step 2: Enter mobile number and send OTP
        await test.step('Enter mobile number and send OTP', async () => {
            await patientPortalPage.enterMobileNumber('6381923830');
            await page.screenshot({ path: 'step2-mobile-entered.png' });
            
            await patientPortalPage.clickSendOtp();
            
            await otpPage.waitForOtpPage();
            await page.screenshot({ path: 'step2-otp-page.png' });
        });

        // Step 3: Enter OTP and verify
        await test.step('Enter OTP and verify', async () => {
            await otpPage.enterOtp('7788');
            await page.screenshot({ path: 'step3-otp-entered.png' });
            
            await otpPage.clickVerifyOtp();
            
            // Wait for patient selection page
            await page.waitForTimeout(5000);
            await page.screenshot({ path: 'step3-after-otp.png' });
        });

        // Step 4: Select existing patient and go to dashboard
        await test.step('Select existing patient and go to dashboard', async () => {
            await patientSelectionPage.waitForPatientSelection();
            await page.screenshot({ path: 'step4-patient-selection.png' });
            
            // Instead of clicking Register New Patient, click on an existing patient
            const firstPatient = patientSelectionPage.patientCards.first();
            await firstPatient.click();
            await page.waitForTimeout(5000);
            
            // Should go directly to dashboard when selecting existing patient
            await dashboardPage.waitForDashboard();
            await expect(page).toHaveURL(/\/patient\/portal/);
            
            console.log('Successfully selected existing patient and went to dashboard');
        });

        // Step 5: Test dashboard sidebar navigation
        await test.step('Test dashboard sidebar navigation', async () => {
            await dashboardPage.verifyDashboardLoaded();
            console.log('Dashboard URL:', await dashboardPage.getCurrentUrl());
            
            await dashboardPage.clickAllSidebarItems();
            await page.screenshot({ path: 'step5-sidebar-complete.png' });
            
            console.log('Dashboard navigation completed successfully!');
        });
    });
});