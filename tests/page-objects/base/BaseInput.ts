import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for input fields
 */
export class BaseInput extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Fills the input field with text
   */
  async fill(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  /**
   * Clears the input field
   */
  async clear(): Promise<void> {
    await this.locator.clear();
  }

  /**
   * Gets the value of the input field
   */
  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }

  /**
   * Checks if the input field is empty
   */
  async isEmpty(): Promise<boolean> {
    const value = await this.getValue();
    return value === '';
  }

  /**
   * Checks if the input field is not empty
   */
  async isNotEmpty(): Promise<boolean> {
    return !(await this.isEmpty());
  }

  /**
   * Presses a key
   */
  async press(key: string): Promise<void> {
    await this.locator.press(key);
  }

  /**
   * Focuses on the input field
   */
  async focus(): Promise<void> {
    await this.locator.focus();
  }

  /**
   * Removes focus from the input field
   */
  async blur(): Promise<void> {
    await this.locator.blur();
  }

  /**
   * Checks if the input field is disabled
   */
  async isDisabled(): Promise<boolean> {
    return await this.locator.isDisabled();
  }

  /**
   * Checks if the input field is enabled
   */
  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }

  /**
   * Gets the placeholder text
   */
  async getPlaceholder(): Promise<string | null> {
    return await this.locator.getAttribute('placeholder');
  }
}
