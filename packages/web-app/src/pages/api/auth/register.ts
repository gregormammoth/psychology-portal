import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('http://localhost:3003/auth/register', req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.log('error', error)
    res.status(400).json({ message: 'Registration failed' });
  }
} 