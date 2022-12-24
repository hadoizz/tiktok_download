// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const filePath = req.query.filename;     

  // filename only
  const fileName = req.query.name+'.mp4';
  
  res.status(200).json({ name: filePath })
}
