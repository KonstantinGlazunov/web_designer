'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { SiteCopy } from '@/lib/translations'

interface ContactDialogProps {
  open: boolean
  onClose: () => void
  copy: SiteCopy['form']
}

export function ContactDialog({ open, onClose, copy }: ContactDialogProps) {
  const [submitted, setSubmitted] = useState(false)

  const mailtoHref = useMemo(
    () =>
      `mailto:hello@codevibe.studio?subject=${encodeURIComponent('New project request')}&body=${encodeURIComponent(
        'Name:%0AEmail:%0A%0AProject:%0A',
      )}`,
    [],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open ? (
        <Dialog as="div" className="relative z-[90]" open={open} onClose={onClose}>
          <DialogBackdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />
          <div className="fixed inset-0 overflow-y-auto px-4 py-8">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                className="w-full max-w-2xl rounded-[32px] border border-white/12 bg-slate-950/90 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.7)] backdrop-blur-2xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{copy.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{copy.subtitle}</p>
                  </div>
                  <Button variant="ghost" onClick={onClose}>
                    {copy.close}
                  </Button>
                </div>

                <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                  <label htmlFor="contact-name" className="text-sm text-slate-200">
                    {copy.name}
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-300/40"
                    />
                  </label>
                  <label htmlFor="contact-email" className="text-sm text-slate-200">
                    {copy.email}
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                    />
                  </label>
                  <label htmlFor="contact-project" className="text-sm text-slate-200">
                    {copy.project}
                    <textarea
                      id="contact-project"
                      name="project"
                      rows={5}
                      required
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                    />
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <Button type="submit">{copy.submit}</Button>
                    <a
                      href={mailtoHref}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Email
                    </a>
                  </div>
                  {submitted ? <p className="text-sm text-emerald-300">{copy.success}</p> : null}
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  )
}
