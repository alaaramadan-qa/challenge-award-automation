import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ChallengeAwardPage } from '../../pages/ChallengeAwardPage';
import { ApplicationDetailPage } from '../../pages/ApplicationDetailPage';
import { testData } from '../../fixtures/testData';

// SP-1932 Network Challenge List, SP-1933 Add New, SP-1945 View Applications

test.describe('SP-1932 | Network Challenge List Admin @smoke @regression', () => {
  let loginPage: LoginPage;
    let challengeAwardPage: ChallengeAwardPage;

      test.beforeEach(async ({ page }) => {
          loginPage = new LoginPage(page);
              challengeAwardPage = new ChallengeAwardPage(page);
                  await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                      await challengeAwardPage.goToChallengeAwardTab();
                          await challengeAwardPage.goToNetworkChallenge();
                            });

                              test('@SP-1932 @smoke Network Challenge list is displayed', async ({ page }) => {
                                  await expect(challengeAwardPage.challengeTable).toBeVisible();
                                    });

                                      test('@SP-1932 @smoke Add New button is visible', async ({ page }) => {
                                          await expect(challengeAwardPage.addNewButton).toBeVisible();
                                            });

                                              test('@SP-1932 @regression Admin can search challenges', async ({ page }) => {
                                                  await challengeAwardPage.searchChallenge('Network');
                                                      await expect(challengeAwardPage.challengeTable).toBeVisible();
                                                        });
                                                        });

                                                        test.describe('SP-1933 | Add New Network Challenge Admin @regression', () => {
                                                          let loginPage: LoginPage;
                                                            let challengeAwardPage: ChallengeAwardPage;

                                                              test.beforeEach(async ({ page }) => {
                                                                  loginPage = new LoginPage(page);
                                                                      challengeAwardPage = new ChallengeAwardPage(page);
                                                                          await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                                                                              await challengeAwardPage.goToChallengeAwardTab();
                                                                                  await challengeAwardPage.goToNetworkChallenge();
                                                                                      await challengeAwardPage.clickAddNew();
                                                                                        });

                                                                                          test('@SP-1933 @smoke Add New form shows EN and AR fields', async ({ page }) => {
                                                                                              await expect(challengeAwardPage.challengeNameInputEn).toBeVisible();
                                                                                                  await expect(challengeAwardPage.challengeNameInputAr).toBeVisible();
                                                                                                    });
                                                                                                    
                                                                                                      test('@SP-1933 @smoke Admin saves new Network Challenge @lang-en', async ({ page }) => {
                                                                                                          await challengeAwardPage.fillNetworkChallengeForm({
                                                                                                                nameEn: 'Test Network Challenge EN',
                                                                                                                      nameAr: 'تحدي الشبكة',
                                                                                                                            descEn: 'Test description English',
                                                                                                                                  descAr: 'وصف اختبار',
                                                                                                                                      });
                                                                                                                                          await challengeAwardPage.saveChallenge();
                                                                                                                                              const msg = await challengeAwardPage.getSuccessMessage();
                                                                                                                                                  expect(msg.length).toBeGreaterThan(0);
                                                                                                                                                    });
                                                                                                                                                    
                                                                                                                                                      test('@SP-1933 @negative Empty required fields shows validation error', async ({ page }) => {
                                                                                                                                                          await challengeAwardPage.saveChallenge();
                                                                                                                                                              const errors = await challengeAwardPage.getErrorMessage();
                                                                                                                                                                  expect(errors.length).toBeGreaterThan(0);
                                                                                                                                                                    });
                                                                                                                                                                    
                                                                                                                                                                      test('@SP-1933 @regression Cancel returns to list', async ({ page }) => {
                                                                                                                                                                          await challengeAwardPage.cancelButton.click();
                                                                                                                                                                              await expect(challengeAwardPage.challengeTable).toBeVisible();
                                                                                                                                                                                });
                                                                                                                                                                                });
                                                                                                                                                                                
                                                                                                                                                                                test.describe('SP-1945 | Network Application Activation and View Admin @regression', () => {
                                                                                                                                                                                  let loginPage: LoginPage;
                                                                                                                                                                                    let challengeAwardPage: ChallengeAwardPage;
                                                                                                                                                                                      let detailPage: ApplicationDetailPage;
                                                                                                                                                                                      
                                                                                                                                                                                        test.beforeEach(async ({ page }) => {
                                                                                                                                                                                            loginPage = new LoginPage(page);
                                                                                                                                                                                                challengeAwardPage = new ChallengeAwardPage(page);
                                                                                                                                                                                                    detailPage = new ApplicationDetailPage(page);
                                                                                                                                                                                                        await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                                                                                                                                                                                                            await challengeAwardPage.goToChallengeAwardTab();
                                                                                                                                                                                                                await challengeAwardPage.goToNetworkChallenge();
                                                                                                                                                                                                                  });
                                                                                                                                                                                                                  
                                                                                                                                                                                                                    test('@SP-1945 @smoke Activate or Deactivate link button is present', async ({ page }) => {
                                                                                                                                                                                                                        const activateVisible = await challengeAwardPage.activateLinkButton.isVisible();
                                                                                                                                                                                                                            const deactivateVisible = await challengeAwardPage.deactivateLinkButton.isVisible();
                                                                                                                                                                                                                                expect(activateVisible || deactivateVisible).toBeTruthy();
                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                    test('@SP-1945 @regression Admin can activate Network Challenge link', async ({ page }) => {
                                                                                                                                                                                                                                        const status = await challengeAwardPage.getLinkStatus();
                                                                                                                                                                                                                                            if (status.toLowerCase().includes('inactive')) {
                                                                                                                                                                                                                                                  await challengeAwardPage.activateLink();
                                                                                                                                                                                                                                                        const newStatus = await challengeAwardPage.getLinkStatus();
                                                                                                                                                                                                                                                              expect(newStatus.toLowerCase()).toMatch(/active/);
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                      test('@SP-1945 @smoke Admin sees submitted applications table', async ({ page }) => {
                                                                                                                                                                                                                                                                          await expect(detailPage.applicationsTable).toBeVisible();
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                              test('@SP-1945 @regression Admin filters applications by pending status', async ({ page }) => {
                                                                                                                                                                                                                                                                                  await detailPage.filterByStatus('pending');
                                                                                                                                                                                                                                                                                      await expect(detailPage.applicationsTable).toBeVisible();
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                          test('@SP-1945 @regression Admin can approve a Network application', async ({ page }) => {
                                                                                                                                                                                                                                                                                              const count = await detailPage.getApplicationCount();
                                                                                                                                                                                                                                                                                                  if (count > 0) {
                                                                                                                                                                                                                                                                                                        await detailPage.clickViewApplication(0);
                                                                                                                                                                                                                                                                                                              await detailPage.approveApplication();
                                                                                                                                                                                                                                                                                                                    expect(await detailPage.isSuccessAlertVisible()).toBeTruthy();
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                          });
