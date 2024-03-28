const apiBaseUrl = "https://swapi.py4e.com/api/" as const;

export const apiCall = async (endpoint: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
