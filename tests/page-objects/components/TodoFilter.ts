import { Locator, Page } from '@playwright/test';
import { BaseElement } from '../base/BaseElement';
import { BaseLink } from '../base/BaseLink';

/**
 * Filter types for todo items
 */
export type FilterType = 'All' | 'Active' | 'Completed';

/**
 * Component for working with todo item filters
 */
export class TodoFilter extends BaseElement {
  private allLink: BaseLink;
  private activeLink: BaseLink;
  private completedLink: BaseLink;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.allLink = new BaseLink(
      this.locator.getByRole('link', { name: 'All' }),
      page
    );
    this.activeLink = new BaseLink(
      this.locator.getByRole('link', { name: 'Active' }),
      page
    );
    this.completedLink = new BaseLink(
      this.locator.getByRole('link', { name: 'Completed' }),
      page
    );
  }

  /**
   * Switches to "All" filter
   */
  async showAll(): Promise<void> {
    await this.allLink.click();
  }

  /**
   * Switches to "Active" filter
   */
  async showActive(): Promise<void> {
    await this.activeLink.click();
  }

  /**
   * Switches to "Completed" filter
   */
  async showCompleted(): Promise<void> {
    await this.completedLink.click();
  }

  /**
   * Switches to the specified filter
   */
  async setFilter(filterType: FilterType): Promise<void> {
    switch (filterType) {
      case 'All':
        await this.showAll();
        break;
      case 'Active':
        await this.showActive();
        break;
      case 'Completed':
        await this.showCompleted();
        break;
    }
  }

  /**
   * Checks if "All" filter is active
   */
  async isAllFilterActive(): Promise<boolean> {
    return await this.allLink.isActive();
  }

  /**
   * Checks if "Active" filter is active
   */
  async isActiveFilterActive(): Promise<boolean> {
    return await this.activeLink.isActive();
  }

  /**
   * Checks if "Completed" filter is active
   */
  async isCompletedFilterActive(): Promise<boolean> {
    return await this.completedLink.isActive();
  }

  /**
   * Gets the active filter
   */
  async getActiveFilter(): Promise<FilterType> {
    if (await this.isAllFilterActive()) {
      return 'All';
    } else if (await this.isActiveFilterActive()) {
      return 'Active';
    } else if (await this.isCompletedFilterActive()) {
      return 'Completed';
    }

    return 'All'; // По умолчанию
  }

  /**
   * Checks if the specified filter is active
   */
  async isFilterActive(filterType: FilterType): Promise<boolean> {
    switch (filterType) {
      case 'All':
        return await this.isAllFilterActive();
      case 'Active':
        return await this.isActiveFilterActive();
      case 'Completed':
        return await this.isCompletedFilterActive();
    }
  }

  /**
   * Checks if all filters are visible
   */
  async areAllFiltersVisible(): Promise<boolean> {
    return (
      (await this.allLink.isVisible()) &&
      (await this.activeLink.isVisible()) &&
      (await this.completedLink.isVisible())
    );
  }

  /**
   * Gets the number of items for each filter
   */
  async getFilterCounts(): Promise<{
    all: number;
    active: number;
    completed: number;
  }> {
    // Этот метод может потребовать дополнительной логики в зависимости от реализации
    // В данном случае возвращаем базовые значения
    return {
      all: 0,
      active: 0,
      completed: 0,
    };
  }
}
