import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;

  // pathがstring型かstring[]型かを確認
  const joinedPath = Array.isArray(path) ? path.join('/') : path;

  const url = `http://localhost:8080/movies/${joinedPath}`;

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
}
