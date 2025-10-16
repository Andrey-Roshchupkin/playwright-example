import { Locator, Page } from '@playwright/test';

export abstract class BaseElement {
  protected locator: Locator;
  protected page: Page;

  constructor(locator: Locator, page: Page) {
    this.locator = locator;
    this.page = page;
  }

  /**
   * Checks if the element is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  /**
   * Checks if the element is hidden
   */
  async isHidden(): Promise<boolean> {
    return await this.locator.isHidden();
  }

  /**
   * Gets the text content of the element
   */
  async getText(): Promise<string> {
    return (await this.locator.textContent()) || '';
  }

  /**
   * Gets an attribute value of the element
   */
  async getAttribute(name: string): Promise<string | null> {
    return await this.locator.getAttribute(name);
  }

  /**
   * Checks if the element has a specific CSS class
   */
  async hasClass(className: string): Promise<boolean> {
    const classList = await this.getAttribute('class');
    return classList?.includes(className) || false;
  }

  /**
   * Clicks on the element
   */
  async click(): Promise<void> {
    await this.locator.click();
  }

  /**
   * Double clicks on the element
   */
  async doubleClick(): Promise<void> {
    await this.locator.dblclick();
  }

  /**
   * Hovers over the element
   */
  async hover(): Promise<void> {
    await this.locator.hover();
  }

  /**
   * Waits for the element to become visible
   */
  async waitForVisible(timeout?: number): Promise<void> {
    await this.locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits for the element to become hidden
   */
  async waitForHidden(timeout?: number): Promise<void> {
    await this.locator.waitFor({ state: 'hidden', timeout });
  }
}
