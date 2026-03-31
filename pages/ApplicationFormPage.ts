import { Page, Locator } from '@playwright/test';

/**
 * ApplicationFormPage
 * Covers the USER-SIDE public challenge application forms for:
 * - Network Challenge
 * - Universities Challenge
 * - Start-Up Challenge
 * All pages are public (no login required).
 * Base URL: https://gca.stg.alweb4tech.com
 */
export class ApplicationFormPage {
    readonly page: Page;

  // Page hero / title
  readonly pageTitle: Locator;
    readonly pageHeading: Locator;

  // Form fields (common across challenges)
  readonly applicantNameInput: Locator;
    readonly applicantEmailInput: Locator;
    readonly applicantPhoneInput: Locator;
    readonly organizationNameInput: Locator;
    readonly countrySelect: Locator;
    readonly messageTextarea: Locator;
    readonly submitButton: Locator;

  // File upload
  readonly fileUploadInput: Locator;

  // Success / error states
  readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly validationErrors: Locator;

  // SEO meta
  readonly metaRobots: Locator;

  // Language / direction
  readonly htmlElement: Locator;
    readonly bodyElement: Locator;

  constructor(page: Page) {
        this.page = page;

      this.pageTitle = page.locator('title');
        this.pageHeading = page.locator('h1, h2, [class*="hero-title"], [class*="page-title"]');

      this.applicantNameInput = page.locator('input[name*="name"], input[placeholder*="Name"], #name');
        this.applicantEmailInput = page.locator('input[type="email"], input[name*="email"], #email');
        this.applicantPhoneInput = page.locator('input[type="tel"], input[name*="phone"], #phone');
        this.organizationNameInput = page.locator('input[name*="organization"], input[name*="company"], #organization');
        this.countrySelect = page.locator('select[name*="country"], #country');
        this.messageTextarea = page.locator('textarea[name*="message"], textarea[name*="description"], #message');
        this.submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Apply")');

      this.fileUploadInput = page.locator('input[type="file"]');

      this.successMessage = page.locator('[class*="success"], .alert-success, [class*="thank-you"]');
        this.errorMessage = page.locator('[class*="error"], .alert-danger');
        this.validationErrors = page.locator('.invalid-feedback, [class*="field-error"], [class*="validation-error"]');

      this.metaRobots = page.locator('meta[name="robots"]');

      this.htmlElement = page.locator('html');
        this.bodyElement = page.locator('body');
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  async gotoNetworkChallengeEn() {
        await this.page.goto('https://gca.stg.alweb4tech.com/en/Network-Challenge');
        await this.page.waitForLoadState('networkidle');
  }

  async gotoNetworkChallengeAr() {
        await this.page.goto('https://gca.stg.alweb4tech.com/Network-Challenge');
        await this.page.waitForLoadState('networkidle');
  }

  async gotoUniversitiesChallengeEn() {
        await this.page.goto('https://gca.stg.alweb4tech.com/en/universities-challenge');
        await this.page.waitForLoadState('networkidle');
  }

  async gotoUniversitiesChallengeAr() {
        await this.page.goto('https://gca.stg.alweb4tech.com/universities-challenge');
        await this.page.waitForLoadState('networkidle');
  }

  async gotoStartUpChallengeEn() {
        await this.page.goto('https://gca.stg.alweb4tech.com/en/Start-Up-Challenge');
        await this.page.waitForLoadState('networkidle');
  }

  async gotoStartUpChallengeAr() {
        await this.page.goto('https://gca.stg.alweb4tech.com/Start-Up-Challenge');
        await this.page.waitForLoadState('networkidle');
  }

  // ── SEO / Crawlability ───────────────────────────────────────────────────────

  async getMetaRobotsContent(): Promise<string> {
        return await this.metaRobots.getAttribute('content') ?? '';
  }

  async isPageIndexable(): Promise<boolean> {
        const robotsContent = await this.getMetaRobotsContent();
        return !robotsContent.includes('noindex');
  }

  async checkRobotsTxt(baseUrl: string): Promise<string> {
        const response = await this.page.request.get(`${baseUrl}/robots.txt`);
        return await response.text();
  }

  // ── Language / Direction ─────────────────────────────────────────────────────

  async getHtmlLang(): Promise<string> {
        return await this.htmlElement.getAttribute('lang') ?? '';
  }

  async getHtmlDir(): Promise<string> {
        return await this.htmlElement.getAttribute('dir') ?? '';
  }

  async isRtl(): Promise<boolean> {
        const dir = await this.getHtmlDir();
        return dir === 'rtl';
  }

  async isLtr(): Promise<boolean> {
        const dir = await this.getHtmlDir();
        return dir === 'ltr';
  }

  // ── Form Interaction ─────────────────────────────────────────────────────────

  async fillApplicationForm(data: {
        name?: string;
        email?: string;
        phone?: string;
        organization?: string;
        country?: string;
        message?: string;
  }) {
        if (data.name) await this.applicantNameInput.fill(data.name);
        if (data.email) await this.applicantEmailInput.fill(data.email);
        if (data.phone) await this.applicantPhoneInput.fill(data.phone);
        if (data.organization) await this.organizationNameInput.fill(data.organization);
        if (data.country) await this.countrySelect.selectOption(data.country);
        if (data.message) await this.messageTextarea.fill(data.message);
  }

  async submitForm() {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async isFormVisible(): Promise<boolean> {
        return await this.submitButton.isVisible();
  }

  async getValidationErrors(): Promise<string[]> {
        const errors: string[] = [];
        const count = await this.validationErrors.count();
        for (let i = 0; i < count; i++) {
                const text = await this.validationErrors.nth(i).textContent();
                if (text) errors.push(text.trim());
        }
        return errors;
  }

  async getHeadingText(): Promise<string> {
        return await this.pageHeading.first().textContent() ?? '';
  }

  async isPageLoaded(): Promise<boolean> {
        return await this.page.locator('body').isVisible();
  }
}
