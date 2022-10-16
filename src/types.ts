export type Serialize = (value: any) => string | number | boolean
export type Deserialize = (value: string) => any

export interface CookieOptions {
  /**
   * @default
   * return JSON.stringify(value)
   */
  serialize: Serialize

  /**
   * @default
   * try {
   *   return JSON.parse(value)
   * } catch (err) {
   *   console.error(err)
   *   return null
   * }
   */
  deserialize: Deserialize

  /**
   * Cookie attribute defaults can be set globally
   */
  attributes?: Omit<CookieAttributes, 'max-age'>
}

export interface CookieAttributes {
  path?: string
  domain?: string
  expires?: Date | number | string
  secure?: boolean
  maxAge?: number
  'max-age'?: number
  sameSite?: 'Lax' | 'Strict' | 'None'
}
