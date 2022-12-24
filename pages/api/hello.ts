// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    responseLimit: '50mb',
  },
}

const request = require("request");

export default (req: NextApiRequest,
  res: NextApiResponse<string>) => {
  // path to file
  const filePath = req.query.filename;     

  // filename only
  const fileName = req.query.name+'.mp4';

  // set header
  res.setHeader("content-disposition", "attachment; filename=" + fileName);

  // send request to the original file
  request
    .get(filePath) // download original image
    .pipe(res); // pipe converted image to HTTP response
};