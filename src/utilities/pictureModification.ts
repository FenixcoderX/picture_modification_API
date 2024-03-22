import sharp from 'sharp';

const pictureModificationResize = async (
  pictureName: string,
  width: number,
  height: number,
): Promise<void> => {
  const imgOriginal = `${__dirname}/../../assets/original/${pictureName}.jpg`;
  const imgResized = `${__dirname}/../../assets/thumb/${pictureName}-${width}x${height}.jpg`;

  try {
    await sharp(imgOriginal).resize({ width, height }).toFile(imgResized);
    console.log('The picture has now been created!');
  } catch (error) {
    console.log('Wrong input parameters ::', error);
  }
};

export default { pictureModificationResize };
