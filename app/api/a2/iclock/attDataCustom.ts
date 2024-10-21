import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {sn, table, Stamp} = req.query
    const {data} = req.body

    const serverUrl = 'http://127.0.0.1:8081'
    const url = `${serverUrl}/iclock/attDataCustom?sn=${sn}&table=${table}&Stamp=${Stamp}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      res.status(200).json(result)
    }
    catch (error) {
      console.error('Error:', error)
      res.status(500).json({message: 'Internal server error', error: error.message})
    }
  }
  else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
