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
    const cookie = new Cookie<{ foo: string[] }>({
      decode: (value) => {
        return value.split('.')
      },
      encode: (value) => {
        return value.join('.')
      }
    })
    cookie.set('foo', ['bar', 'baz'])
    expect(cookie.get('foo')).toEqual(['bar', 'baz'])
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
    new Cookie({
      initialValue: {
        foo: 'bar'
      }
    })

    const cookie = new Cookie({
      initialValue: {
        foo: 'bar2', // skipped
        bar: 'baz'
      }
    })

    expect(cookie.get('foo')).toBe('bar')
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
})
