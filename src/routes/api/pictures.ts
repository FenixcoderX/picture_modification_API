import express from 'express';
import pictureModification from './../../utilities/pictureModification';
import middleware from './../../utilities/middleware';

const pictures = express.Router();

pictures.get(
  '/',
  middleware.requestControl,
  middleware.resizedPictureExistence,
  async (req, res) => {
    try {
      //const { filename, width, height } = res.locals;
      const filename = req.query.filename as string;
      const width = Number(req.query.width);
      const height = Number(req.query.height);

      console.log(filename, width, height);
      //http://localhost:3000/api/pictures?filename=bridge&width=500&height=500

      await pictureModification.pictureModificationResize(filename, width, height);
      res.send(
        `<img src="/assets/thumb/${filename}-${width}x${height}.jpg" />`,
      );
    } catch (error) {
      console.log(error);
      //res.status(500).json({
      //message: "Internal server error",
      //});
    }
  },
);

export default pictures;
