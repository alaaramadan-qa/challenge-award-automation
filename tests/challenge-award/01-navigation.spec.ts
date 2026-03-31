import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ChallengeAwardPage } from '../../pages/ChallengeAwardPage';
import { testData } from '../../fixtures/testData';

/**
 * SP-1931 - Challenge Award Tab - Admin Side
  * Navigation: tab visibility, sub-tab routing, access control
   */
   test.describe('SP-1931 | Challenge Award Tab Navigation @smoke @regression', () => {
     let loginPage: LoginPage;
       let challengeAwardPage: ChallengeAwardPage;

         test.beforeEach(async ({ page }) => {
             loginPage = new LoginPage(page);
                 challengeAwardPage = new ChallengeAwardPage(page);
                     await loginPage.loginAsAdmin(testData.adminUrl, testData.adminEmail, testData.adminPassword);
                       });

                         test('@SP-1931 @smoke Admin sees Challenge Award tab', async ({ page }) => {
                             await expect(challengeAwardPage.challengeAwardTab).toBeVisible();
                               });

                                 test('@SP-1931 @smoke Admin navigates to Challenge Award tab', async ({ page }) => {
                                     await challengeAwardPage.goToChallengeAwardTab();
                                         await expect(page).toHaveURL(/challenge-award/i);
                                           });

                                             test('@SP-1931 @smoke Network Challenge sub-tab is visible', async ({ page }) => {
                                                 await challengeAwardPage.goToChallengeAwardTab();
                                                     await expect(challengeAwardPage.networkChallengeSubTab).toBeVisible();
                                                       });

                                                         test('@SP-1931 @smoke Universities Challenge sub-tab is visible', async ({ page }) => {
                                                             await challengeAwardPage.goToChallengeAwardTab();
                                                                 await expect(challengeAwardPage.universitiesChallengeSubTab).toBeVisible();
                                                                   });

                                                                     test('@SP-1931 @smoke Start-Up Challenge sub-tab is visible', async ({ page }) => {
                                                                         await challengeAwardPage.goToChallengeAwardTab();
                                                                             await expect(challengeAwardPage.startUpChallengeSubTab).toBeVisible();
                                                                               });

                                                                                 test('@SP-1931 @smoke Admin navigates to Network Challenge', async ({ page }) => {
                                                                                     await challengeAwardPage.goToChallengeAwardTab();
                                                                                         await challengeAwardPage.goToNetworkChallenge();
                                                                                             await expect(page).toHaveURL(/network-challenge/i);
                                                                                               });

                                                                                                 test('@SP-1931 @smoke Admin navigates to Universities Challenge', async ({ page }) => {
                                                                                                     await challengeAwardPage.goToChallengeAwardTab();
                                                                                                         await challengeAwardPage.goToUniversitiesChallenge();
                                                                                                             await expect(page).toHaveURL(/universities-challenge/i);
                                                                                                               });
                                                                                                               
                                                                                                                 test('@SP-1931 @smoke Admin navigates to Start-Up Challenge', async ({ page }) => {
                                                                                                                     await challengeAwardPage.goToChallengeAwardTab();
                                                                                                                         await challengeAwardPage.goToStartUpChallenge();
                                                                                                                             await expect(page).toHaveURL(/startup-challenge|start-up-challenge/i);
                                                                                                                               });
                                                                                                                               
                                                                                                                                 test('@SP-1931 @negative Unauthenticated user redirected away from admin Challenge Award', async ({ browser }) => {
                                                                                                                                     const context = await browser.newContext();
                                                                                                                                         const page = await context.newPage();
                                                                                                                                             await page.goto(testData.adminUrl + '/challenge-award');
                                                                                                                                                 await expect(page).not.toHaveURL(/challenge-award/);
                                                                                                                                                     await context.close();
                                                                                                                                                       });
                                                                                                                                                       
                                                                                                                                                         test('@SP-1931 @regression Active sub-tab state is correct after switching', async ({ page }) => {
                                                                                                                                                             await challengeAwardPage.goToChallengeAwardTab();
                                                                                                                                                                 await challengeAwardPage.goToNetworkChallenge();
                                                                                                                                                                     await challengeAwardPage.goToUniversitiesChallenge();
                                                                                                                                                                         await expect(page).toHaveURL(/universities-challenge/i);
                                                                                                                                                                           });
                                                                                                                                                                           });
