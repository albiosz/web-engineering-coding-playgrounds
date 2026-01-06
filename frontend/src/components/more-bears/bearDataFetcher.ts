export { fetchBearData };

export type BearData = {
  name: string;
  binomial: string;
  image: string;
  range: string;
};

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const fetchBearData = async (): Promise<BearData[]> => {
  let response: Response | null = null;
  try {
    response = await fetch(`${baseUrl}/api/bears`);
  } catch (error) {
    console.error(
      `Error fetching bear data from backend: ${baseUrl}/api/bears, error: ${error}`
    );
    
    return [];
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: BearData[] = await response.json();
  return data;
};
