import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for checkboxes
 */
export class BaseCheckbox extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Checks the checkbox
   */
  async check(): Promise<void> {
    await this.locator.check();
  }

  /**
   * Unchecks the checkbox
   */
  async uncheck(): Promise<void> {
    await this.locator.uncheck();
  }

  /**
   * Toggles the checkbox state
   */
  async toggle(): Promise<void> {
    if (await this.isChecked()) {
      await this.uncheck();
    } else {
      await this.check();
    }
  }

  /**
   * Checks if the checkbox is checked
   */
  async isChecked(): Promise<boolean> {
    return await this.locator.isChecked();
  }

  /**
   * Checks if the checkbox is unchecked
   */
  async isUnchecked(): Promise<boolean> {
    return !(await this.isChecked());
  }

  /**
   * Checks if the checkbox is disabled
   */
  async isDisabled(): Promise<boolean> {
    return await this.locator.isDisabled();
  }

  /**
   * Checks if the checkbox is enabled
   */
  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }

  /**
   * Gets the value of the checked attribute
   */
  async getCheckedAttribute(): Promise<string | null> {
    return await this.locator.getAttribute('checked');
  }
}
