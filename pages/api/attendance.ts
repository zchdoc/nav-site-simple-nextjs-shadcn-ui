import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userNo, timeStart, timeEnd, openId, userVerifyNumber } = req.query;

    const apiUrl = `https://a2.4000063966.com:8443/xb/zk/attendance/record.do?userNo=${userNo}&timeStart=${timeStart}&timeEnd=${timeEnd}&openId=${openId}&userVerifyNumber=${userVerifyNumber}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: 'Failed to fetch attendance records' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}