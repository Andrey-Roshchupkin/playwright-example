/**
 * Генераторы тестовых данных для Todo приложения
 */

export interface TodoItem {
  title: string;
  completed?: boolean;
}

/**
 * Генерирует случайный текст для todo элемента
 */
export function generateRandomTodoText(): string {
  const actions = [
    'buy',
    'sell',
    'find',
    'create',
    'update',
    'delete',
    'check',
    'review',
    'organize',
    'clean',
    'fix',
    'build',
    'learn',
    'practice',
    'study',
  ];

  const objects = [
    'some cheese',
    'the cat',
    'a doctors appointment',
    'groceries',
    'a new book',
    'the house',
    'the car',
    'the garden',
    'the kitchen',
    'the documents',
    'the project',
    'the presentation',
    'the report',
    'the website',
    'the application',
    'the database',
    'the server',
  ];

  const action = actions[Math.floor(Math.random() * actions.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];

  return `${action} ${object}`;
}

/**
 * Генерирует массив todo элементов
 */
export function generateTodoItems(count: number): string[] {
  const items: string[] = [];
  const usedTexts = new Set<string>();

  while (items.length < count) {
    const text = generateRandomTodoText();
    if (!usedTexts.has(text)) {
      usedTexts.add(text);
      items.push(text);
    }
  }

  return items;
}

/**
 * Генерирует предопределенные todo элементы для тестов
 */
export function generateDefaultTodos(): string[] {
  return ['buy some cheese', 'feed the cat', 'book a doctors appointment'];
}

/**
 * Генерирует todo элемент с определенными параметрами
 */
export function generateTodoItem(
  title?: string,
  completed: boolean = false
): TodoItem {
  return {
    title: title || generateRandomTodoText(),
    completed,
  };
}

/**
 * Генерирует массив todo объектов
 */
export function generateTodoObjects(
  count: number,
  completedRatio: number = 0
): TodoItem[] {
  const items = generateTodoItems(count);
  return items.map((title, index) => ({
    title,
    completed: index < Math.floor(count * completedRatio),
  }));
}

/**
 * Генерирует случайное количество todo элементов (от 1 до 10)
 */
export function generateRandomTodoCount(): number {
  return Math.floor(Math.random() * 10) + 1;
}

/**
 * Генерирует todo элемент для редактирования
 */
export function generateEditText(): string {
  const editTexts = [
    'buy some sausages',
    'feed the dog',
    'book a dentist appointment',
    'clean the house',
    'fix the computer',
  ];

  return editTexts[Math.floor(Math.random() * editTexts.length)];
}

/**
 * Генерирует текст с пробелами для тестирования trim функциональности
 */
export function generateTextWithSpaces(text: string): string {
  const spaces = '    ';
  return `${spaces}${text}${spaces}`;
}
