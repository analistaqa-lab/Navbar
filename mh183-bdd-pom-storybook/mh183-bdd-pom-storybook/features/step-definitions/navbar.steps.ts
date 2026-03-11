import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NavbarPage } from '../../src/pages/NavbarPage';
import { CustomWorld } from '../../src/utils/world';

Given('que acesso a story default da Navbar', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.openDefaultStory();
});

Given('que acesso a story with children da Navbar', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.openWithChildrenStory();
});

Then('a navbar deve permanecer sticky no topo', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.expectSticky();
});

Then('a logo deve apontar para a Home', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.expectLogoRedirectsHome();
});

Then('devo visualizar os links {string}, {string}, {string}, {string} e {string}', async function (
  this: CustomWorld,
  link1: string,
  link2: string,
  link3: string,
  link4: string,
  link5: string
) {
  const navbarPage = new NavbarPage(this.page);
  for (const link of [link1, link2, link3, link4, link5]) {
    await expect(navbarPage.menuItem(link)).toBeVisible();
  }
});

When('eu abrir o dropdown {string}', async function (this: CustomWorld, dropdownName: string) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.openDropdown(dropdownName);
});

Then('devo visualizar os links de soluções', async function (this: CustomWorld) {
  const expectedLinks = [
    'App Auto Avaliar',
    'Auto Bid',
    'Auto Pay',
    'Auto Sync',
    'Car Damage',
    'Car Invest',
    'Dinamika',
    'Lista de Desejos',
    'Marketplace B2B',
    'MAQ360 Auto Avaliar e Sotreq',
    'Gerenciador de Anúncios Usbi',
    'Tabela Auto Avaliar',
    'White Label'
  ];
  for (const link of expectedLinks) {
    await expect(this.page.getByRole('link', { name: link })).toBeVisible();
  }
});

Then('devo visualizar os links de países', async function (this: CustomWorld) {
  const expectedLinks = ['Argentina', 'México', 'Equador', 'Portugal', 'English', 'Español'];
  for (const link of expectedLinks) {
    await expect(this.page.getByRole('link', { name: link })).toBeVisible();
  }
});

Then('devo visualizar o CTA {string}', async function (this: CustomWorld, _buttonText: string) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.expectCtaLogin();
});

When('eu abrir o menu hambúrguer', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.openMobileDrawer();
});

Then('devo visualizar os links principais no drawer mobile', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  for (const link of ['Quem Somos', 'Para Quem', 'Blog', 'Contato', 'Cadastre-se']) {
    await expect(navbarPage.mobileItem(link)).toBeVisible();
  }
});
