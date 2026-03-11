import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { env } from './env';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  currentStoryId = env.storyId;
  currentUfSource: 'geo' | 'ip' | 'default' | '' = '';

  constructor(options: IWorldOptions) {
    super(options);
  }

  async startBrowser(isMobile = false): Promise<void> {
    this.browser = await chromium.launch({ headless: env.headless });
    this.context = await this.browser.newContext({
      viewport: isMobile
        ? { width: env.mobileViewportWidth, height: env.mobileViewportHeight }
        : { width: env.viewportWidth, height: env.viewportHeight }
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    await this.page?.close().catch(() => undefined);
    await this.context?.close().catch(() => undefined);
    await this.browser?.close().catch(() => undefined);
  }
}

setWorldConstructor(CustomWorld);
