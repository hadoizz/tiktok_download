// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/*

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
*/

type Data = {
  name: string
}

export const config = {
  api: {
    responseLimit: false,
  },
}

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pip = promisify(stream.pipeline);

const handler = async (req: NextApiRequest,
  res: NextApiResponse<string>) => {
  const url = req.query.filename;
  const name = req.query.name;
  const response = await fetch(<string>url); // replace this with your API call & options
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename='+name+'.mp4');
  await pip(response.body, res);
};

export default handler;