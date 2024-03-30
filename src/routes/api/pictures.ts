import express from 'express';
import pictureModification from './../../utilities/pictureModification';
import middleware from './../../utilities/middleware';

// Create a new express router object
const pictures = express.Router();

// Define a GET route for the /api/pictures path
pictures.get(
  '/',
  
  // Middleware functions to be executed before the route handler
  middleware.requestControl, // Check if the request is valid
  middleware.resizedPictureExistence, // Check if the resized picture exists

  // Route handler function that will be executed when the route is matched
  async (req, res) => {
    try {
      // Get the filename, width, and height from the query string
      const filename = req.query.filename as string;
      const width = Number(req.query.width);
      const height = Number(req.query.height);

      console.log(filename, width, height);

      //Example: http://localhost:3000/api/pictures?filename=bridge&width=500&height=500

      // Call the function to resize the picture and save it to the disk
      await pictureModification.pictureModificationResize(filename, width, height);

      // Send the resized picture as a response to the client
      res.send(`<img src="/assets/thumb/${filename}-${width}x${height}.jpg" />`);
    } catch (error) {
      console.log('error to GET pictures', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },
);

export default pictures;
