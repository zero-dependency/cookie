# @zero-dependency/cookie

[![npm version](https://img.shields.io/npm/v/@zero-dependency/cookie)](https://npm.im/@zero-dependency/cookie)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@zero-dependency/cookie)](https://bundlephobia.com/package/@zero-dependency/cookie@latest)
![npm license](https://img.shields.io/npm/l/@zero-dependency/cookie)

## Installation

```sh
npm install @zero-dependency/cookie
```

```sh
yarn add @zero-dependency/cookie
```

```sh
pnpm add @zero-dependency/cookie
```

## Usage

```js
import { Cookie } from '@zero-dependency/cookie'

const cookie = new Cookie({ /* options */ })

// Create a cookie.
cookie.set('name', 'value')

// Create a cookie that expires 7 days from now.
cookie.set('name', 'value', { expires: 7 })

// Create a cookie.
cookie.get('name')

// Get all cookies.
cookie.list()

// Check if a cookie exists.
cookie.has('name')

// Remove a cookie.
cookie.remove('name')

// Remove a cookie by passing the exact same path and domain as when the cookie was set.
cookie.set('name', 'value', { path: '/some-path' })
cookie.remove('name'); // ❌
cookie.remove('name', { path: '/some-path' }); // ✅

// Cookie attribute defaults can be set globally.
cookie.setAttributes({ path: '/', domain: '.example.com' })
```
