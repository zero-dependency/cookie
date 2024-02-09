import { afterEach, describe, expect } from 'vitest'

import { Cookie } from '../src/index.js'

afterEach(() => {
  const cookie = new Cookie()
  for (const cookieName of Object.keys(cookie.list())) {
    cookie.remove(cookieName)
  }
})

describe('Cookie', (test) => {
  test('should be defined', () => {
    expect(Cookie).toBeDefined()
  })

  test('should set a cookie', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    expect(cookie.get('foo')).toBe('bar')
  })

  test('should set a cookie with encode and decode', () => {
    const cookie = new Cookie<{ foo: string[]; bar: string }>({
      decode: (value, key) => {
        if (key === 'foo') {
          return value.split('.')
        }

        return value
      },
      encode: (value, key) => {
        if (key === 'foo') {
          return value.join('.')
        }

        if (key === 'bar') {
          return value.split('.').join('-')
        }
      }
    })

    cookie.set('foo', ['bar', 'baz'])
    expect(cookie.get('foo')).toEqual(['bar', 'baz'])

    cookie.set('bar', 'bar.baz')
    expect(cookie.get('bar')).toBe('bar-baz')
  })

  test('should set a cookie with attributes', () => {
    const cookie = new Cookie({
      attributes: {
        path: '/'
      }
    })
    cookie.set('foo', 'bar')
    expect(cookie.get('foo')).toBe('bar')
  })

  test('should set a cookie with initialValue', () => {
    const cookie = new Cookie({
      initialValue: {
        foo: 'bar'
      }
    })
    expect(cookie.get('foo')).toBe('bar')

    const cookie2 = new Cookie({
      initialValue: {
        foo: 'bar2', // skipped
        bar: 'baz'
      }
    })
    expect(cookie2.get('foo')).toBe('bar')
    expect(cookie2.get('bar')).toBe('baz')
  })

  test('should set a cookie with options', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar', { path: '/' })
    expect(cookie.get('foo')).toBe('bar')
  })

  test('should get a cookie', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    expect(cookie.get('foo')).toBe('bar')
  })

  test('should get all cookies', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    cookie.set('bar', 'baz')
    expect(cookie.list()).toEqual({ foo: 'bar', bar: 'baz' })
  })

  test('should remove a cookie', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    cookie.remove('foo')
    expect(cookie.get('foo')).toBeNull()
  })

  test('should remove a cookie with options', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    cookie.remove('foo', { path: '/' })
    expect(cookie.get('foo')).toBeNull()
  })

  test('should exist a cookie', () => {
    const cookie = new Cookie()
    cookie.set('foo', 'bar')
    expect(cookie.has('foo')).toBe(true)
    expect(cookie.has('bar')).toBe(false)
  })

  test('set attributes', () => {
    const cookie = new Cookie({
      attributes: {
        expires: 7,
        path: '/'
      }
    })
    expect(cookie.attributes).toEqual({ expires: 7, path: '/' })
    cookie.attributes = { expires: 1 }
    expect(cookie.attributes).toEqual({ expires: 1 })
  })
})
