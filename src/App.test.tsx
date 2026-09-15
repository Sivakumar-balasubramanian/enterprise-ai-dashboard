import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import App from './App'

describe('Enterprise dashboard', () => {
  it('renders the primary enterprise score and key sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /premium ai quality dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/overall quality score/i)).toBeInTheDocument()
    expect(screen.getByText(/how the score is composed/i)).toBeInTheDocument()
    expect(screen.getByText(/top issues to fix/i)).toBeInTheDocument()
  })

  it('supports audit comparison and export interactions', async () => {
    const user = userEvent.setup()
    const createObjectURL = vi.fn(() => 'blob:enterprise-ai-dashboard')
    const revokeObjectURL = vi.fn()
    const clickMock = vi.fn()

    vi.stubGlobal('URL', {
      createObjectURL,
      revokeObjectURL,
    })

    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = document.createElementNS('http://www.w3.org/1999/xhtml', tagName)
      if (tagName === 'a') {
        Object.defineProperty(element, 'click', {
          configurable: true,
          value: clickMock,
        })
      }
      return element as HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
    })

    render(<App />)

    await user.click(screen.getByRole('tab', { name: /audits/i }))
    expect(screen.getByRole('button', { name: /showing previous audit/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /export packet/i }))
    await user.click(screen.getByRole('button', { name: /generate export/i }))

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(clickMock).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledTimes(1)

    createElementSpy.mockRestore()
    vi.unstubAllGlobals()
  })
})
