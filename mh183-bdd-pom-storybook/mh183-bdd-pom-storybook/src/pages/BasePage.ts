import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  locatorByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectContainsText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }
}
