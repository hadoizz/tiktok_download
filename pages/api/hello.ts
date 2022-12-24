// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


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
    .on("error", function(err) {
      res.writeHead(404, { "Content-Type": "application/octet-stream" });
      res.write("<h1>404 not found</h1>");
      res.end();
      return;
    })
    .pipe(res); // pipe converted image to HTTP response
};