import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3.js';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.AWS_S3_BUCKET_NAME,
		acl: 'public-read', // 공개 읽기 설정
		key: (req, file, cb) => {
			const uniqueSuffix = Date.now().toString();
			cb(null, `cards/${uniqueSuffix}_${file.originalname}`);
		},
		// 파일 업로드 시 Content-Type과 Content-Disposition 설정
		metadata: (req, file, cb) => {
			cb(null, { 'Content-Type': file.mimetype, 'Content-Disposition': 'inline' }); // 'inline' 설정
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
	fileFilter: (req, file, cb) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!allowedTypes.includes(file.mimetype)) {
			return cb(new Error('이미지 파일만 업로드 가능합니다.'));
		}
		cb(null, true);
	},
});

export default upload;
