import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('http://localhost:3003/api/faq/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      res.status(response.status).json(errorData);
    }
  } catch (error) {
    console.error('Error forwarding FAQ request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 