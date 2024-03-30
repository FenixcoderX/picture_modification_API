import sharp from 'sharp'; // library that allows to resize images

/**
 * Resizes a picture to the specified width and height and saves it to the disk.
 *
 * @param {string} pictureName - The name of the picture to be resized.
 * @param {number} width - The desired width of the resized picture.
 * @param {number} height - The desired height of the resized picture.
 */
const pictureModificationResize = async (pictureName: string, width: number, height: number): Promise<void> => {
  // Define the paths to the original and resized pictures
  const imgOriginal = `${__dirname}/../../assets/original/${pictureName}.jpg`;
  const imgResized = `${__dirname}/../../assets/thumb/${pictureName}-${width}x${height}.jpg`;

  try {
    // resize the original picture to the specified width and height and save it to the disk
    await sharp(imgOriginal).resize({ width, height }).toFile(imgResized);
    console.log('The picture has now been created!');
  } catch (error) {
    console.log('Wrong input parameters ::', error);
  }
};

export default { pictureModificationResize };
