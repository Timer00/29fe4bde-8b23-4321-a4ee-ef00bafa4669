import { type NextApiRequest, type NextApiResponse } from 'next';
import { fetchCountries } from "@/services/countries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const countries = await fetchCountries();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default handler;
