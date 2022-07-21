import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ShippingPartner } from 'enums';

export enum ConfigType {
  // CLIENT - Banner + video
  HOME = 'home', // Banner đầu trang chủ
  MAKE_MONEY = 'make_money', // Kiếm tiền với UShare
  JOIN_COMMUNITY = 'join_community', // Tham gia cộng đồng
  FLASH_DEAL = 'flash_deal', // Deal chớp nhoáng
  TOP_COMMISSION = 'top_commission', // Top hoa hồng
  COMMUNITY = 'community', // Cộng đồng
  GOOD_START = 'good_start', // Khởi đầu thuận lợi
  FREE_COURSE = 'free_course', // Khóa học miễn phí
  CURRENT_OFFERS = 'current_offers', // Ưu đãi hiện có
  FLASH_SALE = 'flash_sale', // Deal chớp nhoáng

  // Bài đăng
  FAQ = 'FAQ', // Câu hỏi và câu trả lời
  BLOG = 'blog', // Blog chia sẻ
  INTRODUCE = 'introduce', // Giới thiệu nhận thưởng

  // CommissionType
  REVENUE = 'revenue', // Theo doanh thu
  REVENUE_QUARTER = 'revenue_quarter', // Doanh thu theo quý
  PRODUCT_QUANTITY = 'product_quantity', // Theo số lượng sản phẩm
  FIRSTORDER = 'first_order', // Đơn hàng đầu tiên
  REGISTER = 'register', // Đăng ký thành công
  AMOUNT_COLLABORATOR = 'amount_collaborator', // Số lượng CTV
  PRODUCT = 'product',

  // Thông tin vận chuyển
  SHIPPING_INFO = 'shipping_info',
  // Thông tin Ngân hàng
  BANK_INFO = 'bank_info',
}

export enum CommissionValueType {
  AMOUNT = 'amount', // Tính theo số lượng
  PERCENT = 'percent', // Tính theo phần trăm
}

export enum ConfigBannerType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class ConfigBanner {
  @ApiProperty({
    description: 'Đường dẫn ảnh',
    type: String,
    required: false,
  })
  image?: string;

  @ApiProperty({
    description:
      'Đường dẫn khi bấm vào Banner. Nếu có giá trị thì mở luôn đường dẫn này',
    type: String,
    required: false,
  })
  url?: string;

  @ApiProperty({
    description: 'Nội dung khi bấm vào Banner',
    type: String,
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: 'Loại',
    enum: ConfigBannerType,
    default: ConfigBannerType.IMAGE,
    required: false,
  })
  type?: ConfigBannerType;
}

export class ShippingInfoApiToken {
  @ApiProperty({
    description: 'Đối tác',
    enum: ShippingPartner,
  })
  partner: ShippingPartner;

  @ApiProperty({
    description: 'Token',
    required: false,
  })
  token?: string;

  @ApiProperty({
    description: 'Shop Ushare ID',
    required: false,
  })
  shopUshareId?: string;

  @ApiProperty({
    description: 'Tên đăng nhập',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'Mật khẩu',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'API Key',
    required: false,
  })
  apiKey?: string;

  @ApiProperty({
    description: 'API Secret',
    required: false,
  })
  apiSecret?: string;

  @ApiProperty({
    description: 'Domain',
    required: false,
  })
  domain?: string;
}

export class BankInfo {
  @ApiProperty({
    description: 'ID Ngân hàng',
    type: Number,
  })
  bankId: number;

  @ApiProperty({
    description: 'Tên Chủ tài khoản',
    type: String,
  })
  bankAccount: string;

  @ApiProperty({
    description: 'Số tài khoản',
    type: String,
  })
  bankNumber: string;

  @ApiProperty({
    description: 'Chi nhánh',
    type: String,
    required: false,
  })
  bankBranch?: string;

  @ApiProperty({
    description: 'Email Kế toán',
    type: [String],
    required: false,
  })
  accountantEmails?: string[];
}

/** Cấu hình giới thiệu */
export class ReferralCommission {
  @ApiProperty({ description: 'Tiền thưởng đăng ký thành công cho F0' })
  f0: number;

  @ApiProperty({ description: 'Tiền thưởng đăng ký thành công cho F1' })
  f1: number;
}

/** Cấu hình chiết khấu phần trăm theo số lượng cộng tác viên */
export class AmountCollaboratorCommission {
  @ApiProperty({ description: 'Số lượng CTV nhỏ nhất' })
  min: number;

  @ApiProperty({ description: 'Số lượng CTV lớn nhất' })
  max: number;

  @ApiProperty({ description: 'Thời gian được áp dụng chiết khấu (tháng)' })
  rangeTime: number;

  @ApiProperty({ description: 'Giá trị chiết khấu' })
  value: number;

  @ApiProperty({ description: 'Loại chiết khấu' })
  valueType: CommissionValueType;
}

/** Cấu hình hoa hồng/thưởng cho đối tác */
export class ConfigMerchantCommission {
  @ApiProperty({ description: 'Danh sách sản phẩm áp dụng' })
  productIds?: string[];

  @ApiProperty({ description: 'Giá trị nhỏ nhất được áp dụng' })
  min?: number;

  @ApiProperty({ description: 'Giá trị lớn nhất được áp dụng' })
  max?: number;

  @ApiProperty({ description: 'Giá trị' })
  value: number;

  @ApiProperty({ description: 'Kiểu giá trị' })
  valueType?: CommissionValueType;
}

@Entity('config')
export class ConfigEntity extends BaseEntity {
  @Column({ nullable: true })
  @ApiProperty({ description: 'Id dùng để lấy cấu hình từ phía đối tác' })
  merchantId?: number;

  @Column({ type: 'enum', enum: ConfigType, nullable: true })
  @ApiProperty({
    description: 'Kiểu cấu hình',
    required: true,
    enum: ConfigType,
  })
  key: ConfigType;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Tên cấu hình', required: false })
  name: string;

  @Column({ nullable: true, type: 'jsonb' })
  @ApiProperty({
    description: 'Các thuộc tính cấu hình',
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(ConfigMerchantCommission) },
      { $ref: getSchemaPath(ConfigBanner) },
      { $ref: getSchemaPath(BankInfo) },
    ],
    type: [ConfigMerchantCommission] || ConfigBanner || BankInfo,
  })
  value: ConfigMerchantCommission[] | ConfigBanner[] | BankInfo | any;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ngày bắt đầu được áp dụng' })
  startDate?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ngày kết thúc áp dụng' })
  endDate?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ghi chú' })
  note: string;
}
