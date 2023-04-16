import { describe, expect } from 'vitest'
import { Cookie } from '../src/index.js'

describe('Cookie', (test) => {
  // uncovered lines in src/cookie.ts:22-24
  const withAttributes = new Cookie({
    encode(value) {
      return JSON.stringify(value)
    },
    decode(value) {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },
    attributes: {
      path: '/',
      domain: '.example.com'
    }
  })
  // uncovered lines in src/cookie.ts:22-24

  const cookie = new Cookie({
    encode(value) {
      return JSON.stringify(value)
    },
    decode(value) {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    }
  })

  const user = {
    id: 1,
    name: 'John'
  }

  test('cookie instance', () => {
    const cookie = new Cookie()
    cookie.set('foo', 1)
    expect(cookie.get('foo')).toBe('1')
    cookie.remove('foo')
  })

  test('set', () => {
    expect(document.cookie).toBe('')
    cookie.set('user', user, { maxAge: 7 })
    expect(document.cookie).toBe(
      'user=%7B%22id%22%3A1%2C%22name%22%3A%22John%22%7D'
    )
  })

  test('get', () => {
    expect(cookie.get('user')).toMatchObject(user)
    expect(cookie.get('unknown')).toBeNull()

    document.cookie = 'empty='
    document.cookie = 'bad=%7B'
    expect(cookie.get('empty')).toBeNull()
    expect(cookie.get('bad')).toBeNull()
  })

  test('list', () => {
    expect(cookie.list()).toEqual({
      user,
      empty: null,
      bad: null
    })
  })

  test('remove', () => {
    cookie.remove('bad')
    cookie.remove('empty')
    cookie.remove('user')
    expect(document.cookie).toBe('')
  })

  test('exist', () => {
    cookie.set('foo', 1)
    expect(cookie.exist('foo')).toBe(true)
    expect(cookie.exist('bar')).toBe(false)
  })

  test('setAttributes', () => {
    cookie.setAttributes({
      path: '/',
      domain: '.example.com'
    })
  })

  test('initialValues', () => {
    const cookie = new Cookie({
      initialValues: {
        foo: 'bar'
      }
    })
    expect(cookie.get('foo')).toBe('bar')
  })
})
