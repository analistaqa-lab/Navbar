import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BreadcrumbPage extends BasePage {
  readonly breadcrumb: Locator;
  readonly currentItem: Locator;

  constructor(page: Page) {
    super(page);
    this.breadcrumb = page.getByTestId('breadcrumb');
    this.currentItem = page.getByTestId('breadcrumb-current');
  }

  item(name: string): Locator {
    return this.breadcrumb.getByRole('link', { name });
  }

  async expectStructure(parts: string[]): Promise<void> {
    for (const part of parts.slice(0, -1)) {
      await expect(this.item(part)).toBeVisible();
    }
    await expect(this.currentItem).toContainText(parts[parts.length - 1]);
  }

  async expectCurrentIsNotClickable(): Promise<void> {
    const tag = await this.currentItem.evaluate((el) => el.tagName.toLowerCase());
    expect(tag).not.toBe('a');
  }

  async expectJsonLdBreadcrumb(): Promise<void> {
    const script = this.page.locator('script[type="application/ld+json"]');
    await expect(script).toBeAttached();
    const scripts = await script.allTextContents();
    const hasBreadcrumb = scripts.some((content) => {
      try {
        const parsed = JSON.parse(content);
        return parsed['@type'] === 'BreadcrumbList' || (Array.isArray(parsed) && parsed.some((i) => i['@type'] === 'BreadcrumbList'));
      } catch {
        return false;
      }
    });
    expect(hasBreadcrumb).toBeTruthy();
  }

  async expectMobileVersionNameBehavior(): Promise<void> {
    await expect(this.currentItem).toBeVisible();
    const css = await this.currentItem.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        overflow: s.overflow,
        overflowX: s.overflowX,
        textOverflow: s.textOverflow,
        whiteSpace: s.whiteSpace
      };
    });
    const valid =
      css.textOverflow === 'ellipsis' ||
      css.overflow === 'auto' ||
      css.overflowX === 'auto';
    expect(valid).toBeTruthy();
  }
}
