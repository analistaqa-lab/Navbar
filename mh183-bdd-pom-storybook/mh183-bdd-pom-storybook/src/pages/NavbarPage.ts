import { expect, Locator, Page } from '@playwright/test';
import { env } from '../utils/env';
import { storyUrl } from '../utils/storybook-url';
import { BasePage } from './BasePage';

export class NavbarPage extends BasePage {
  readonly navbar: Locator;
  readonly logoLink: Locator;
  readonly drawerToggle: Locator;
  readonly drawer: Locator;
  readonly ctaLogin: Locator;
  readonly ufField: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = page.getByTestId('navbar');
    this.logoLink = page.getByTestId('navbar-logo-link');
    this.drawerToggle = page.getByTestId('navbar-drawer-toggle');
    this.drawer = page.getByTestId('navbar-drawer');
    this.ctaLogin = page.getByTestId('navbar-cta-login');
    this.ufField = page.getByTestId('uf-field');
  }

  async openDefaultStory(): Promise<void> {
    await this.page.goto(storyUrl(env.storyId));
  }

  async openWithChildrenStory(): Promise<void> {
    await this.page.goto(storyUrl(env.storyWithChildrenId));
  }

  menuItem(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  dropdownToggle(name: string): Locator {
    return this.page.getByTestId(`navbar-dropdown-toggle-${this.slug(name)}`);
  }

  dropdownPanel(name: string): Locator {
    return this.page.getByTestId(`navbar-dropdown-panel-${this.slug(name)}`);
  }

  mobileItem(name: string): Locator {
    return this.drawer.getByRole('link', { name });
  }

  async expectSticky(): Promise<void> {
    await this.expectVisible(this.navbar);
    const position = await this.navbar.evaluate((el) => getComputedStyle(el).position);
    expect(['sticky', 'fixed']).toContain(position);
  }

  async expectLogoRedirectsHome(): Promise<void> {
    await expect(this.logoLink).toHaveAttribute('href', /\/$|home/i);
  }

  async expectCtaLogin(): Promise<void> {
    await expect(this.ctaLogin).toBeVisible();
    await expect(this.ctaLogin).toHaveAttribute('href', env.loginB2BUrl);
  }

  async openDropdown(name: string): Promise<void> {
    await this.dropdownToggle(name).click();
    await expect(this.dropdownPanel(name)).toBeVisible();
  }

  async openMobileDrawer(): Promise<void> {
    await this.drawerToggle.click();
    await expect(this.drawer).toBeVisible();
  }

  async mockGeolocationSuccess(uf: string): Promise<void> {
    await this.page.addInitScript((ufMock) => {
      const mockPosition = {
        coords: {
          latitude: -16.6869,
          longitude: -49.2648,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: Date.now()
      };
      Object.defineProperty(window.navigator, 'geolocation', {
        configurable: true,
        value: {
          getCurrentPosition: (success: PositionCallback) => success(mockPosition as GeolocationPosition)
        }
      });
      (window as any).__UF_GEO__ = ufMock;
    }, uf);
  }

  async mockGeolocationFailAndIpSuccess(uf: string): Promise<void> {
    await this.page.addInitScript((ufMock) => {
      Object.defineProperty(window.navigator, 'geolocation', {
        configurable: true,
        value: {
          getCurrentPosition: (_success: PositionCallback, error?: PositionErrorCallback) =>
            error?.({ code: 1, message: 'denied', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as any)
        }
      });
      (window as any).fetch = async (input: RequestInfo | URL) => {
        const href = String(input);
        if (href.includes('/geo/ip')) {
          return new Response(JSON.stringify({ uf: ufMock }), { status: 200 });
        }
        return new Response('{}', { status: 200 });
      };
    }, uf);
  }

  async mockAllLocationFail(defaultUf: string): Promise<void> {
    await this.page.addInitScript((ufMock) => {
      Object.defineProperty(window.navigator, 'geolocation', {
        configurable: true,
        value: {
          getCurrentPosition: (_success: PositionCallback, error?: PositionErrorCallback) =>
            error?.({ code: 2, message: 'unavailable', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as any)
        }
      });
      (window as any).fetch = async () => new Response('{}', { status: 500 });
      (window as any).__UF_DEFAULT__ = ufMock;
    }, defaultUf);
  }

  private slug(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
  }
}
