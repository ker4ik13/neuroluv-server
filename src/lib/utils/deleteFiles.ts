import * as fs from 'fs';
import * as path from 'path';

export const deleteFiles = (
  photos: string[],
  type: 'photo' | 'cover' = 'photo',
) => {
  photos.map((photo) => {
    fs.unlink(path.join(__dirname, `../../../../${type}s/${photo}`), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.debug(`Файл ${photo} удалён`);
      }
    });
  });
};
