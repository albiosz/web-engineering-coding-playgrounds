export { fetchBearData };

export type BearData = {
  name: string;
  binomial: string;
  image: string;
  range: string;
};

const baseUrl = 'http://localhost:8080/api';

const fetchBearData = async (): Promise<BearData[]> => {
  let response: Response | null = null;
  try {
    response = await fetch(`${baseUrl}/bears`);
  } catch (error) {
    console.error(
      `Error fetching bear data from backend: ${baseUrl}/bears, error: ${error}`
    );
    
    return [];
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: BearData[] = await response.json();
  return data;
};
