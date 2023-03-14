
/**
 * Validate string or number if it is empty
 * @param {*} val
 * @returns {boolean}
 */
export function isEmptyValue(val: unknown): boolean {
  if (typeof val === 'undefined' || val === null) {
    return true
  }

  if (typeof val === 'string') {
    return val.trim().length === 0
  }

  if (typeof val === 'number') {
    return val === 0
  }

  return true
}

/**
 * Number format to currency
 * @param {any} value
 * @param {string} currency
 * @returns {string}
 */
export function formatCurrency(value: unknown, currency = 'PEN'): string {
  // Check if Intl.NumberFormat is supported
  if (typeof Intl === 'undefined' || !Intl.NumberFormat.supportedLocalesOf('es-PE').length) {
    return `S/ ${value as string}`
  }

  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(value as number)
}