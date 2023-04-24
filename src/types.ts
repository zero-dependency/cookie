export type KeyOf<T> = Extract<keyof T, string>
export type Encode<T> = (value: any, name: KeyOf<T>) => any
export type Decode<T> = (value: string, name: KeyOf<T>) => any

export interface CookieOptions<T> {
  /**
   * Encode value before setting cookie
   */
  encode?: Encode<T>

  /**
   * Decode value after getting cookie
   */
  decode?: Decode<T>

  /**
   * Cookie attribute defaults can be set globally
   */
  attributes?: CookieAttributes

  /**
   * Set initial cookie value
   */
  initialValue?: T
}

export interface CookieDomainAttributes {
  path?: string
  domain?: string
}

export interface CookieAttributes extends CookieDomainAttributes {
  expires?: Date | number | string
  secure?: boolean
  'max-age'?: number
  sameSite?: 'Lax' | 'Strict' | 'None'
}
