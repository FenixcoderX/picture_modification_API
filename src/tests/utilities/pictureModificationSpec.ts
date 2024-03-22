import pictureModification from '../../utilities/pictureModification';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

describe('pictureModificationResize should resize an original picture according to specified values', () => {
  beforeAll(async () => {
    await pictureModification.pictureModificationResize('bridge', 200, 200);
  });

  it('should make a new resized picture', () => {
    const pictureExists = fs.existsSync(
      `${__dirname}/../../../assets/thumb/bridge-200x200.jpg`,
    );
    fsPromises.unlink(
      `${__dirname}/../../../assets/thumb/bridge-200x200.jpg`,
    );
    expect(pictureExists).toBeTrue();
  });
});
