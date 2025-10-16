import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { TodoList } from '../components/TodoList';
import { TodoFilter } from '../components/TodoFilter';
import { TodoItem } from '../components/TodoItem';
import { BaseInput } from '../base/BaseInput';
import { BaseCheckbox } from '../base/BaseCheckbox';
import { BaseButton } from '../base/BaseButton';
import { BaseCounter } from '../base/BaseCounter';

/**
 * Main page of the Todo application
 */
export class TodoPage extends BasePage {
  // Main page elements
  private newTodoInput: BaseInput;
  private toggleAllCheckbox: BaseCheckbox;
  private todoList: TodoList;
  private todoFilter: TodoFilter;
  private clearCompletedButton: BaseButton;
  private todoCount: BaseCounter;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = new BaseInput(
      this.page.getByPlaceholder('What needs to be done?'),
      page
    );
    this.toggleAllCheckbox = new BaseCheckbox(
      this.page.getByLabel('Mark all as complete'),
      page
    );
    this.todoList = new TodoList(this.page.locator('.todo-list'), this.page);
    this.todoFilter = new TodoFilter(this.page.locator('.filters'), this.page);
    this.clearCompletedButton = new BaseButton(
      this.page.getByRole('button', {
        name: 'Clear completed',
      }),
      page
    );
    this.todoCount = new BaseCounter(this.page.getByTestId('todo-count'), page);
  }

  /**
   * Navigates to the Todo application page
   */
  async goto(): Promise<void> {
    await this.page.goto('/todomvc');
  }

  /**
   * Adds a new todo item
   */
  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Adds multiple todo items
   */
  async addTodos(texts: string[]): Promise<void> {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  /**
   * Gets the input field for new todo
   */
  getNewTodoInput(): BaseInput {
    return this.newTodoInput;
  }

  /**
   * Checks if the input field is empty
   */
  async isNewTodoInputEmpty(): Promise<boolean> {
    const value = await this.newTodoInput.getValue();
    return value === '';
  }

  /**
   * Gets the todo list component
   */
  getTodoList(): TodoList {
    return this.todoList;
  }

  /**
   * Gets the filter component
   */
  getTodoFilter(): TodoFilter {
    return this.todoFilter;
  }

  /**
   * Gets a todo item by index
   */
  async getTodoItem(index: number): Promise<TodoItem> {
    return await this.todoList.getItemByIndex(index);
  }

  /**
   * Gets all todo items
   */
  async getAllTodoItems(): Promise<TodoItem[]> {
    return await this.todoList.getAllItems();
  }

  /**
   * Gets titles of all todo items
   */
  async getAllTodoTitles(): Promise<string[]> {
    return await this.todoList.getAllTitles();
  }

  /**
   * Marks all todo items as completed
   */
  async markAllAsCompleted(): Promise<void> {
    await this.toggleAllCheckbox.check();
  }

  /**
   * Removes completion marks from all todo items
   */
  async markAllAsIncomplete(): Promise<void> {
    await this.toggleAllCheckbox.uncheck();
  }

  /**
   * Checks if "Mark all as complete" checkbox is checked
   */
  async isToggleAllChecked(): Promise<boolean> {
    return await this.toggleAllCheckbox.isChecked();
  }

  /**
   * Gets the number of todo items
   */
  async getTodoCount(): Promise<number> {
    return await this.todoList.getItemCount();
  }

  /**
   * Gets the text of the todo counter
   */
  async getTodoCountText(): Promise<string> {
    return await this.todoCount.getText();
  }

  /**
   * Checks if the counter contains a specific number
   */
  async todoCountContains(number: number): Promise<boolean> {
    return await this.todoCount.containsNumber(number);
  }

  /**
   * Gets the todo counter locator for regex assertions
   */
  getTodoCountLocator(): Locator {
    return this.todoCount.getLocator();
  }

  /**
   * Shows all todo items
   */
  async showAllTodos(): Promise<void> {
    await this.todoFilter.showAll();
  }

  /**
   * Shows only active todo items
   */
  async showActiveTodos(): Promise<void> {
    await this.todoFilter.showActive();
  }

  /**
   * Shows only completed todo items
   */
  async showCompletedTodos(): Promise<void> {
    await this.todoFilter.showCompleted();
  }

  /**
   * Sets the filter for todo items
   */
  async setFilter(filterType: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.todoFilter.setFilter(filterType);
  }

  /**
   * Gets the active filter
   */
  async getActiveFilter(): Promise<'All' | 'Active' | 'Completed'> {
    return await this.todoFilter.getActiveFilter();
  }

  /**
   * Clears all completed todo items
   */
  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  /**
   * Checks if "Clear completed" button is visible
   */
  async isClearCompletedButtonVisible(): Promise<boolean> {
    return await this.clearCompletedButton.isVisible();
  }

  /**
   * Checks if "Clear completed" button is hidden
   */
  async isClearCompletedButtonHidden(): Promise<boolean> {
    return await this.clearCompletedButton.isHidden();
  }

  /**
   * Gets the number of completed todo items
   */
  async getCompletedCount(): Promise<number> {
    return await this.todoList.getCompletedCount();
  }

  /**
   * Gets the number of active todo items
   */
  async getActiveCount(): Promise<number> {
    return await this.todoList.getActiveCount();
  }

  /**
   * Checks if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.newTodoInput.isVisible();
  }

  /**
   * Waits for the page to load
   */
  async waitForLoad(): Promise<void> {
    await this.newTodoInput.waitForVisible();
  }

  /**
   * Gets locator for all visible todo items (considering filtering)
   */
  getVisibleTodoItemsLocator(): Locator {
    return this.page.getByTestId('todo-item');
  }

  /**
   * Gets locator for counter text
   */
  getTodoCountTextLocator(): Locator {
    return this.page.getByText('3 items left');
  }

  /**
   * Gets locator for "All" filter
   */
  getAllFilterLocator(): Locator {
    return this.page.getByRole('link', { name: 'All' });
  }

  /**
   * Gets locator for "Active" filter
   */
  getActiveFilterLocator(): Locator {
    return this.page.getByRole('link', { name: 'Active' });
  }

  /**
   * Gets locator for "Completed" filter
   */
  getCompletedFilterLocator(): Locator {
    return this.page.getByRole('link', { name: 'Completed' });
  }
}
