import { waitForSeconds } from "@/utils/waitForSeconds";

// Will either fetch customer data, territory data, or throw error (for testing)
export async function mockFetchFunction(sqlQuery: string): Promise<string> {
  await waitForSeconds(0.2);
  // Randomly choose to error
  const randomNumber = Math.random();
  if (randomNumber < 0.2) {
    throw new Error("Simulated network error");
  }

  let url = "/mockData/customers.csv";
  if (sqlQuery.length % 2 === 0) {
    url = "/mockData/territories.csv";
  }

  // Fetch results from mock files
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: Status ${response.status}.`);
  }
  return await response.text();
}
