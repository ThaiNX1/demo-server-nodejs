export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  DELETED = 'deleted',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum RoleType {
  ADMIN = 'admin', // Quyền admin
  CUSTOMER = 'customer', // Quyền NCC,
  MEMBER = 'member', // Thành viên,
  LEADER = 'leader', // Quyền Trưởng nhóm
  PARTNER = 'partner', // Quyền CTV
  OTHER = 'other', // Quyền khác
}

export enum ProductStatus {
  ACTIVE = 'active', // Đang kinh doanh
  INACTIVE = 'inactive', // Tạm hết hàng
  STOPPED = 'stopped', // Ngừng kinh doanh
}

export enum ConfigType {
  TOP_SLIDE_BANNER = 'top-slide-banner',
  TOP_RIGHT_BANNER = 'top-right-banner',
  TOP_BOTTOM_BANNER = 'top-bottom-banner',
  COST = 'cost',
}

export enum OrderStatus {
  CREATED = 'created', //Đã đặt hàng
  CONFIRMED = 'confirmed', //Đã xác nhận
  PROCESSING = 'processing', //Đang chuẩn bị hàng
  PICKING = 'picking', //Đang lấy hàng
  SHIPPING = 'shipping', //Đang giao
  SHIPPED = 'shipped', //Đã giao
  COMPLETED = 'completed', //Đã hoàn thành
  CANCELLED = 'cancelled', //Đã huỷ
  MERCHANT_CANCELLED = 'merchant_cancelled', //Đối tác huỷ
  FAILED = 'failed', //Thất bại
  RETURNED = 'return', // Hoàn hàng
}

export enum OrderPaymentType {
  COD = 'cod',
  BACS = 'bacs',
}

export enum WarehouseHistoryType {
  IN = 'in',
  OUT = 'out',
}

export enum AnimalType {
  Cattle = 'cattle',
  Poultry = 'poultry',
  Aquaculture = 'aquaculture',
}
