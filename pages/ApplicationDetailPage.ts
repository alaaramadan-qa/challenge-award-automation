import { Page, Locator } from '@playwright/test';

/**
 * ApplicationDetailPage
 * Admin-side: view, approve, reject, filter challenge applications.
 * Covers SP-1945 (Network), SP-1938 (Universities), SP-1943 (Start-Up).
 */
export class ApplicationDetailPage {
    readonly page: Page;

  // Applications list
  readonly applicationsTable: Locator;
    readonly applicationRows: Locator;
    readonly filterSelect: Locator;
    readonly searchInput: Locator;
    readonly exportButton: Locator;

  // Application detail view
  readonly applicantName: Locator;
    readonly applicantEmail: Locator;
    readonly applicantPhone: Locator;
    readonly organizationName: Locator;
    readonly applicationStatus: Locator;
    readonly applicationDate: Locator;
    readonly challengeType: Locator;

  // Actions
  readonly approveButton: Locator;
    readonly rejectButton: Locator;
    readonly viewDetailsButton: Locator;
    readonly backButton: Locator;

  // Status badges
  readonly pendingBadge: Locator;
    readonly approvedBadge: Locator;
    readonly rejectedBadge: Locator;

  // Coordinator assignment (Universities & Start-Up)
  readonly assignCoordinatorSelect: Locator;
    readonly assignCoordinatorButton: Locator;

  // Notes / comments
  readonly adminNotesTextarea: Locator;
    readonly saveNotesButton: Locator;

  // Alerts
  readonly successAlert: Locator;
    readonly errorAlert: Locator;

  // Pagination
  readonly nextPageButton: Locator;
    readonly prevPageButton: Locator;
    readonly pageInfo: Locator;

  constructor(page: Page) {
        this.page = page;

      // Applications list
      this.applicationsTable = page.locator('table, [class*="applications-list"], [class*="application-table"]');
        this.applicationRows = page.locator('table tbody tr, [class*="application-row"]');
        this.filterSelect = page.locator('select[name*="status"], select[name*="filter"], #filter');
        this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
        this.exportButton = page.locator('button:has-text("Export"), a:has-text("Export")');

      // Detail view fields
      this.applicantName = page.locator('[class*="applicant-name"], [data-field="name"], td:nth-child(1)');
        this.applicantEmail = page.locator('[class*="applicant-email"], [data-field="email"]');
        this.applicantPhone = page.locator('[class*="applicant-phone"], [data-field="phone"]');
        this.organizationName = page.locator('[class*="organization"], [data-field="organization"]');
        this.applicationStatus = page.locator('[class*="application-status"], [data-field="status"], .badge');
        this.applicationDate = page.locator('[class*="application-date"], [data-field="date"]');
        this.challengeType = page.locator('[class*="challenge-type"], [data-field="type"]');

      // Actions
      this.approveButton = page.locator('button:has-text("Approve"), a:has-text("Approve")');
        this.rejectButton = page.locator('button:has-text("Reject"), a:has-text("Reject")');
        this.viewDetailsButton = page.locator('button:has-text("View"), a:has-text("View"), [class*="view-btn"]');
        this.backButton = page.locator('button:has-text("Back"), a:has-text("Back"), [class*="back-btn"]');

      // Status badges
      this.pendingBadge = page.locator('.badge-warning, [class*="pending"], :has-text("Pending")');
        this.approvedBadge = page.locator('.badge-success, [class*="approved"], :has-text("Approved")');
        this.rejectedBadge = page.locator('.badge-danger, [class*="rejected"], :has-text("Rejected")');

      // Coordinator assignment
      this.assignCoordinatorSelect = page.locator('select[name*="coordinator"], #assignCoordinator');
        this.assignCoordinatorButton = page.locator('button:has-text("Assign"), button:has-text("Assign Coordinator")');

      // Notes
      this.adminNotesTextarea = page.locator('textarea[name*="notes"], textarea[name*="comment"], #adminNotes');
        this.saveNotesButton = page.locator('button:has-text("Save Notes"), button:has-text("Save Comment")');

      // Alerts
      this.successAlert = page.locator('.alert-success, [class*="success-alert"], .toast-success');
        this.errorAlert = page.locator('.alert-danger, [class*="error-alert"], .toast-error');

      // Pagination
      this.nextPageButton = page.locator('button:has-text("Next"), [aria-label="Next page"], .pagination .next');
        this.prevPageButton = page.locator('button:has-text("Previous"), [aria-label="Previous page"], .pagination .prev');
        this.pageInfo = page.locator('[class*="page-info"], .pagination-info');
  }

  // ── Applications List ────────────────────────────────────────────────────────

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
        const viewBtns = this.page.locator
