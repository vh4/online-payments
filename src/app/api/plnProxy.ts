// src/pages/api/plnProxy.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://c-dev-api.rajabiller.com/api_partnerlink.php';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.post(API_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(data);
  } catch (error:any) {
    console.error('Error calling PLN API:', error);
    res.status(error.response?.status || 500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
