import { entries } from '@zero-dependency/utils'
import type {
  CookieAttributes,
  CookieDomainAttributes,
  CookieOptions,
  Decode,
  Encode,
  KeyOf
} from './types.js'

const defaultCookieParser = (value: any, name: string) => value

export class Cookie<T extends Record<string, any>> {
  #encode: Encode<T>
  #decode: Decode<T>
  #attributes: CookieAttributes

  constructor({
    encode = defaultCookieParser,
    decode = defaultCookieParser,
    attributes = {},
    initialValue
  }: CookieOptions<T> = {}) {
    this.#encode = encode
    this.#decode = decode
    this.attributes = attributes

    if (initialValue) {
      for (const [name, value] of entries(initialValue)) {
        if (this.has(name)) continue
        this.set(name, value)
      }
    }
  }

  /**
   * Get cookie attributes
   * @returns cookie attributes
   */
  get attributes(): CookieAttributes {
    return this.#attributes
  }

  /**
   * Set cookie attributes
   * @param attributes cookie attributes
   */
  set attributes(attributes: CookieAttributes) {
    this.#attributes = attributes
  }

  /**
   * Get cookie value
   * @param name cookie name
   * @returns cookie value or `null` if cookie does not exist
   */
  get<Name extends KeyOf<T>>(name: Name): T[Name] | null {
    const cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
    return cookie ? this.#decode(decodeURIComponent(cookie[1]!), name) : null
  }

  /**
   * Set cookie value
   * @param name cookie name
   * @param value cookie value
   * @param attributes cookie attributes
   */
  set<Name extends KeyOf<T>>(
    name: Name,
    value: T[Name] | null,
    attributes?: CookieAttributes
  ): void {
    const attr = {
      path: '/',
      ...this.#attributes,
      ...attributes
    }

    // Convert expires number of days to date
    if (typeof attr.expires === 'number') {
      attr.expires = new Date(Date.now() + attr.expires * 864e5)
    }

    // Convert expires date to UTC string
    if (attr.expires instanceof Date) {
      attr.expires = attr.expires.toUTCString()
    }

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      this.#encode(value, name)
    )}`

    for (const [name, value] of entries(attr)) {
      cookie += `; ${name}`
      if (value !== true) {
        cookie += `=${value}`
      }
    }

    document.cookie = cookie
  }

  /**
   * Get all cookies
   * @returns all document cookies
   */
  list<Cookies = T>(): Cookies {
    const documentCookie = document.cookie
    const cookieList = documentCookie ? documentCookie.split('; ') : []
    const cookies = cookieList.map((cookie) => {
      const [name, value] = cookie.split(/=(.*)/) as [
        name: KeyOf<T>,
        value: string
      ]
      return [name, this.#decode(decodeURIComponent(value), name)]
    })

    return Object.fromEntries(cookies)
  }

  /**
   * Remove cookie
   * @param name cookie name
   * @param attributes cookie domain attributes
   */
  remove<Name extends KeyOf<T>>(
    name: Name,
    attributes?: CookieDomainAttributes
  ): void {
    this.set(name, null, { ...attributes, expires: -1 })
  }

  /**
   * Check if cookie exists
   * @param name cookie name
   */
  has<Name extends KeyOf<T>>(name: Name): boolean {
    return Boolean(this.get(name))
  }
}
