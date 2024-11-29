import HttpStatus from '../utils/httpStatus.js';

export class UserController {
	service: any;
	constructor(userService) {
		this.service = userService;
	}

	// GET /user/profile
	getUserProfile = async (req, res) => {
		try {
			const userId = req.auth.userId;
			const profile = await this.service.getUserProfile(userId);
			if (!userId) {
				throw new Error('해당 유저 정보를 찾을 수 없습니다.');
			}
			res.status(HttpStatus.SUCCESS).json(profile);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};

	// GET /user/cards
	getUserPhotoCards = async (req, res) => {
		const { page = 1, pageSize = 10, orderBy = 'priceLowest', keyword = '', grade, type } = req.query;
		const userId = req.auth.userId;

		try {
			const card = await this.service.getUserPhotoCards({
				userId,
				page,
				pageSize,
				orderBy,
				keyword: decodeURIComponent(keyword).trim(),
				grade,
				type,
			});
			res.status(HttpStatus.SUCCESS).json(card);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	// GET /user/cards/:cardId
	getPhotoCardDetails = async (req, res) => {
		const userId = req.auth.userId;
		const { cardId } = req.params;

		try {
			const cardDetails = await this.service.getPhotoCardDetails(userId, cardId);
			res.status(HttpStatus.SUCCESS).json(cardDetails);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};

	// GET /user/exchanges/:shopId
	createPhotoCard = async (req, res) => {
		const ownerId = req.auth.userId; // 인증된 사용자 ID (JWT나 세션에서 가져옴)
		const { name, price, grade, quantity, type, description } = req.body;

		// 파일이 없는 경우 오류 반환
		if (!req.file) {
			return res.status(HttpStatus.BAD_REQUEST).json({ error: '이미지를 업로드해야 합니다.' });
		}

		// 파일 크기 초과 오류 처리
		if (req.fileValidationError) {
			return res.status(HttpStatus.BAD_REQUEST).json({ error: req.fileValidationError });
		}

		// type 유효성 검사 및 파싱
		try {
			let parsedType;

			// type이 배열로 직접 들어오면 그대로 사용
			if (Array.isArray(type)) {
				parsedType = type;
			} else {
				// JSON 문자열로 들어오면 JSON 파싱
				try {
					parsedType = JSON.parse(type);
				} catch (error) {
					return res.status(HttpStatus.BAD_REQUEST).json({
						error: 'type 필드는 배열 형식으로 입력되어야 합니다.',
					});
				}
			}

			// type이 배열인지, 1개 이상 2개 이하인지 체크
			if (!Array.isArray(parsedType) || parsedType.length < 1 || parsedType.length > 2) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					error: 'type 필드는 최소 1가지, 최대 2가지를 선택해야 합니다.',
				});
			}

			const imageUrl = req.file.location; // S3에서 업로드된 이미지 URL 가져오기

			// 카드 생성
			const card = await this.service.createPhotoCard({
				ownerId, // ownerId를 카드 생성에 포함시킴
				name,
				price: parseInt(price, 10),
				grade,
				quantity: parseInt(quantity, 10),
				type: parsedType,
				description,
				image: imageUrl,
			});

			// 카드 생성 완료 후 응답
			res.status(HttpStatus.CREATED).json(card);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
    
	// GET /user/my-cards/sales
	getMyCardsOnSale = async (req, res) => {
		const userId = req.auth.userId;
		const { page = 1, pageSize = 12, keyword = '', grade, type, available, mode } = req.query;

		const myCards = await this.service.getMyCardsOnSale({
			userId: userId,
			page,
			pageSize,
			keyword: decodeURIComponent(keyword).trim(),
			grade,
			type,
			available: available === 'true' ? true : available === 'false' ? false : undefined,
			mode,
		});
		res.status(HttpStatus.SUCCESS).json(myCards);
	};
}
