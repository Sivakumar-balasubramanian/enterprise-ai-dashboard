import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  value: 480,
})

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  value: 320,
})

Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  configurable: true,
  value() {
    return {
      width: 480,
      height: 320,
      top: 0,
      left: 0,
      right: 480,
      bottom: 320,
      x: 0,
      y: 0,
      toJSON() {
        return this
      },
    }
  },
})
