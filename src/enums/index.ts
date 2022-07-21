export enum ShippingPartner {
  GHTK = 'ghtk',
  GHN = 'ghn',
  VIETTELPOST = 'viettelpost',
  OTHER = 'other',
}

export enum GHTK_API {
  Create_Order = '/services/shipment/order',
  Calculate_Fee = '/services/shipment/fee',
  Order_Status = '/services/shipment/v2',
  // Token = '01f9963DAD63e890F1Dc8d1B16324857e08C56E3',
}

export enum GHN_API {
  Create_Store = '/shiip/public-api/v2/shop/register',
  Get_Store = '/shiip/public-api/v2/shop/all',
  Create_Order = '/shiip/public-api/v2/shipping-order/create',
  Update_Order = '/shiip/public-api/v2/shipping-order/update',
  Cancel_Order = '/shiip/public-api/v2/switch-status/cancel',
  Calculate_Fee = '/shiip/public-api/v2/shipping-order/fee',
  Order_Detail = '/shiip/public-api/v2/shipping-order/detail',
  // Token = '9d41b133-359c-11ec-b514-aeb9e8b0c5e3',
}

export enum VIETTELPOST_API {
  Login = '/v2/user/Login',
  Create_Order = '/v2/order/createOrder',
  Create_Store = '/v2/user/registerInventory',
  Calculate_Fee = '/v2/order/getPrice',
  Order_Detail = '',
  // Token = '',
}

export enum OrderStatus {
  CREATED = 'created', //Đã đặt hàng
  CONFIRMED = 'confirmed', //Đã xác nhận
  PROCESSING = 'processing', //Đang xử lý
  PENDING = 'pending', //Chờ thanh toán
  ONHOLD = 'onhold', //Tạm giữ
  COMPLETED = 'completed', //Đã hoàn thành
  CANCELLED = 'cancelled', //Đã huỷ
  MERCHANT_CANCELLED = 'merchant_cancelled', //Đối tác huỷ
  REFUNDED = 'refunded', //Đã hoàn lại tiền
  FAILED = 'failed', //Thất bại
  SHIPPING = 'shipping', //Đang giao
  SHIPPED = 'shipped', //Đã giao, chờ đối soát
  READY_TO_PICK = 'ready_to_pick', //Tiếp nhận đơn hàng
  PICKING = 'picking', //Lấy hàng
  RETURNED = 'return', // Hoàn hàng
}

export enum OrderShippingStatus {
  READY_TO_PICK = 'ready_to_pick', //Chờ giao/lấy hàng
  FAIL = 'fail', //Thất bại
  SHIPPING = 'shipping', //Đang giao
  SHIPPED = 'shipped', //Đã giao, chờ đối soát,Chờ thu COD
  RETURNED = 'return', // Hoàn hàng
  COMPLETED = 'completed', //Đã hoàn thành
  CANCELLED = 'cancelled', //Huỷ giao hàng
}

export enum OrderPaymentType {
  COD = 'cod',
  BACS = 'bacs',
}

export enum OrderPaymentStatus {
  CONFIRM_DEPOSIT = 'confirm_deposit',
  DEPOSITED = 'deposited',
}

export enum WalletType {
  CONSUMPTION = 'consumption', //Ví tiêu dùng
  BONUS = 'bonus', //Ví thưởng
}

export enum TransactionStatus {
  CREATED = 'created', //Đã tạo giao dịch
  COMPLETED = 'completed', //Đã hoàn thành
  CANCELLED = 'cancelled', //Đã huỷ
}

export enum TransactionType {
  DEPOSIT = 'deposit', //Nạp
  WITHDRAWAL = 'withdrawal', //Rút
  BONUS = 'bonus', //Ví thưởng
  CONSUMPTION = 'consumption', //Ví tiêu dùng
}

// Thông điệp thông báo lỗi
export enum ErrorMessage {
  UPDATE = `Có lỗi xảy ra trong quá trình cập nhật, xin vui lòng thử lại!`,
  CATEGORY_ALREADY_EXISTS = `Tên hoặc Mã Danh mục đã tồn tại`,
  WAREHOUSE_ALREADY_EXISTS = `Tên hoặc Mã kho đã tồn tại`,
  MERCHANT_ALREADY_EXISTS = `Tên hoặc Mã NCC đã tồn tại`,
}

export enum ActiveStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}
