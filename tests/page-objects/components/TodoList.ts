import { Locator, Page } from '@playwright/test';
import { BaseElement } from '../base/BaseElement';
import { TodoItem } from './TodoItem';
import { BaseList } from '../base/BaseList';

/**
 * Component for working with todo item lists
 */
export class TodoList extends BaseElement {
  private todoItems: BaseList;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.todoItems = new BaseList(this.locator.getByTestId('todo-item'), page);
  }

  /**
   * Gets the number of todo items
   */
  async getItemCount(): Promise<number> {
    return await this.todoItems.getItemCount();
  }

  /**
   * Gets a todo item by index
   */
  async getItemByIndex(index: number): Promise<TodoItem> {
    const itemLocator = await this.todoItems.getItemByIndex(index);
    return new TodoItem(itemLocator, this.page);
  }

  /**
   * Gets all todo items
   */
  async getAllItems(): Promise<TodoItem[]> {
    const count = await this.getItemCount();
    const items: TodoItem[] = [];

    for (let i = 0; i < count; i++) {
      items.push(await this.getItemByIndex(i));
    }

    return items;
  }

  /**
   * Gets titles of all todo items
   */
  async getAllTitles(): Promise<string[]> {
    const items = await this.getAllItems();
    const titles: string[] = [];

    for (const item of items) {
      titles.push(await item.getTitle());
    }

    return titles;
  }

  /**
   * Gets a todo item by title
   */
  async getItemByTitle(title: string): Promise<TodoItem | null> {
    const items = await this.getAllItems();

    for (const item of items) {
      if ((await item.getTitle()) === title) {
        return item;
      }
    }

    return null;
  }

  /**
   * Checks if the list contains specific titles
   */
  async hasTitles(expectedTitles: string[]): Promise<boolean> {
    const actualTitles = await this.getAllTitles();
    return (
      JSON.stringify(actualTitles.sort()) ===
      JSON.stringify(expectedTitles.sort())
    );
  }

  /**
   * Gets all completed todo items
   */
  async getCompletedItems(): Promise<TodoItem[]> {
    const items = await this.getAllItems();
    const completedItems: TodoItem[] = [];

    for (const item of items) {
      if (await item.isCompleted()) {
        completedItems.push(item);
      }
    }

    return completedItems;
  }

  /**
   * Gets all incomplete todo items
   */
  async getActiveItems(): Promise<TodoItem[]> {
    const items = await this.getAllItems();
    const activeItems: TodoItem[] = [];

    for (const item of items) {
      if (!(await item.isCompleted())) {
        activeItems.push(item);
      }
    }

    return activeItems;
  }

  /**
   * Marks all items as completed
   */
  async markAllAsCompleted(): Promise<void> {
    const items = await this.getAllItems();

    for (const item of items) {
      if (!(await item.isCompleted())) {
        await item.markAsCompleted();
      }
    }
  }

  /**
   * Removes completion marks from all items
   */
  async markAllAsIncomplete(): Promise<void> {
    const items = await this.getAllItems();

    for (const item of items) {
      if (await item.isCompleted()) {
        await item.markAsIncomplete();
      }
    }
  }

  /**
   * Deletes all completed items
   */
  async deleteCompletedItems(): Promise<void> {
    const completedItems = await this.getCompletedItems();

    for (const item of completedItems) {
      await item.delete();
    }
  }

  /**
   * Checks if the list is empty
   */
  async isEmpty(): Promise<boolean> {
    return await this.todoItems.isEmpty();
  }

  /**
   * Gets the number of completed items
   */
  async getCompletedCount(): Promise<number> {
    const completedItems = await this.getCompletedItems();
    return completedItems.length;
  }

  /**
   * Gets the number of active items
   */
  async getActiveCount(): Promise<number> {
    const activeItems = await this.getActiveItems();
    return activeItems.length;
  }
}
