import { Then } from '@cucumber/cucumber';
import { BreadcrumbPage } from '../../src/pages/BreadcrumbPage';
import { CustomWorld } from '../../src/utils/world';

Then('devo visualizar o breadcrumb {string}', async function (this: CustomWorld, chain: string) {
  const breadcrumbPage = new BreadcrumbPage(this.page);
  const parts = chain.split(' > ');
  await breadcrumbPage.expectStructure(parts);
});

Then('o último item do breadcrumb não deve ser clicável', async function (this: CustomWorld) {
  const breadcrumbPage = new BreadcrumbPage(this.page);
  await breadcrumbPage.expectCurrentIsNotClickable();
});

Then('devo encontrar o schema BreadcrumbList em JSON-LD', async function (this: CustomWorld) {
  const breadcrumbPage = new BreadcrumbPage(this.page);
  await breadcrumbPage.expectJsonLdBreadcrumb();
});

Then('o nome longo da versão no breadcrumb deve truncar com reticências ou permitir scroll horizontal', async function (this: CustomWorld) {
  const breadcrumbPage = new BreadcrumbPage(this.page);
  await breadcrumbPage.expectMobileVersionNameBehavior();
});
