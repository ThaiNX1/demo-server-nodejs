import { OrderStatus } from 'enums';

export const capitalizeFirstLetter = (words) => {
  let separateWord = words.toLowerCase().split('-');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join('');
};

export const convertGhtkStatus = (status_id) => {
  let status = null;
  switch (status_id) {
    case 1:
    case 2:
    case 7:
    case 8:
      status = OrderStatus.READY_TO_PICK;
      break;
    case 3:
    case 12:
    case 123:
    case 127:
    case 128:
      status = OrderStatus.PICKING;
      break;
    case 49:
    case 4:
    case 9:
    case 10:
    case 45:
    case 410:
      status = OrderStatus.SHIPPING;
      break;
    case 5:
      status = OrderStatus.SHIPPED;
      break;
    case 6:
    case 11:
      status = OrderStatus.COMPLETED;
      break;
    case -1:
    case 13:
    case 20:
    case 21:
      status = OrderStatus.CANCELLED;
      break;
  }
  return status;
};

export const convertGhnStatus = (status_id) => {
  let status = null;
  switch (status_id) {
    case 'ready_to_pick':
      status = OrderStatus.READY_TO_PICK;
      break;
    case 'picking':
    case 'money_collect_picking':
    case 'picked':
    case 'storing':
    case 'transporting':
    case 'sorting':
      status = OrderStatus.PICKING;
      break;
    case 'delivering':
    case 'money_collect_delivering':
    case 'delivery_fail':
      status = OrderStatus.SHIPPING;
      break;
    case 'delivered':
      status = OrderStatus.SHIPPED;
      break;
    case 'return':
    case 'return_transporting':
    case 'cancel':
    case 'return_sorting':
    case 'returning':
    case 'return_fail':
    case 'waiting_to_return':
    case 'returned':
    case 'exception':
    case 'damage':
    case 'lost':
      status = OrderStatus.CANCELLED;
      break;
  }
  return status;
};

export const eShopBranchId = (provinceId: number) => {
  switch (provinceId) {
    //Miền Bắc
    case 28:
    case 62:
    case 17:
    case 63:
    case 3:
    case 58:
    case 61:
    case 21:
    case 7:
    case 45:
    case 2:
    case 46:
    case 29:
    case 24:
    case 59:
    case 60:
    case 34:
    case 35:
    case 20:
    case 41:
    case 42:
    case 50:
    case 18:
    case 51:
    case 54:
    case 27:
    case 33:
    case 19:
    case 15:
    case 57:
    case 31:
    case 56:
      return '0bc26e3d-bd64-408c-b607-d9c32962a981';
    //Miền Nam
    // case 30:
    // case 55:
    // case 10:
    // case 37:
    // case 25:
    // case 4:
    // case 23:
    // case 13:
    // case 39:
    // case 12:
    // case 11:
    // case 38:
    // case 5:
    // case 47:
    // case 22:
    // case 53:
    // case 1:
    // case 6:
    // case 16:
    // case 49:
    // case 14:
    // case 8:
    // case 43:
    // case 44:
    // case 9:
    // case 36:
    // case 48:
    // case 32:
    // case 26:
    // case 52:
    // case 40:
    default:
      return '81ff00fb-2fb1-4ad0-aebf-dbd96d330653';
  }
};

export const slugify = (string) => {
  const a =
    'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b =
    'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return string
    .toString()
    .toLowerCase()
    .replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi, 'a')
    .replace(/[éèẻẽẹêếềểễệ]/gi, 'e')
    .replace(/[iíìỉĩị]/gi, 'i')
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, 'o')
    .replace(/[úùủũụưứừửữự]/gi, 'u')
    .replace(/[ýỳỷỹỵ]/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const formatCurrency = (value: number): string => {
  if (isNaN(value)) value = 0;
  return Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const convertToDate = (value: string, character: string): Date => {
  try {
    const dates = value.trim().split(' ');
    const _dates = dates?.[0].split(character);
    const _times = dates?.[1].split(':');
    return new Date(
      Number(_dates[2]),
      Number(_dates[1]),
      Number(_dates[0]),
      Number(_times?.[0] || 0),
      Number(_times?.[1] || 0),
      Number(_times?.[2] || 0),
    );
  } catch (e) {
    return null;
  }
};

export const isInvalidDate = (value: Date): boolean => {
  if (value?.toString() === 'Invalid Date') return true;
  return false;
};
