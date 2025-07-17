// Generates Basic Auth token
export function getWordPressAuthToken(username: string, appPassword: string) {
  return "Basic " + btoa(`${username}:${appPassword}`);
}
