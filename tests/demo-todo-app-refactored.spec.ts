import { test, expect } from '@playwright/test';
import { TodoPage } from './page-objects/pages/TodoPage';
import {
  generateDefaultTodos,
  generateEditText,
  generateTextWithSpaces,
} from './data/generators';
import {
  checkNumberOfTodosInLocalStorage,
  checkNumberOfCompletedTodosInLocalStorage,
  checkTodosInLocalStorage,
} from './utils/localStorage';

test.beforeEach(async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();
});

const TODO_ITEMS = generateDefaultTodos();

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Create 1st todo.
    await todoPage.addTodo(TODO_ITEMS[0]);

    // Make sure the list only has one todo item.
    const todoList = todoPage.getTodoList();
    await expect(todoList.getItemByIndex(0)).resolves.toBeDefined();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await todoPage.addTodo(TODO_ITEMS[1]);

    // Make sure the list now has two todo items.
    const updatedTitles = await todoList.getAllTitles();
    expect(updatedTitles).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test('should clear text input field when an item is added', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);

    // Create one todo item.
    await todoPage.addTodo(TODO_ITEMS[0]);

    // Check that input is empty.
    expect(await todoPage.isNewTodoInputEmpty()).toBe(true);
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test('should append new items to the bottom of the list', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);

    // Create 3 items.
    await todoPage.addTodos(TODO_ITEMS);

    // create a todo count locator

    // Check test using different methods.
    await expect(todoPage.getTodoCountTextLocator()).toBeVisible();
    await expect(todoPage.getTodoCountText()).resolves.toBe('3 items left');
    expect(await todoPage.todoCountContains(3)).toBe(true);
    await expect(todoPage.getTodoCountLocator()).toHaveText(/3/);

    // Check all items in one call.
    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodos(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test.afterEach(async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Complete all todos.
    await todoPage.markAllAsCompleted();

    // Ensure all todos have 'completed' class.
    const todoList = todoPage.getTodoList();
    const allItems = await todoList.getAllItems();

    for (const item of allItems) {
      expect(await item.isCompleted()).toBe(true);
    }

    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  });

  test('should allow me to clear the complete state of all items', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);

    // Check and then immediately uncheck.
    await todoPage.markAllAsCompleted();
    await todoPage.markAllAsIncomplete();

    // Should be no completed classes.
    const todoList = todoPage.getTodoList();
    const allItems = await todoList.getAllItems();

    for (const item of allItems) {
      expect(await item.isCompleted()).toBe(false);
    }
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);

    await todoPage.markAllAsCompleted();
    expect(await todoPage.isToggleAllChecked()).toBe(true);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Uncheck first todo.
    const firstTodo = await todoPage.getTodoItem(0);
    await firstTodo.markAsIncomplete();

    // Reuse toggleAll locator and make sure its not checked.
    expect(await todoPage.isToggleAllChecked()).toBe(false);

    await firstTodo.markAsCompleted();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Assert the toggle all is checked again.
    expect(await todoPage.isToggleAllChecked()).toBe(true);
  });
});

test.describe('Item', () => {
  test('should allow me to mark items as complete', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Create two items.
    await todoPage.addTodos(TODO_ITEMS.slice(0, 2));

    // Check first item.
    const firstTodo = await todoPage.getTodoItem(0);
    await firstTodo.markAsCompleted();
    expect(await firstTodo.isCompleted()).toBe(true);

    // Check second item.
    const secondTodo = await todoPage.getTodoItem(1);
    expect(await secondTodo.isCompleted()).toBe(false);
    await secondTodo.markAsCompleted();

    // Assert completed class.
    expect(await firstTodo.isCompleted()).toBe(true);
    expect(await secondTodo.isCompleted()).toBe(true);
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Create two items.
    await todoPage.addTodos(TODO_ITEMS.slice(0, 2));

    const firstTodo = await todoPage.getTodoItem(0);
    const secondTodo = await todoPage.getTodoItem(1);

    await firstTodo.markAsCompleted();
    expect(await firstTodo.isCompleted()).toBe(true);
    expect(await secondTodo.isCompleted()).toBe(false);
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodo.markAsIncomplete();
    expect(await firstTodo.isCompleted()).toBe(false);
    expect(await secondTodo.isCompleted()).toBe(false);
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });

  test('should allow me to edit an item', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodos(TODO_ITEMS);

    const secondTodo = await todoPage.getTodoItem(1);
    const editText = generateEditText();

    await secondTodo.editText(editText);

    // Explicitly assert the new text value.
    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], editText, TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, editText);
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodos(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should hide other controls when editing', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(1);

    await todoItem.startEditing();
    expect(await todoItem.isCheckboxVisible()).toBe(false);
    expect(await todoItem.isTitleVisible()).toBe(false);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should save edits on blur', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(1);
    const editText = generateEditText();

    await todoItem.saveEditingOnBlur(editText);

    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], editText, TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, editText);
  });

  test('should trim entered text', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(1);
    const editText = generateEditText();
    const textWithSpaces = generateTextWithSpaces(editText);

    await todoItem.editText(textWithSpaces);

    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], editText, TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, editText);
  });

  test('should remove the item if an empty text string was entered', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(1);

    await todoItem.delete();

    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should cancel edits on escape', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(1);
    const editText = generateEditText();

    await todoItem.startEditing();
    await todoItem.editInputField.fill(editText);
    await todoItem.cancelEditing();

    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual(TODO_ITEMS);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo(TODO_ITEMS[0]);
    expect(await todoPage.todoCountContains(1)).toBe(true);

    await todoPage.addTodo(TODO_ITEMS[1]);
    expect(await todoPage.todoCountContains(2)).toBe(true);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodos(TODO_ITEMS);
  });

  test('should display the correct text', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const firstTodo = await todoPage.getTodoItem(0);

    await firstTodo.markAsCompleted();
    expect(await todoPage.isClearCompletedButtonVisible()).toBe(true);
  });

  test('should remove completed items when clicked', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const secondTodo = await todoPage.getTodoItem(1);

    await secondTodo.markAsCompleted();
    await todoPage.clearCompleted();

    const todoList = todoPage.getTodoList();
    expect(await todoList.getItemCount()).toBe(2);
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page);
    const firstTodo = await todoPage.getTodoItem(0);

    await firstTodo.markAsCompleted();
    await todoPage.clearCompleted();
    expect(await todoPage.isClearCompletedButtonHidden()).toBe(true);
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodos(TODO_ITEMS.slice(0, 2));

    const firstTodo = await todoPage.getTodoItem(0);
    await firstTodo.markAsCompleted();

    const todoList = todoPage.getTodoList();
    const titles = await todoList.getAllTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]]);
    expect(await firstTodo.isCheckboxChecked()).toBe(true);
    expect(await firstTodo.isCompleted()).toBe(true);
    const secondTodo = await todoPage.getTodoItem(1);
    expect(await secondTodo.isCompleted()).toBe(false);

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Now reload.
    await todoPage.reload();

    const reloadedTodoList = todoPage.getTodoList();
    const reloadedTitles = await reloadedTodoList.getAllTitles();
    expect(reloadedTitles).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]]);

    const reloadedFirstTodo = await todoPage.getTodoItem(0);
    expect(await reloadedFirstTodo.isCheckboxChecked()).toBe(true);
    expect(await reloadedFirstTodo.isCompleted()).toBe(true);
    const reloadedSecondTodo = await todoPage.getTodoItem(1);
    expect(await reloadedSecondTodo.isCompleted()).toBe(false);
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodos(TODO_ITEMS);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const secondTodo = await todoPage.getTodoItem(1);

    await secondTodo.markAsCompleted();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await todoPage.showActiveTodos();

    const visibleTodoItems = todoPage.getVisibleTodoItemsLocator();
    await expect(visibleTodoItems).toHaveCount(2);
    await expect(visibleTodoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const secondTodo = await todoPage.getTodoItem(1);

    await secondTodo.markAsCompleted();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step('Showing all items', async () => {
      await todoPage.showAllTodos();
      const visibleTodoItems = todoPage.getVisibleTodoItemsLocator();
      await expect(visibleTodoItems).toHaveCount(3);
    });

    await test.step('Showing active items', async () => {
      await todoPage.showActiveTodos();
    });

    await test.step('Showing completed items', async () => {
      await todoPage.showCompletedTodos();
    });

    const visibleTodoItems = todoPage.getVisibleTodoItemsLocator();
    await expect(visibleTodoItems).toHaveCount(1);

    await todoPage.goBack();
    await expect(visibleTodoItems).toHaveCount(2);

    await todoPage.goBack();
    await expect(visibleTodoItems).toHaveCount(3);
  });

  test('should allow me to display completed items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const secondTodo = await todoPage.getTodoItem(1);

    await secondTodo.markAsCompleted();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await todoPage.showCompletedTodos();

    const visibleTodoItems = todoPage.getVisibleTodoItemsLocator();
    await expect(visibleTodoItems).toHaveCount(1);
  });

  test('should allow me to display all items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const secondTodo = await todoPage.getTodoItem(1);

    await secondTodo.markAsCompleted();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await todoPage.showActiveTodos();
    await todoPage.showCompletedTodos();
    await todoPage.showAllTodos();

    const visibleTodoItems = todoPage.getVisibleTodoItemsLocator();
    await expect(visibleTodoItems).toHaveCount(3);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.getAllFilterLocator()).toHaveClass('selected');

    //create locators for active and completed links
    const activeLink = todoPage.getActiveFilterLocator();
    const completedLink = todoPage.getCompletedFilterLocator();
    await activeLink.click();

    // Page change - active items.
    await expect(activeLink).toHaveClass('selected');
    await completedLink.click();

    // Page change - completed items.
    await expect(completedLink).toHaveClass('selected');
  });
});
