import { type NextApiRequest, type NextApiResponse } from 'next';
import { type Country } from "@/interfaces/countries";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get('https://retoolapi.dev/TkEl3I/countriesdata');
    const data = response.data as Country[];
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default handler;
