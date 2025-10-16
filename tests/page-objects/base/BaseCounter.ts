import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for counters
 */
export class BaseCounter extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Checks if the counter contains a specific number
   */
  async containsNumber(number: number): Promise<boolean> {
    const countText = await this.getText();
    return countText.includes(number.toString());
  }

  /**
   * Checks if the counter contains specific text
   */
  async containsText(text: string): Promise<boolean> {
    const countText = await this.getText();
    return countText.includes(text);
  }

  /**
   * Gets the numeric value from the counter
   */
  async getNumericValue(): Promise<number | null> {
    const countText = await this.getText();
    const match = countText.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  /**
   * Checks if the counter is empty
   */
  async isEmpty(): Promise<boolean> {
    const countText = await this.getText();
    return countText.trim() === '';
  }

  /**
   * Gets the base locator for expect assertions
   */
  getLocator(): Locator {
    return this.locator;
  }
}
