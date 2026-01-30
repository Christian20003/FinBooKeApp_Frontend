/**
 * This function builds the full API URL by combining the API-URL with the endpoint.
 * @param api The API-URL.
 * @param endpoint The endpoint path.
 * @returns The full URL.
 */
export function buildApiUrl(api: string, endpoint: string): string {
  return `${api}${endpoint}`;
}
