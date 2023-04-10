import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'cookie',
    environment: 'jsdom'
  }
})
