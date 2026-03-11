import { After, Before, BeforeStep, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { attachment, description, epic, feature, story } from 'allure-js-commons';
import { CustomWorld } from '../utils/world';

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const isMobile = scenario.pickle.tags.some((tag) => tag.name === '@mobile');
  await this.startBrowser(isMobile);
  feature('MH-183');
  epic('Navbar e Breadcrumb');
  story(scenario.pickle.name);
  description(scenario.pickle.name);
});

BeforeStep(async function () {
  // reservado para logs/allure steps futuros
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await attachment('evidencia-falha', screenshot, 'image/png');
  }
  await this.closeBrowser();
});
