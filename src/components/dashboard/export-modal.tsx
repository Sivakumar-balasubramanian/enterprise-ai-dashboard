import { useMemo, useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import type { DashboardDataset, TimeRange } from './dashboard-data'

type ExportModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  range: TimeRange
  data: DashboardDataset
}

const sectionOptions = [
  { key: 'overview', label: 'Overview metrics' },
  { key: 'findings', label: 'Findings & anti-patterns' },
  { key: 'compliance', label: 'Compliance snapshot' },
] as const

type SectionKey = (typeof sectionOptions)[number]['key']

export function ExportModal({ data, onOpenChange, open, range }: ExportModalProps) {
  const [selected, setSelected] = useState<SectionKey[]>(['overview', 'findings', 'compliance'])

  const exportPreview = useMemo(
    () => ({
      range,
      generatedAt: '2026-09-15T07:23:59.352Z',
      overall: selected.includes('overview') ? data.overall : undefined,
      findings: selected.includes('findings') ? data.findings : undefined,
      compliance: selected.includes('compliance') ? data.compliance : undefined,
    }),
    [data, range, selected],
  )

  const toggleSection = (section: SectionKey) => {
    setSelected((current) =>
      current.includes(section)
        ? current.filter((value) => value !== section)
        : [...current, section],
    )
  }

  const downloadExport = () => {
    const blob = new Blob([JSON.stringify(exportPreview, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `enterprise-ai-dashboard-${range}.json`
    link.click()
    URL.revokeObjectURL(url)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export enterprise insights</DialogTitle>
          <DialogDescription>
            Generate a governance-ready snapshot for audits, leadership updates, or customer assurance reviews.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {sectionOptions.map((section) => (
            <label
              key={section.key}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">{section.label}</p>
                <p className="text-sm text-slate-400">Include in the exported JSON package.</p>
              </div>
              <input
                aria-label={section.label}
                checked={selected.includes(section.key)}
                className="h-4 w-4 accent-cyan-400"
                onChange={() => toggleSection(section.key)}
                type="checkbox"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
          Ready to export <span className="font-semibold">{selected.length}</span> sections for the <span className="font-semibold">{range}</span> view.
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={downloadExport}>Generate export</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
