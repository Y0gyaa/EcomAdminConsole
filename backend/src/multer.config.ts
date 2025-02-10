import * as multer from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = join(__dirname, '..', 'uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});
