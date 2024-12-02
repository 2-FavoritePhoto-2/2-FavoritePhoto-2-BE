import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

const Grade = s.enums(['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY']);
const Uuid = s.define('Uuid', value => isUuid.v4(value));
const non_negative = s.refine(s.number(), 'non-negative', value => value >= 0);

// User Struct
const UserStruct = s.object({
  id: Uuid,
  email: s.define('Email', value => typeof value === 'string' && isEmail(value) && value.length <= 500),
  nickname: s.refine(s.string(), 'nickname', value => value.length >= 3 && value.length <= 20),
  password: s.refine(s.string(), 'password', value => value.length >= 8 && value.length <= 15),
  point: non_negative,
  refreshToken: s.optional(s.string()),
});

// Card Struct
const CardStruct = s.object({
  name: s.string(),
  price: non_negative,
  grade: Grade,
  type: s.array(s.string()),
  description: s.optional(s.refine(s.string(), 'description', value => value.length <= 500)),
  quantity: non_negative,
  image: s.string(),
});

// Shop Struct
const BaseShopStruct = s.object({
  price: non_negative,
  totalQuantity: non_negative,
  remainingQuantity: non_negative,
  available: s.boolean(),
  exchangeGrade: Grade,
  exchangeType: s.string(),
  exchangeDetails: s.refine(s.string(), 'details', value => value.length <= 500),
});

// 객체의 전체 상태를 검증하는 추가 구조체
const ShopStruct = s.refine(BaseShopStruct, 'available_logic', value =>
  value.remainingQuantity === 0 ? !value.available : true,
);

// Purchase Struct
const PurchaseStruct = s.object({
  quantity: non_negative,
  totalPrice: non_negative,
});

// Exchange Struct
const ExchangeStruct = s.object({
  description: s.size(s.string(), 1, 500),
  buyerCardId: Uuid,
});

export { UserStruct, CardStruct, ShopStruct, PurchaseStruct, ExchangeStruct };
