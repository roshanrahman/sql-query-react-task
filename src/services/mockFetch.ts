import { waitForSeconds } from "@/utils/waitForSeconds";

// Will either fetch customer data, territory data, or throw error (for testing)
export async function mockFetchFunction(sqlQuery: string): Promise<string> {
  await waitForSeconds(0.2);
  // Randomly choose to error
  const randomNumber = Math.random();
  if (randomNumber < 0.01) {
    throw new Error("Mock Fetch: Simulated network error");
  }

  let url = "/mockData/customers.csv";
  if (sqlQuery.length % 2 === 0) {
    url = "/mockData/territories.csv";
  }

  // Fetch results from mock files
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network Error ${url}: Status ${response.status}.`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Network Error ${url}: ${(error as Error).message}`);
  }
}
