import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for buttons
 */
export class BaseButton extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Checks if the button is disabled
   */
  async isDisabled(): Promise<boolean> {
    return await this.locator.isDisabled();
  }

  /**
   * Checks if the button is enabled
   */
  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }

  /**
   * Gets the value of the disabled attribute
   */
  async getDisabledAttribute(): Promise<string | null> {
    return await this.locator.getAttribute('disabled');
  }
}
