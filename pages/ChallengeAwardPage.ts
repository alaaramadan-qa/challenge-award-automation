import { Page, Locator } from '@playwright/test';

export class ChallengeAwardPage {
    readonly page: Page;

  // Navigation
  readonly challengeAwardTab: Locator;
    readonly networkChallengeSubTab: Locator;
    readonly universitiesChallengeSubTab: Locator;
    readonly startUpChallengeSubTab: Locator;

  // Challenge list table
  readonly challengeTable: Locator;
    readonly challengeTableRows: Locator;
    readonly addNewButton: Locator;
    readonly searchInput: Locator;

  // Network Challenge form fields
  readonly challengeNameInputEn: Locator;
    readonly challengeNameInputAr: Locator;
    readonly challengeDescriptionEn: Locator;
    readonly challengeDescriptionAr: Locator;
    readonly applicationLinkInput: Locator;
    readonly activateToggle: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

  // Application link activation
  readonly linkStatusBadge: Locator;
    readonly activateLinkButton: Locator;
    readonly deactivateLinkButton: Locator;

  // Coordinator user roles
  readonly userRolesMenu: Locator;
    readonly coordinatorRoleOption: Locator;

  // Success / error alerts
  readonly successAlert: Locator;
    readonly errorAlert: Locator;

  constructor(page: Page) {
        this.page = page;

      // Navigation
      this.challengeAwardTab = page.locator('[href*="challenge-award"], a:has-text("Challenge Award"), nav >> text=Challenge Award');
        this.networkChallengeSubTab = page.locator('a:has-text("Network Challenge"), [href*="network-challenge"]');
        this.universitiesChallengeSubTab = page.locator('a:has-text("Universities Challenge"), [href*="universities-challenge"]');
        this.startUpChallengeSubTab = page.locator('a:has-text("Start-Up Challenge"), [href*="startup-challenge"]');

      // Challenge list
      this.challengeTable = page.locator('table, .challenge-list, [class*="challenge-table"]');
        this.challengeTableRows = page.locator('table tbody tr, .challenge-list .row');
        this.addNewButton = page.locator('button:has-text("Add New"), a:has-text("Add New"), button:has-text("New")');
        this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');

      // Form fields
      this.challengeNameInputEn = page.locator('input[name*="name_en"], input[name*="nameEn"], #nameEn');
        this.challengeNameInputAr = page.locator('input[name*="name_ar"], input[name*="nameAr"], #nameAr');
        this.challengeDescriptionEn = page.locator('textarea[name*="description_en"], #descriptionEn, [name*="descEn"]');
        this.challengeDescriptionAr = page.locator('textarea[name*="description_ar"], #descriptionAr, [name*="descAr"]');
        this.applicationLinkInput = page.locator('input[name*="link"], input[name*="url"], #applicationLink');
        this.activateToggle = page.locator('input[type="checkbox"][name*="active"], .toggle-active, [class*="toggle"]');
        this.saveButton = page.locator('button[type="submit"]:has-text("Save"), button:has-text("Save")');
        this.cancelButton = page.locator('button:has-text("Cancel")');

      // Link status
      this.linkStatusBadge = page.locator('.badge, [class*="status-badge"], [class*="link-status"]');
        this.activateLinkButton = page.locator('button:has-text("Activate"), a:has-text("Activate")');
        this.deactivateLinkButton = page.locator('button:has-text("Deactivate"), a:has-text("Deactivate")');

      // User roles
      this.userRolesMenu = page.locator('a:has-text("User Roles"), [href*="user-roles"]');
        this.coordinatorRoleOption = page.locator('option:has-text("Coordinator"), [value*="coordinator"]');

      // Alerts
      this.successAlert = page.locator('.alert-success, [class*="success"], .toast-success');
        this.errorAlert = page.locator('.alert-danger, [class*="error"], .toast-error');
  }

  async goToChallengeAwardTab() {
        await this.challengeAwardTab.click();
        await this.page.waitForLoadState('networkidle');
  }

  async goToNetworkChallenge() {
        await this.networkChallengeSubTab.click();
        await this.page.waitForLoadState('networkidle');
  }

  async goToUniversitiesChallenge() {
        await this.universitiesChallengeSubTab.click();
        await this.page.waitForLoadState('networkidle');
  }

  async goToStartUpChallenge() {
        await this.startUpChallengeSubTab.click();
        await this.page.waitForLoadState('networkidle');
  }

  async clickAddNew() {
        await this.addNewButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async fillNetworkChallengeForm(data: {
        nameEn: string;
        nameAr: string;
        descEn: string;
        descAr: string;
        applicationLink?: string;
  }) {
        await this.challengeNameInputEn.fill(data.nameEn);
        await this.challengeNameInputAr.fill(data.nameAr);
        await this.challengeDescriptionEn.fill(data.descEn);
        await this.challengeDescriptionAr.fill(data.descAr);
        if (data.applicationLink) {
                await this.applicationLinkInput.fill(data.applicationLink);
        }
  }

  async saveChallenge() {
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async activateLink() {
        await this.activateLinkButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async deactivateLink() {
        await this.deactivateLinkButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async getLinkStatus(): Promise<string> {
        return await this.linkStatusBadge.textContent() ?? '';
  }

  async getChallengeCount(): Promise<number> {
        return await this.challengeTableRows.count();
  }

  async getSuccessMessage(): Promise<string> {
        return await this.successAlert.textContent() ?? '';
  }

  async getErrorMessage(): Promise<string> {
        return await this.errorAlert.textContent() ?? '';
  }

  async searchChallenge(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.page.waitForTimeout(500);
  }

  async getChallengeRowByName(name: string): Promise<Locator> {
        return this.page.locator(`table tbody tr:has-text("${name}"), .challenge-list .row:has-text("${name}")`);
  }
}
