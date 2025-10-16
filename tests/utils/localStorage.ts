import { Page } from '@playwright/test';

/**
 * Утилиты для работы с localStorage в Todo приложении
 */

export interface TodoStorageItem {
  title: string;
  completed: boolean;
  id: string;
}

/**
 * Проверяет количество todo элементов в localStorage
 */
export async function checkNumberOfTodosInLocalStorage(
  page: Page,
  expected: number
): Promise<void> {
  await page.waitForFunction((e) => {
    const todos = JSON.parse(localStorage['react-todos'] || '[]');
    return todos.length === e;
  }, expected);
}

/**
 * Проверяет количество завершенных todo элементов в localStorage
 */
export async function checkNumberOfCompletedTodosInLocalStorage(
  page: Page,
  expected: number
): Promise<void> {
  await page.waitForFunction((e) => {
    const todos = JSON.parse(localStorage['react-todos'] || '[]');
    const completedTodos = todos.filter(
      (todo: TodoStorageItem) => todo.completed
    );
    return completedTodos.length === e;
  }, expected);
}

/**
 * Проверяет наличие todo элемента с определенным заголовком в localStorage
 */
export async function checkTodosInLocalStorage(
  page: Page,
  title: string
): Promise<void> {
  await page.waitForFunction((t) => {
    const todos = JSON.parse(localStorage['react-todos'] || '[]');
    return todos.some((todo: TodoStorageItem) => todo.title === t);
  }, title);
}

/**
 * Получает все todo элементы из localStorage
 */
export async function getTodosFromLocalStorage(
  page: Page
): Promise<TodoStorageItem[]> {
  return await page.evaluate(() => {
    return JSON.parse(localStorage['react-todos'] || '[]');
  });
}

/**
 * Очищает localStorage от todo элементов
 */
export async function clearTodosFromLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem('react-todos');
  });
}

/**
 * Устанавливает todo элементы в localStorage
 */
export async function setTodosInLocalStorage(
  page: Page,
  todos: TodoStorageItem[]
): Promise<void> {
  await page.evaluate((todosData) => {
    localStorage['react-todos'] = JSON.stringify(todosData);
  }, todos);
}

/**
 * Проверяет, что localStorage пуст
 */
export async function checkLocalStorageIsEmpty(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const todos = JSON.parse(localStorage['react-todos'] || '[]');
    return todos.length === 0;
  });
}
