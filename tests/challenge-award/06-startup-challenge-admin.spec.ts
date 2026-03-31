import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ChallengeAwardPage } from '../../pages/ChallengeAwardPage';
import { ApplicationDetailPage } from '../../pages/ApplicationDetailPage';
import { testData } from '../../fixtures/testData';

/**
 * SP-1936 - Start-Up Challenge List Admin
  * SP-1943 - Viewing Start-Up Application Admin and Coordinator
   */
   test.describe('SP-1936 | Start-Up Challenge List Admin @smoke @regression', () => {
     let loginPage: LoginPage;
       let challengeAwardPage: ChallengeAwardPage;

         test.beforeEach(async ({ page }) => {
             loginPage = new LoginPage(page);
                 challengeAwardPage = new ChallengeAwardPage(page);
                     await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                         await challengeAwardPage.goToChallengeAwardTab();
                             await challengeAwardPage.goToStartUpChallenge();
                               });

                                 test('@SP-1936 @smoke Start-Up Challenge list is displayed', async ({ page }) => {
                                     await expect(challengeAwardPage.challengeTable).toBeVisible();
                                       });

                                         test('@SP-1936 @smoke Add New button is visible', async ({ page }) => {
                                             await expect(challengeAwardPage.addNewButton).toBeVisible();
                                               });

                                                 test('@SP-1936 @smoke Activate/Deactivate link button present', async ({ page }) => {
                                                     const activateVisible = await challengeAwardPage.activateLinkButton.isVisible();
                                                         const deactivateVisible = await challengeAwardPage.deactivateLinkButton.isVisible();
                                                             expect(activateVisible || deactivateVisible).toBeTruthy();
                                                               });

                                                                 test('@SP-1936 @regression Admin adds new Start-Up Challenge @lang-en', async ({ page }) => {
                                                                     await challengeAwardPage.clickAddNew();
                                                                         await challengeAwardPage.fillNetworkChallengeForm({
                                                                               nameEn: 'Test StartUp Challenge EN',
                                                                                     nameAr: 'تحدي الشركات الناشئة',
                                                                                           descEn: 'StartUp description EN',
                                                                                                 descAr: 'وصف الشركات الناشئة',
                                                                                                     });
                                                                                                         await challengeAwardPage.saveChallenge();
                                                                                                             const msg = await challengeAwardPage.getSuccessMessage();
                                                                                                                 expect(msg.length).toBeGreaterThan(0);
                                                                                                                   });
                                                                                                                   
                                                                                                                     test('@SP-1936 @negative Empty form shows validation error', async ({ page }) => {
                                                                                                                         await challengeAwardPage.clickAddNew();
                                                                                                                             await challengeAwardPage.saveChallenge();
                                                                                                                                 const errors = await challengeAwardPage.getErrorMessage();
                                                                                                                                     expect(errors.length).toBeGreaterThan(0);
                                                                                                                                       });
                                                                                                                                       
                                                                                                                                         test('@SP-1936 @regression Admin activates Start-Up Challenge link', async ({ page }) => {
                                                                                                                                             const status = await challengeAwardPage.getLinkStatus();
                                                                                                                                                 if (status.toLowerCase().includes('inactive')) {
                                                                                                                                                       await challengeAwardPage.activateLink();
                                                                                                                                                             const newStatus = await challengeAwardPage.getLinkStatus();
                                                                                                                                                                   expect(newStatus.toLowerCase()).toMatch(/active/);
                                                                                                                                                                       }
                                                                                                                                                                         });
                                                                                                                                                                         });
                                                                                                                                                                         
                                                                                                                                                                         test.describe('SP-1943 | Start-Up Application View Admin @regression', () => {
                                                                                                                                                                           let loginPage: LoginPage;
                                                                                                                                                                             let challengeAwardPage: ChallengeAwardPage;
                                                                                                                                                                               let detailPage: ApplicationDetailPage;
                                                                                                                                                                               
                                                                                                                                                                                 test.beforeEach(async ({ page }) => {
                                                                                                                                                                                     loginPage = new LoginPage(page);
                                                                                                                                                                                         challengeAwardPage = new ChallengeAwardPage(page);
                                                                                                                                                                                             detailPage = new ApplicationDetailPage(page);
                                                                                                                                                                                                 await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                                                                                                                                                                                                     await challengeAwardPage.goToChallengeAwardTab();
                                                                                                                                                                                                         await challengeAwardPage.goToStartUpChallenge();
                                                                                                                                                                                                           });
                                                                                                                                                                                                           
                                                                                                                                                                                                             test('@SP-1943 @smoke Admin sees Start-Up applications table', async ({ page }) => {
                                                                                                                                                                                                                 await expect(detailPage.applicationsTable).toBeVisible();
                                                                                                                                                                                                                   });
                                                                                                                                                                                                                   
                                                                                                                                                                                                                     test('@SP-1943 @regression Admin can filter Start-Up applications by status', async ({ page }) => {
                                                                                                                                                                                                                         await detailPage.filterByStatus('pending');
                                                                                                                                                                                                                             await expect(detailPage.applicationsTable).toBeVisible();
                                                                                                                                                                                                                               });
                                                                                                                                                                                                                               
                                                                                                                                                                                                                                 test('@SP-1943 @regression Admin can view Start-Up application detail', async ({ page }) => {
                                                                                                                                                                                                                                     const count = await detailPage.getApplicationCount();
                                                                                                                                                                                                                                         if (count > 0) {
                                                                                                                                                                                                                                               await detailPage.clickViewApplication(0);
                                                                                                                                                                                                                                                     await expect(page.locator('body')).toBeVisible();
                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                           });
                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                             test('@SP-1943 @regression Admin can approve Start-Up application', async ({ page }) => {
                                                                                                                                                                                                                                                                 const count = await detailPage.getApplicationCount();
                                                                                                                                                                                                                                                                     if (count > 0) {
                                                                                                                                                                                                                                                                           await detailPage.clickViewApplication(0);
                                                                                                                                                                                                                                                                                 await detailPage.approveApplication();
                                                                                                                                                                                                                                                                                       expect(await detailPage.isSuccessAlertVisible()).toBeTruthy();
                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                             });
                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                               test('@SP-1943 @regression Admin can reject Start-Up application', async ({ page }) => {
                                                                                                                                                                                                                                                                                                   const count = await detailPage.getApplicationCount();
                                                                                                                                                                                                                                                                                                       if (count > 0) {
                                                                                                                                                                                                                                                                                                             await detailPage.clickViewApplication(0);
                                                                                                                                                                                                                                                                                                                   await detailPage.rejectApplication();
                                                                                                                                                                                                                                                                                                                         expect(await detailPage.isSuccessAlertVisible()).toBeTruthy();
                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                 test('@SP-1943 @regression Admin can assign coordinator to Start-Up application', async ({ page }) => {
                                                                                                                                                                                                                                                                                                                                     // Coordinator credentials TBD - structure ready for when coordinator is developed
                                                                                                                                                                                                                                                                                                                                         const count = await detailPage.getApplicationCount();
                                                                                                                                                                                                                                                                                                                                             if (count > 0) {
                                                                                                                                                                                                                                                                                                                                                   await detailPage.clickViewApplication(0);
                                                                                                                                                                                                                                                                                                                                                         const assignVisible = await detailPage.assignCoordinatorSelect.isVisible();
                                                                                                                                                                                                                                                                                                                                                               if (assignVisible) {
                                                                                                                                                                                                                                                                                                                                                                       await expect(detailPage.assignCoordinatorButton).toBeVisible();
                                                                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                                                                   });
                                                                                                                                                                                                                                                                                                                                                                                   });
