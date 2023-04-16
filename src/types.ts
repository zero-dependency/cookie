export type KeyOf<T> = Extract<keyof T, string>
export type Encode = (value: any) => string
export type Decode = (value: string) => any

export interface CookieOptions {
  /**
   * Encode value before setting cookie
   * @default
   * return JSON.stringify(value)
   */
  encode?: Encode

  /**
   * @default
   * try {
   *   return JSON.parse(value)
   * } catch (err) {
   *   console.error(err)
   *   return null
   * }
   */
  decode?: Decode

  /**
   * Cookie attribute defaults can be set globally
   */
  attributes?: Omit<CookieAttributes, 'max-age'>
}

export interface CookieDomainAttributes {
  path?: string
  domain?: string
}

export interface CookieAttributes extends CookieDomainAttributes {
  expires?: Date | number | string
  secure?: boolean
  maxAge?: number
  'max-age'?: number
  sameSite?: 'Lax' | 'Strict' | 'None'
}
