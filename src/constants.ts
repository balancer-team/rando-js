export const BASE_58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
export const BASE_64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
export const BASE_64_URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
export const BASE_32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
export const BASE_32_CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
export const HEX = '0123456789abcdef'
export const NUMBERS = '0123456789'
export const ACE = 'weruoaszxcvnm'

// Maps the base of an alphabet to practical limits, supporting at least the year 3000
export const SORTABLE_DEFAULTS: {
  [key: number]: {
    length: number
    timestamp: number
    year: number
  }
} = {
  2: { length: 45, timestamp: 35184372088832, year: 3084 },
  3: { length: 29, timestamp: 68630377364883, year: 4144 },
  4: { length: 23, timestamp: 70368744177664, year: 4199 },
  5: { length: 20, timestamp: 95367431640625, year: 4992 },
  6: { length: 18, timestamp: 101559956668416, year: 5188 },
  7: { length: 16, timestamp: 33232930569601, year: 3023 },
  8: { length: 15, timestamp: 35184372088832, year: 3084 },
  9: { length: 15, timestamp: 205891132094649, year: 8494 },
  10: { length: 14, timestamp: 100000000000000, year: 5138 },
  11: { length: 13, timestamp: 34522712143931, year: 3063 },
  12: { length: 13, timestamp: 106993205379072, year: 5360 },
  13: { length: 13, timestamp: 302875106592253, year: 11567 },
  14: { length: 12, timestamp: 56693912375296, year: 3766 },
  15: { length: 12, timestamp: 129746337890625, year: 6081 },
  16: { length: 12, timestamp: 281474976710656, year: 10889 },
  17: { length: 11, timestamp: 34271896307633, year: 3056 },
  18: { length: 11, timestamp: 64268410079232, year: 4006 },
  19: { length: 11, timestamp: 116490258898219, year: 5661 },
  20: { length: 11, timestamp: 204800000000000, year: 8459 },
  21: { length: 11, timestamp: 350277500542221, year: 13069 },
  22: { length: 11, timestamp: 584318301411328, year: 20486 },
  23: { length: 10, timestamp: 41426511213649, year: 3282 },
  24: { length: 10, timestamp: 63403380965376, year: 3979 },
  25: { length: 10, timestamp: 95367431640625, year: 4992 },
  26: { length: 10, timestamp: 141167095653376, year: 6443 },
  27: { length: 10, timestamp: 205891132094649, year: 8494 },
  28: { length: 10, timestamp: 296196766695424, year: 11356 },
  29: { length: 10, timestamp: 420707233300201, year: 15301 },
  30: { length: 10, timestamp: 590490000000000, year: 20681 },
  31: { length: 10, timestamp: 819628286980801, year: 27942 },
  32: { length: 9, timestamp: 35184372088832, year: 3084 },
  33: { length: 9, timestamp: 46411484401953, year: 3440 },
  34: { length: 9, timestamp: 60716992766464, year: 3894 },
  35: { length: 9, timestamp: 78815638671875, year: 4467 },
  36: { length: 9, timestamp: 101559956668416, year: 5188 },
  37: { length: 9, timestamp: 129961739795077, year: 6088 },
  38: { length: 9, timestamp: 165216101262848, year: 7205 },
  39: { length: 9, timestamp: 208728361158759, year: 8584 },
  40: { length: 9, timestamp: 262144000000000, year: 10277 },
  41: { length: 9, timestamp: 327381934393961, year: 12344 },
  42: { length: 9, timestamp: 406671383849472, year: 14856 },
  43: { length: 9, timestamp: 502592611936843, year: 17896 },
  44: { length: 9, timestamp: 618121839509504, year: 21557 },
  45: { length: 9, timestamp: 756680642578125, year: 25948 },
  46: { length: 9, timestamp: 922190162669056, year: 31193 },
  47: { length: 9, timestamp: 1119130473102767, year: 37433 },
  48: { length: 9, timestamp: 1352605460594688, year: 44832 },
  49: { length: 8, timestamp: 33232930569601, year: 3023 },
  50: { length: 8, timestamp: 39062500000000, year: 3207 },
  51: { length: 8, timestamp: 45767944570401, year: 3420 },
  52: { length: 8, timestamp: 53459728531456, year: 3664 },
  53: { length: 8, timestamp: 62259690411361, year: 3942 },
  54: { length: 8, timestamp: 72301961339136, year: 4261 },
  55: { length: 8, timestamp: 83733937890625, year: 4623 },
  56: { length: 8, timestamp: 96717311574016, year: 5034 },
  57: { length: 8, timestamp: 111429157112001, year: 5501 },
  58: { length: 8, timestamp: 128063081718016, year: 6028 },
  59: { length: 8, timestamp: 146830437604321, year: 6622 },
  60: { length: 8, timestamp: 167961600000000, year: 7292 },
  61: { length: 8, timestamp: 191707312997281, year: 8044 },
  62: { length: 8, timestamp: 218340105584896, year: 8888 },
  63: { length: 8, timestamp: 248155780267521, year: 9833 },
  64: { length: 8, timestamp: 281474976710656, year: 10889 },
}
