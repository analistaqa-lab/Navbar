import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Variável de ambiente ausente: ${name}`);
  return value;
}

export const env = {
  baseUrl: required('BASE_URL', 'http://127.0.0.1:6006'),
  iframePath: required('STORYBOOK_IFRAME_PATH', '/iframe.html'),
  storyId: required('STORY_ID', 'components-navbar--default'),
  storyWithChildrenId: required('STORY_WITH_CHILDREN_ID', 'components-navbar--with-children'),
  headless: (process.env.HEADLESS ?? 'true') === 'true',
  viewportWidth: Number(process.env.VIEWPORT_WIDTH ?? 1440),
  viewportHeight: Number(process.env.VIEWPORT_HEIGHT ?? 900),
  mobileViewportWidth: Number(process.env.MOBILE_VIEWPORT_WIDTH ?? 390),
  mobileViewportHeight: Number(process.env.MOBILE_VIEWPORT_HEIGHT ?? 844),
  loginB2BUrl: required('LOGIN_B2B_URL', 'https://b2b.autoavaliar.com.br/'),
  geoUf: required('GEO_UF', 'GO'),
  ipUf: required('IP_UF', 'RJ'),
  defaultUf: required('DEFAULT_UF', 'SP')
};
