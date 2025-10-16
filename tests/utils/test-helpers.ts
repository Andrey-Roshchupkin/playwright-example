import { Page, expect } from '@playwright/test';
import { generateDefaultTodos } from '../data/generators';

/**
 * Общие хелперы для тестов Todo приложения
 */

/**
 * Создает стандартные todo элементы для тестов
 */
export async function createDefaultTodos(page: Page): Promise<void> {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const defaultTodos = generateDefaultTodos();

  for (const item of defaultTodos) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

/**
 * Создает определенное количество todo элементов
 */
export async function createTodos(
  page: Page,
  count: number,
  items?: string[]
): Promise<void> {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const todoItems = items || generateDefaultTodos().slice(0, count);

  for (const item of todoItems) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

/**
 * Добавляет один todo элемент
 */
export async function addTodoItem(page: Page, text: string): Promise<void> {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill(text);
  await newTodo.press('Enter');
}

/**
 * Получает все todo элементы на странице
 */
export async function getAllTodoItems(page: Page) {
  return page.getByTestId('todo-item');
}

/**
 * Получает todo элемент по индексу
 */
export async function getTodoItemByIndex(page: Page, index: number) {
  return page.getByTestId('todo-item').nth(index);
}

/**
 * Получает заголовки всех todo элементов
 */
export async function getTodoTitles(page: Page): Promise<string[]> {
  const todoItems = await getAllTodoItems(page);
  const count = await todoItems.count();
  const titles: string[] = [];

  for (let i = 0; i < count; i++) {
    const title = await todoItems
      .nth(i)
      .getByTestId('todo-title')
      .textContent();
    if (title) titles.push(title);
  }

  return titles;
}

/**
 * Проверяет, что todo элемент имеет определенный класс
 */
export async function expectTodoItemToHaveClass(
  page: Page,
  index: number,
  expectedClass: string
): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await expect(todoItem).toHaveClass(expectedClass);
}

/**
 * Проверяет, что все todo элементы имеют определенные классы
 */
export async function expectAllTodoItemsToHaveClasses(
  page: Page,
  expectedClasses: string[]
): Promise<void> {
  const todoItems = await getAllTodoItems(page);
  await expect(todoItems).toHaveClass(expectedClasses);
}

/**
 * Отмечает todo элемент как завершенный
 */
export async function markTodoAsCompleted(
  page: Page,
  index: number
): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await todoItem.getByRole('checkbox').check();
}

/**
 * Снимает отметку о завершении с todo элемента
 */
export async function markTodoAsIncomplete(
  page: Page,
  index: number
): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await todoItem.getByRole('checkbox').uncheck();
}

/**
 * Редактирует todo элемент
 */
export async function editTodoItem(
  page: Page,
  index: number,
  newText: string
): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await todoItem.dblclick();
  await todoItem.getByRole('textbox', { name: 'Edit' }).fill(newText);
  await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
}

/**
 * Отменяет редактирование todo элемента
 */
export async function cancelEditTodoItem(
  page: Page,
  index: number
): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await todoItem.getByRole('textbox', { name: 'Edit' }).press('Escape');
}

/**
 * Удаляет todo элемент (через редактирование с пустым текстом)
 */
export async function deleteTodoItem(page: Page, index: number): Promise<void> {
  const todoItem = await getTodoItemByIndex(page, index);
  await todoItem.dblclick();
  await todoItem.getByRole('textbox', { name: 'Edit' }).fill('');
  await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
}

/**
 * Получает счетчик todo элементов
 */
export async function getTodoCount(page: Page) {
  return page.getByTestId('todo-count');
}

/**
 * Проверяет текст счетчика todo элементов
 */
export async function expectTodoCountToBe(
  page: Page,
  expectedText: string
): Promise<void> {
  const todoCount = await getTodoCount(page);
  await expect(todoCount).toHaveText(expectedText);
}

/**
 * Проверяет, что счетчик содержит определенное число
 */
export async function expectTodoCountToContain(
  page: Page,
  expectedNumber: number
): Promise<void> {
  const todoCount = await getTodoCount(page);
  await expect(todoCount).toContainText(expectedNumber.toString());
}
