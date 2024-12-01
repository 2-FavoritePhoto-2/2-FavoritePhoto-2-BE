import HttpStatus from '../utils/httpStatus.js';

export class UserController {
  service: any;
  constructor(userService) {
    this.service = userService;
  }

  // GET /user/profile
  getUserProfile = async (req, res) => {
    const userId = req.auth.userId;
    const profile = await this.service.getUserProfile(userId);
    if (!userId) {
      throw new Error('해당 유저 정보를 찾을 수 없습니다.');
    }
    res.status(HttpStatus.SUCCESS).json(profile);
  };

  // GET /user/cards
  getUserPhotoCards = async (req, res) => {
    const { page = 1, pageSize = 10, orderBy = 'priceLowest', keyword = '', grade, type } = req.query;
    const userId = req.auth.userId;

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
  };

  // GET /user/cards/:cardId
  getPhotoCardDetails = async (req, res) => {
    const userId = req.auth.userId;
    const { cardId } = req.params;

    const cardDetails = await this.service.getPhotoCardDetails(userId, cardId);
    res.status(HttpStatus.SUCCESS).json(cardDetails);
  };

  // GET /user/exchanges/:shopId
  getExchangesByShopId = async (req, res) => {
    const userId = req.auth.userId;
    const { shopId } = req.params;

    const exchanges = await this.service.getExchangesByShopId(shopId, userId);
    res.status(HttpStatus.SUCCESS).json(exchanges);
  };

  // POST /user/cards
  createPhotoCard = async (req, res) => {
    const ownerId = req.auth.userId;
    const { name, price, grade, quantity, type, description } = req.body;

    if (!req.file) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: '이미지를 업로드해야 합니다.' });
    }

    if (req.fileValidationError) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: req.fileValidationError });
    }

    let parsedType;

    if (Array.isArray(type)) {
      parsedType = type;
    } else {
      try {
        parsedType = JSON.parse(type);
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: 'type 필드는 배열 형식으로 입력되어야 합니다.',
        });
      }
    }

    if (!Array.isArray(parsedType) || parsedType.length < 1 || parsedType.length > 2) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'type 필드는 최소 1가지, 최대 2가지를 선택해야 합니다.',
      });
    }

    const imageUrl = req.file.location;

    const card = await this.service.createPhotoCard({
      ownerId,
      name,
      price: parseInt(price, 10),
      grade,
      quantity: parseInt(quantity, 10),
      type: parsedType,
      description,
      image: imageUrl,
    });
    res.status(HttpStatus.CREATED).json(card);
  };

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
