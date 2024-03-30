// This file contains the middleware functions that are used in the routes

import express from 'express';
import fs from 'fs';

/**
 * Validates the request parameters
 *
 * @param {express.Request} req - object, used to access the data sent by the client in the request (the URL, headers, and query parameters)
 * @param {express.Response} res - object, used to send the response back to the client
 * @param {express.NextFunction} next - object, used to pass control to the next middleware function
 */
const requestControl = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Extracting the filename, width, and height from the query parameters
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // if any of the parameters is missing, return a message to the client to provide all the parameters
  if (!filename || !width || !height) {
    res.status(400).send(`<h2>Incorrect request: filename, width, height are needed as parameters</h2>
      <p>You should use the following example path:</p> 
      <h3>http://localhost:3000/api/pictures?filename=bridge&width=200&height=200</h3>
      <p>In this app you can change parameters in the path above: filename, width, heigth.</p>
      <p>The list of pictures is provided. Use the following filenames:</p>
        <li>bridge</li>
        <li>sunset</li>
      <p>Input width and height dimensions in amount of pixels you want to resize.</p>`);
  }
  // if the picture with the given filename does not exist in fs, return a 404 status code
  else if (!fs.existsSync(`${__dirname}/../../assets/original/${filename}.jpg`)) {
    res.status(404).send('<h3>Picture with this name does not exist</h3>');
  }
  // if all the parameters are correct, pass control to the next middleware function
  else {
    next();
  }
};

/**
 * Checks if the resized picture exists
 *
 * @param {express.Request} req - object, used to access the data sent by the client in the request (the URL, headers, and query parameters)
 * @param {express.Response} res - object, used to send the response back to the client
 * @param {express.NextFunction} next - object, used to pass control to the next middleware function
 */
const resizedPictureExistence = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extracting the filename, width, and height from the query parameters
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // if the resized picture does not exist, pass control to the next middleware function, if there is no more middleware functions, pass control to the route handler function
    if (!fs.existsSync(`${__dirname}/../../assets/thumb/${filename}-${width}x${height}.jpg`)) {
      next();
    }
    // if the resized picture exists, send it as a response to the client
    else {
      res.send(`<img src="/assets/thumb/${filename}-${width}x${height}.jpg" />`);
      console.log('The picture exists and has not been recreated');
    }
  } catch (error) {
    console.log('Error in resizedPictureExistence function', error);
    res.status(500).send('Internal Server Error');
  }
};

export default { requestControl, resizedPictureExistence };
