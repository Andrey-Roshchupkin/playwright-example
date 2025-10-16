import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a page
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Reloads the page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Goes back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Waits for page load
   */
  async waitForLoadState(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  /**
   * Gets the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Gets the page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Takes a screenshot of the page
   */
  async screenshot(options?: {
    path?: string;
    fullPage?: boolean;
  }): Promise<Buffer> {
    return await this.page.screenshot(options);
  }

  /**
   * Executes JavaScript on the page
   */
  async evaluate<T>(pageFunction: () => T): Promise<T> {
    return await this.page.evaluate(pageFunction);
  }

  /**
   * Waits for a function to execute on the page
   */
  async waitForFunction<T>(
    pageFunction: () => T,
    expected?: T,
    timeout?: number
  ): Promise<void> {
    await this.page.waitForFunction(pageFunction, expected, { timeout });
  }

  /**
   * Gets a locator by selector
   */
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Gets a locator by test ID
   */
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Gets a locator by role
   */
  getByRole(
    role: Parameters<Page['getByRole']>[0],
    options?: Parameters<Page['getByRole']>[1]
  ): Locator {
    return this.page.getByRole(role, options);
  }

  /**
   * Gets a locator by text
   */
  getByText(text: string): Locator {
    return this.page.getByText(text);
  }

  /**
   * Gets a locator by placeholder
   */
  getByPlaceholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  /**
   * Gets a locator by label
   */
  getByLabel(label: string): Locator {
    return this.page.getByLabel(label);
  }
}
