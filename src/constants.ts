/**
 * Constants
 */

export const PASSWORD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%^&+-*/=(){}[]~|:;<>,._'
export const BASE_64_URL = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
export const BASE_58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
export const CLEAN = '123456789ABCDEFGHJKLMNPQRSTVWXYZ'
export const HEX = '0123456789abcdef'
export const NUMBERS = '0123456789'

export const RESOLUTIONS = [
  { max: 1, description: '1 millisecond' },
  { max: 10, description: '10 milliseconds' },
  { max: 100, description: '100 milliseconds' },
  { max: 1000, description: '1 second' },
  { max: 10 * 1000, description: '10 seconds' },
  { max: 60 * 1000, description: '1 minute' },
  { max: 10 * 60 * 1000, description: '10 minutes' },
  { max: 60 * 60 * 1000, description: '1 hour' },
  { max: 10 * 60 * 60 * 1000, description: '10 hours' },
  { max: 24 * 60 * 60 * 1000, description: '1 day' },
  { max: 7 * 24 * 60 * 60 * 1000, description: '1 week' },
  { max: 30 * 24 * 60 * 60 * 1000, description: '1 month' },
  { max: 365 * 24 * 60 * 60 * 1000, description: '1 year' },
  { max: Infinity, description: '> 1 year' }, // Use Infinity for the last range
]
