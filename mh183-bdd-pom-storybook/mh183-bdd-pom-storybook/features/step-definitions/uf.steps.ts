import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NavbarPage } from '../../src/pages/NavbarPage';
import { env } from '../../src/utils/env';
import { CustomWorld } from '../../src/utils/world';

Given('que a geolocalização retorna uma UF válida', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  this.currentUfSource = 'geo';
  await navbarPage.mockGeolocationSuccess(env.geoUf);
});

Given('que a geolocalização falha e o serviço de IP retorna uma UF válida', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  this.currentUfSource = 'ip';
  await navbarPage.mockGeolocationFailAndIpSuccess(env.ipUf);
});

Given('que a geolocalização falha e o serviço de IP também falha', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  this.currentUfSource = 'default';
  await navbarPage.mockAllLocationFail(env.defaultUf);
});

When('eu acessar a story default da Navbar', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await navbarPage.openDefaultStory();
});

Then('o campo UF deve ser preenchido com a UF da geolocalização', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await expect(navbarPage.ufField).toHaveValue(env.geoUf);
});

Then('o campo UF deve ser preenchido com a UF do IP', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await expect(navbarPage.ufField).toHaveValue(env.ipUf);
});

Then('o campo UF deve ser preenchido com a UF padrão', async function (this: CustomWorld) {
  const navbarPage = new NavbarPage(this.page);
  await expect(navbarPage.ufField).toHaveValue(env.defaultUf);
});
