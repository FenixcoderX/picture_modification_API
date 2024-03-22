import express from 'express';
import fs from 'fs';

const requestControl = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (!filename || !width || !height) {
    res.status(400)
      .send(`<h2>Incorrect request: filename, width, height are needed as parameters</h2>
      <p>You should use the following example path:</p> 
      <h3>http://localhost:3000/api/pictures?filename=bridge&width=200&height=200</h3>
      <p>In this app you can change parameters in the path above: filename, width, heigth.</p>
      <p>The list of pictures is provided. Use the following filenames:</p>
        <li>bridge</li>
        <li>sunset</li>
      <p>Input width and height dimensions in amount of pixels you want to resize.</p>`);
  } else if (
    !fs.existsSync(`${__dirname}/../../assets/original/${filename}.jpg`)
  ) {
    res.status(404).send('<h3>Picture with this name does not exist</h3>');
  } else {
    // res.locals.filename = filename;
    // res.locals.width = width;
    // res.locals.height = height;
    next();
  }
};

const resizedPictureExistence = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (
    !fs.existsSync(
      `${__dirname}/../../assets/thumb/${filename}-${width}x${height}.jpg`,
    )
  ) {
    next();
  } else {
    res.send(`<img src="/assets/thumb/${filename}-${width}x${height}.jpg" />`);
    console.log('The picture exists and has not been recreated');
  }
};
export default { requestControl, resizedPictureExistence };
