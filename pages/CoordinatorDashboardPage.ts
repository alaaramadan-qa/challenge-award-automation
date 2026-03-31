import { Page, Locator } from '@playwright/test';

export class CoordinatorDashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly totalApplicationsCount: Locator;
  readonly pendingApplicationsCount: Locator;
  readonly approvedApplicationsCount: Locator;
  readonly rejectedApplicationsCount: Locator;
  readonly applicationsTable: Locator;
  readonly applicationRows: Locator;
  readonly filterSelect: Locator;
  readonly searchInput: Locator;
  readonly applicantName: Locator;
  readonly applicantEmail: Locator;
  readonly applicantOrganization: Locator;
  readonly applicationStatus: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;
  readonly viewDetailsButton: Locator;
  readonly backButton: Locator;
  readonly coordinatorNotesTextarea: Locator;
  readonly saveNotesButton: Locator;
  readonly pendingBadge: Locator;
  readonly approvedBadge: Locator;
  readonly rejectedBadge: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;
  readonly challengeTypeLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator('h1, h2, [class*="dashboard-title"]');
    this.totalApplicationsCount = page.locator('[class*="total-count"], [data-stat="total"]');
    this.pendingApplicationsCount = page.locator('[class*="pending-count"], [data-stat="pending"]');
    this.approvedApplicationsCount = page.locator('[class*="approved-count"], [data-stat="approved"]');
    this.rejectedApplicationsCount = page.locator('[class*="rejected-count"], [data-stat="rejected"]');
    this.applicationsTable = page.locator('table, [class*="applications-table"]');
    this.applicationRows = page.locator('table tbody tr, [class*="application-row"]');
    this.filterSelect = page.locator('select[name*="status"], #filter');
    this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
    this.applicantName = page.locator('[class*="applicant-name"], [data-field="name"]');
    this.applicantEmail = page.locator('[class*="applicant-email"], [data-field="email"]');
    this.applicantOrganization = page.locator('[class*="organization"], [data-field="organization"]');
    this.applicationStatus = page.locator('[class*="application-status"], .badge');
    this.approveButton = page.locator('button:has-text("Approve"), a:has-text("Approve")');
    this.rejectButton = page.locator('button:has-text("Reject"), a:has-text("Reject")');
    this.viewDetailsButton = page.locator('button:has-text("View"), a:has-text("View")');
    this.backButton = page.locator('button:has-text("Back"), a:has-text("Back")');
    this.coordinatorNotesTextarea = page.locator('textarea[name*="notes"], #coordinatorNotes');
    this.saveNotesButton = page.locator('button:has-text("Save"), button:has-text("Submit Feedback")');
    this.pendingBadge = page.locator('.badge-warning, [class*="pending"]');
    this.approvedBadge = page.locator('.badge-success, [class*="approved"]');
    this.rejectedBadge = page.locator('.badge-danger, [class*="rejected"]');
    this.successAlert = page.locator('.alert-success, [class*="success-alert"]');
    this.errorAlert = page.locator('.alert-danger, [class*="error-alert"]');
    this.nextPageButton = page.locator('button:has-text("Next"), [aria-label="Next page"]');
    this.prevPageButton = page.locator('button:has-text("Previous"), [aria-label="Previous page"]');
    this.challengeTypeLabel = page.locator('[class*="challenge-type"], [data-challenge-type]');
  }

  async loginAsCoordinator(adminUrl: string, email: string, password: string) {
    await this.page.goto(adminUrl);
    await this.page.waitForLoadState('networkidle');
    await this.page.fill('input[type="email"], #email', email);
    await this.page.fill('input[type="password"], #password', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalApplicationsCount(): Promise<string> {
    return await this.totalApplicationsCount.textContent() ?? '0';
  }

  async getPendingCount(): Promise<string> {
    return await this.pendingApplicationsCount.textContent() ?? '0';
  }

  async getApprovedCount(): Promise<string> {
    return await this.approvedApplicationsCount.textContent() ?? '0';
  }

  async getRejectedCount(): Promise<string> {
    return await this.rejectedApplicationsCount.textContent() ?? '0';
  }

  async getApplicationCount(): Promise<number> {
    return await this.applicationRows.count();
  }

  async filterByStatus(status: string) {
    await this.filterSelect.selectOption(status);
    await this.page.waitForLoadState('networkidle');
  }

  async searchApplication(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.page.waitForTimeout(500);
  }

  async clickViewApplication(index: number = 0) {
    const viewBtns = this.page.locator('button:has-text("View"), a:has-text("View")');
    await viewBtns.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async approveApplication() {
    await this.approveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async rejectApplication() {
    await this.rejectButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addCoordinatorNote(note: string) {
    await this.coordinatorNotesTextarea.fill(note);
    await this.saveNotesButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goBack() {
    await this.backButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSuccessMessage(): Promise<string> {
    return await this.successAlert.textContent() ?? '';
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorAlert.textContent() ?? '';
  }

  async isSuccessAlertVisible(): Promise<boolean> {
    return await this.successAlert.isVisible();
  }

  async getDashboardTitle(): Promise<string> {
    return await this.dashboardTitle.first().textContent() ?? '';
  }

  async getChallengeType(): Promise<string> {
    return await this.challengeTypeLabel.textContent() ?? '';
  }
}
