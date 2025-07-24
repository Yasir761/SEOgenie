
export function getWordPressAuthToken(username: string, appPassword: string): string {
  const credentials = `${username}:${appPassword}`;
  const encoded = Buffer.from(credentials).toString("base64");
  return `Basic ${encoded}`;
}
