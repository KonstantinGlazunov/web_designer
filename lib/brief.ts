export interface Brief {
  want_website: string
  niche: string
  site_status: string
  contact: { name: string; phone: string; email: string }
  business: { type: string; description: string; location: string }
  goals: string[]
  target_audience: string
  services: string[]
  usp: string
  competitors: string[]
  sales_funnel: string
  traffic_sources: string[]
  features: string[]
  design: { style: string; references: string[] }
  content: { has_texts: boolean; has_images: boolean }
  tech: { domain: boolean; hosting: boolean }
  seo: { needed: boolean; ads: boolean }
  languages: string[]
  budget: { range: string }
  deadline: string
}

export const emptyBrief: Brief = {
  want_website: '',
  niche: '',
  site_status: '',
  contact: { name: '', phone: '', email: '' },
  business: { type: '', description: '', location: '' },
  goals: [],
  target_audience: '',
  services: [],
  usp: '',
  competitors: [],
  sales_funnel: '',
  traffic_sources: [],
  features: [],
  design: { style: '', references: [] },
  content: { has_texts: false, has_images: false },
  tech: { domain: false, hosting: false },
  seo: { needed: false, ads: false },
  languages: [],
  budget: { range: '' },
  deadline: '',
}

export function deepMergeBrief(target: Brief, update: Partial<Brief>): Brief {
  const result = { ...target }

  for (const key of Object.keys(update) as (keyof Brief)[]) {
    const val = update[key]
    if (val === undefined) continue

    const existing = result[key]
    if (typeof val === 'object' && val !== null && !Array.isArray(val) && typeof existing === 'object' && existing !== null) {
      ;(result as Record<string, unknown>)[key] = { ...existing, ...val }
    } else {
      ;(result as Record<string, unknown>)[key] = val
    }
  }

  return result
}

export function getChangedFields(oldBrief: Brief, newBrief: Brief): Record<string, unknown> {
  const changed: Record<string, unknown> = {}
  const keys = new Set([...Object.keys(oldBrief), ...Object.keys(newBrief)]) as Set<keyof Brief>

  for (const key of keys) {
    const oldVal = JSON.stringify((oldBrief as unknown as Record<string, unknown>)[key])
    const newVal = JSON.stringify((newBrief as unknown as Record<string, unknown>)[key])
    if (oldVal !== newVal) {
      changed[key] = (newBrief as unknown as Record<string, unknown>)[key]
    }
  }

  return changed
}
