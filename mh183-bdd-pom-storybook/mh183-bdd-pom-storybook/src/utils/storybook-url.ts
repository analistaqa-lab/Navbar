import { env } from './env';

export function storyUrl(id: string): string {
  return `${env.baseUrl}${env.iframePath}?id=${id}`;
}
