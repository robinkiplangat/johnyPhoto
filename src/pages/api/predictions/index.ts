import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return res.status(response.status).json(data);
} 