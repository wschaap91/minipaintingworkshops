const API_URL = '/api/events';

async function fetchEvents(): Promise<any> {
  const bearerToken = import.meta.env.VITE_API_BEARER_TOKEN;

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
// Log the response for debugging
console.log('Response status:', response.status);
console.log('Response headers:', response.headers);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
}

export { fetchEvents};
