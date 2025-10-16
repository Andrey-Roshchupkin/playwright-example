import { Locator, Page } from '@playwright/test';
import { BaseElement } from './BaseElement';

/**
 * Base class for element lists
 */
export class BaseList extends BaseElement {
  constructor(locator: Locator, page: Page) {
    super(locator, page);
  }

  /**
   * Gets the number of items in the list
   */
  async getItemCount(): Promise<number> {
    return await this.locator.count();
  }

  /**
   * Gets an item by index
   */
  async getItemByIndex(index: number): Promise<Locator> {
    return this.locator.nth(index);
  }

  /**
   * Checks if the list is empty
   */
  async isEmpty(): Promise<boolean> {
    return (await this.getItemCount()) === 0;
  }

  /**
   * Checks if the list is not empty
   */
  async isNotEmpty(): Promise<boolean> {
    return !(await this.isEmpty());
  }

  /**
   * Gets all items in the list
   */
  async getAllItems(): Promise<Locator[]> {
    const count = await this.getItemCount();
    const items: Locator[] = [];

    for (let i = 0; i < count; i++) {
      items.push(this.locator.nth(i));
    }

    return items;
  }

  /**
   * Checks if the list contains a specific number of items
   */
  async hasItemCount(expectedCount: number): Promise<boolean> {
    const actualCount = await this.getItemCount();
    return actualCount === expectedCount;
  }

  /**
   * Gets the locator for all items (for expect assertions)
   */
  getItemsLocator(): Locator {
    return this.locator;
  }
}
