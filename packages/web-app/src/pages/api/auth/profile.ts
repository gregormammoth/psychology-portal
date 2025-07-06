import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const response = await axios.get('http://13.60.225.240:3003/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
} 