import type {
  CookieAttributes,
  CookieDomainAttributes,
  CookieOptions,
  Decode,
  Encode
} from './types.js'

export class Cookie {
  #encode: Encode
  #decode: Decode
  #attributes: CookieAttributes

  constructor(options?: CookieOptions) {
    this.#encode = (value) => {
      return options?.encode ? options.encode(value) : value
    }

    this.#decode = (value) => {
      return options?.decode ? options.decode(value) : value
    }

    if (options?.attributes) {
      this.withAttributes(options.attributes)
    }
  }

  /**
   * Cookie attribute defaults can be set globally
   * @param attributes cookie attributes
   */
  withAttributes(attributes: Omit<CookieAttributes, 'max-age'>): void {
    this.#attributes = { ...this.#attributes, ...attributes }
  }

  /**
   * Get cookie value
   * @param name cookie name
   * @returns cookie value
   */
  get<T>(name: string): T | null {
    const cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
    return cookie ? this.#decode(decodeURIComponent(cookie[1]!)) : null
  }

  /**
   * Set cookie value
   * @param name cookie name
   * @param value cookie value
   * @param attributes cookie attributes
   */
  set<T>(name: string, value: T, attributes?: CookieAttributes): void {
    const attr = {
      path: '/',
      ...this.#attributes,
      ...attributes
    }

    if (typeof attr.expires === 'number') {
      attr.expires = new Date(Date.now() + attr.expires * 864e5)
    }

    if (attr.expires instanceof Date) {
      attr.expires = attr.expires.toUTCString()
    }

    if (attr.maxAge) {
      attr['max-age'] = attr.maxAge
      delete attr.maxAge
    }

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      this.#encode(value)
    )}`

    for (const [key, value] of Object.entries(attr)) {
      cookie += `; ${key}`
      if (value !== true) {
        cookie += `=${value}`
      }
    }

    document.cookie = cookie
  }

  /**
   * Get all cookies
   * @returns cookie list
   */
  list<T extends Record<string, any>>(): T {
    const cookies = document.cookie.split('; ').map((cookie) =>
      cookie.split(/=(.*)/s).map((value, key) => {
        value = decodeURIComponent(value)
        return key === 0 ? value : this.#decode(value)
      })
    )

    return Object.fromEntries(cookies)
  }

  /**
   * Remove cookie
   * @param name cookie name
   * @param attributes cookie domain attributes
   */
  remove(name: string, attributes?: CookieDomainAttributes): void {
    this.set(name, '', { ...attributes, expires: -1, maxAge: -1 })
  }
}
