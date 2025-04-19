/**
 * Represents a search result item.
 */
export interface SearchResultItem {
  /**
   * The title of the search result.
   */
title: string;
  /**
   * The link to the search result.
   */
  link: string;
  /**
   * The snippet of the search result.
   */
snippet: string;
}

/**
 * Asynchronously retrieves search results for a given query.
 *
 * @param query The search query.
 * @returns A promise that resolves to an array of SearchResultItem objects.
 */
export async function getSearchResults(query: string): Promise<SearchResultItem[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      title: 'Sample Search Result 1',
      link: 'https://example.com/result1',
      snippet: 'This is a sample search result snippet.',
    },
    {
      title: 'Sample Search Result 2',
      link: 'https://example.com/result2',
      snippet: 'This is another sample search result snippet.',
    },
  ];
}
