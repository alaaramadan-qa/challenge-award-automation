import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

  constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="email"], input[type="email"], #email');
        this.passwordInput = page.locator('input[name="password"], input[type="password"], #password');
        this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');
        this.errorMessage = page.locator('.alert-danger, .error-message, [class*="error"]');
  }

  async goto(baseUrl: string) {
        await this.page.goto(`${baseUrl}/login`);
  }

  async login(email: string, password: string) {
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async loginAsAdmin(adminUrl: string, email: string, password: string) {
        await this.page.goto(adminUrl);
        await this.page.waitForLoadState('networkidle');
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
  }

  async isLoggedIn(): Promise<boolean> {
        return !(await this.page.url().includes('/login'));
  }

  async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() ?? '';
  }

  async logout() {
        const logoutBtn = this.page.locator('a:has-text("Logout"), button:has-text("Logout"), a:has-text("Sign out")');
        if (await logoutBtn.isVisible()) {
                await logoutBtn.click();
                await this.page.waitForLoadState('networkidle');
        }
  }
}
