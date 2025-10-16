import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for links
 */
export class BaseLink extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Gets the URL of the link
   */
  async getHref(): Promise<string | null> {
    return await this.locator.getAttribute('href');
  }

  /**
   * Checks if the link is active (has 'selected' class)
   */
  async isActive(): Promise<boolean> {
    return await this.hasClass('selected');
  }

  /**
   * Checks if the link is inactive
   */
  async isInactive(): Promise<boolean> {
    return !(await this.isActive());
  }
}
