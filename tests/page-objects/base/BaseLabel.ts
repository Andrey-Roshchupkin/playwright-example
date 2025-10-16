import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for labels
 */
export class BaseLabel extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Gets the 'for' attribute (association with form element)
   */
  async getForAttribute(): Promise<string | null> {
    return await this.locator.getAttribute('for');
  }

  /**
   * Checks if the label is associated with a specific element
   */
  async isAssociatedWith(elementId: string): Promise<boolean> {
    const forAttribute = await this.getForAttribute();
    return forAttribute === elementId;
  }
}
