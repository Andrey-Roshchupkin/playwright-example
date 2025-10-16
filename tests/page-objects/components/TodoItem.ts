import { Locator, Page } from '@playwright/test';
import { BaseElement } from '../base/BaseElement';
import { BaseCheckbox } from '../base/BaseCheckbox';
import { BaseInput } from '../base/BaseInput';
import { BaseButton } from '../base/BaseButton';
import { BaseLabel } from '../base/BaseLabel';

/**
 * Component for working with individual todo items
 */
export class TodoItem extends BaseElement {
  private checkbox: BaseCheckbox;
  private title: BaseLabel;
  private editInput: BaseInput;
  private deleteButton: BaseButton;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.checkbox = new BaseCheckbox(this.locator.getByRole('checkbox'), page);
    this.title = new BaseLabel(this.locator.getByTestId('todo-title'), page);
    this.editInput = new BaseInput(
      this.locator.getByRole('textbox', { name: 'Edit' }),
      page
    );
    this.deleteButton = new BaseButton(
      this.locator.getByRole('button', { name: 'Delete' }),
      page
    );
  }

  /**
   * Gets the text of the todo item
   */
  async getTitle(): Promise<string> {
    return await this.title.getText();
  }

  /**
   * Checks if the todo item is completed
   */
  async isCompleted(): Promise<boolean> {
    return await this.hasClass('completed');
  }

  /**
   * Marks the todo item as completed
   */
  async markAsCompleted(): Promise<void> {
    await this.checkbox.check();
  }

  /**
   * Removes the completion mark
   */
  async markAsIncomplete(): Promise<void> {
    await this.checkbox.uncheck();
  }

  /**
   * Toggles the completion state
   */
  async toggleCompletion(): Promise<void> {
    if (await this.isCompleted()) {
      await this.markAsIncomplete();
    } else {
      await this.markAsCompleted();
    }
  }

  /**
   * Starts editing the todo item
   */
  async startEditing(): Promise<void> {
    await this.doubleClick();
  }

  /**
   * Edits the text of the todo item
   */
  async editText(newText: string): Promise<void> {
    await this.startEditing();
    await this.editInput.fill(newText);
    await this.editInput.press('Enter');
  }

  /**
   * Cancels editing
   */
  async cancelEditing(): Promise<void> {
    if (await this.isEditing()) {
      await this.editInput.press('Escape');
    }
  }

  /**
   * Saves editing on blur
   */
  async saveEditingOnBlur(newText: string): Promise<void> {
    await this.startEditing();
    await this.editInput.fill(newText);
    await this.editInput.blur();
  }

  /**
   * Deletes the todo item (via editing with empty text)
   */
  async delete(): Promise<void> {
    await this.startEditing();
    await this.editInput.fill('');
    await this.editInput.press('Enter');
  }

  /**
   * Gets the value of the edit field
   */
  async getEditValue(): Promise<string> {
    return await this.editInput.getValue();
  }

  /**
   * Checks if the edit field is visible
   */
  async isEditing(): Promise<boolean> {
    return await this.editInput.isVisible();
  }

  /**
   * Checks if the checkbox is visible
   */
  async isCheckboxVisible(): Promise<boolean> {
    return await this.checkbox.isVisible();
  }

  /**
   * Checks if the title is visible
   */
  async isTitleVisible(): Promise<boolean> {
    return await this.title.isVisible();
  }

  /**
   * Checks if the delete button is visible
   */
  async isDeleteButtonVisible(): Promise<boolean> {
    return await this.deleteButton.isVisible();
  }

  /**
   * Clicks the delete button
   */
  async clickDelete(): Promise<void> {
    await this.deleteButton.click();
  }

  /**
   * Checks if the checkbox is checked
   */
  async isCheckboxChecked(): Promise<boolean> {
    return await this.checkbox.isChecked();
  }

  /**
   * Gets the edit field
   */
  get editInputField(): BaseInput {
    return this.editInput;
  }
}
