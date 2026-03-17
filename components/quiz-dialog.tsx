'use client'

import { Dialog, DialogBackdrop } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { quizCopy, HAS_SITE_IDS, type QuizOption, type QuizQuestion } from '@/lib/quiz-data'

type FollowUps = { otherSpecify: string; otherPlaceholder: string; siteUrl: string; siteUrlPlaceholder: string }
import type { Locale } from '@/lib/translations'

type Step = { type: 'question'; data: QuizQuestion } | { type: 'followup'; id: string; question: string; placeholder: string; questionId: string }

function buildSteps(questions: QuizQuestion[], answers: Record<string, string | string[]>, followUps: FollowUps): Step[] {
  const steps: Step[] = []
  for (const q of questions) {
    steps.push({ type: 'question', data: q })
    const val = answers[q.id]
    const hasOther = q.options?.some((o) => o.id === 'other') && (Array.isArray(val) ? val.includes('other') : val === 'other')
    if (hasOther) {
      steps.push({ type: 'followup', id: `${q.id}_other`, questionId: q.id, question: followUps.otherSpecify, placeholder: followUps.otherPlaceholder })
    }
    if (q.id === 'current_site' && (HAS_SITE_IDS as readonly string[]).includes(String(val))) {
      steps.push({ type: 'followup', id: 'site_url', questionId: q.id, question: followUps.siteUrl, placeholder: followUps.siteUrlPlaceholder })
    }
  }
  return steps
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

interface QuizDialogProps {
  open: boolean
  onClose: () => void
  locale: Locale
}

export function QuizDialog({ open, onClose, locale }: QuizDialogProps) {
  const copy = useMemo(() => (locale === 'de' ? quizCopy.de : quizCopy.ru), [locale])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const steps = useMemo(() => buildSteps(copy.questions, answers, copy.followUps), [copy.questions, copy.followUps, answers])
  const totalSteps = steps.length + 1
  const currentStep = steps[step]
  const isFinalStep = step === steps.length
  const isQuestion = currentStep?.type === 'question'
  const isFollowup = currentStep?.type === 'followup'
  const isInputQuestion = isQuestion && currentStep?.data?.type === 'input'
  const location = (answers['location'] as string) || ''
  const progress = ((step + 1) / totalSteps) * 100

  function toggleOption(questionId: string, optionId: string, multiSelect?: boolean) {
    setAnswers((prev) => {
      const current = prev[questionId]
      if (multiSelect) {
        const arr = Array.isArray(current) ? [...current] : []
        const idx = arr.indexOf(optionId)
        if (idx >= 0) arr.splice(idx, 1)
        else arr.push(optionId)
        return { ...prev, [questionId]: arr }
      }
      return { ...prev, [questionId]: optionId }
    })
  }

  function isSelected(questionId: string, optionId: string): boolean {
    const val = answers[questionId]
    if (Array.isArray(val)) return val.includes(optionId)
    return val === optionId
  }

  function canProceed(): boolean {
    if (isFinalStep) return true
    if (isFollowup && currentStep?.type === 'followup') return !!answers[currentStep.id]?.toString().trim()
    if (isQuestion && currentStep?.data?.type === 'input') return !!answers[currentStep.data.id]?.toString().trim()
    if (isQuestion) {
      const val = answers[currentStep.data.id]
      if (currentStep.data.multiSelect) return Array.isArray(val) && val.length > 0
      return !!val
    }
    return false
  }

  function handleNext() {
    if (step < steps.length) setStep((s) => s + 1)
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = [
      '--- Quiz Answers ---',
      ...copy.questions.map((q) => {
        const a = answers[q.id]
        const extra = answers[`${q.id}_other`] ? ` (${answers[`${q.id}_other`]})` : ''
        const siteUrl = q.id === 'current_site' && answers.site_url ? ` | URL: ${answers.site_url}` : ''
        return `${q.question}: ${Array.isArray(a) ? a.join(', ') : a || '-'}${extra}${siteUrl}`
      }),
      `Standort: ${location || '-'}`,
      '',
      '--- Contact ---',
      `Name: ${name}`,
      `WhatsApp: ${whatsapp}`,
    ].join('\n')

    const mailto = `mailto:hello@codevibe.studio?subject=${encodeURIComponent('Quiz: Website idea request')}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  function handleClose() {
    setStep(0)
    setAnswers({})
    setName('')
    setWhatsapp('')
    setSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open ? (
        <Dialog as="div" className="relative z-[90]" open={open} onClose={handleClose}>
          <DialogBackdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:py-12">
            <div className="flex min-h-full items-start justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-full max-w-2xl rounded-[32px] border border-white/12 bg-slate-950/95 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.8)] backdrop-blur-2xl sm:p-8"
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
                      {copy.stepLabel(step + 1, totalSteps)}
                    </span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {copy.close}
                    </button>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!isFinalStep && currentStep ? (
                    <motion.div
                      key={`${currentStep.type}-${currentStep.type === 'question' ? currentStep.data.id : currentStep.id}`}
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="min-h-[320px]"
                    >
                      <motion.h3
                        variants={item}
                        className="text-xl font-semibold text-white sm:text-2xl"
                      >
                        {isFollowup && currentStep.type === 'followup'
                          ? currentStep.question
                          : isQuestion && currentStep.type === 'question'
                            ? currentStep.data.question
                            : ''}
                      </motion.h3>
                      {isFollowup && currentStep.type === 'followup' ? (
                        <motion.div variants={item} className="mt-6">
                          <input
                            type="text"
                            value={(answers[currentStep.id] as string) || ''}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentStep.id]: e.target.value,
                              }))
                            }
                            placeholder={currentStep.placeholder}
                            autoFocus
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                          />
                        </motion.div>
                      ) : null}
                      {isQuestion && currentStep.type === 'question' && currentStep.data.multiSelect ? (
                        <motion.p
                          variants={item}
                          className="mt-1 text-sm text-slate-400"
                        >
                          {copy.multiSelectHint}
                        </motion.p>
                      ) : null}
                      {isInputQuestion && isQuestion && currentStep.type === 'question' ? (
                        <motion.div variants={item} className="mt-6">
                          <input
                            type="text"
                            value={location}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentStep.data.id]: e.target.value,
                              }))
                            }
                            placeholder={currentStep.data.inputPlaceholder}
                            autoFocus
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                          />
                        </motion.div>
                      ) : isQuestion && currentStep.type === 'question' && currentStep.data.options ? (
                      <motion.div
                        variants={container}
                        className="mt-6 grid gap-3 sm:grid-cols-2"
                      >
                        {currentStep.data.options.map((opt) => (
                          <OptionCard
                            key={opt.id}
                            option={opt}
                            selected={isSelected(currentStep.data.id, opt.id)}
                            multiSelect={currentStep.data.multiSelect}
                            onClick={() =>
                              toggleOption(
                                currentStep.data.id,
                                opt.id,
                                currentStep.data.multiSelect
                              )
                            }
                          />
                        ))}
                      </motion.div>
                      ) : null}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="final"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="min-h-[320px]"
                    >
                      {submitted ? (
                        <div className="py-12 text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20"
                          >
                            <Check className="h-8 w-8 text-emerald-400" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-white">
                            {copy.submittedTitle}
                          </h3>
                          <p className="mt-2 text-slate-400">
                            {copy.submittedText}
                          </p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold text-white sm:text-2xl">
                            {copy.final.title}
                          </h3>
                          <p className="mt-2 text-slate-300">{copy.final.subtitle}</p>
                          <ul className="mt-3 space-y-1">
                            {copy.final.benefits.map((b, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-emerald-300/90"
                              >
                                <Check className="h-4 w-4 shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <form
                            onSubmit={handleSubmit}
                            className="mt-8 grid gap-4"
                          >
                            <label className="text-sm text-slate-200">
                              {copy.final.nameLabel}
                              <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                              />
                            </label>
                            <label className="text-sm text-slate-200">
                              {copy.final.whatsappLabel}
                              <input
                                type="tel"
                                required
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder={copy.final.whatsappPlaceholder}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
                              />
                            </label>
                            <Button type="submit" size="lg" className="mt-2">
                              {copy.final.submitButton}
                            </Button>
                          </form>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                {!isFinalStep && !submitted && (
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={step === 0}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {copy.back}
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="gap-1"
                    >
                      {copy.next}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {isFinalStep && !submitted && (
                  <div className="mt-6 flex justify-start">
                    <Button variant="ghost" onClick={handleBack} className="gap-1">
                      <ChevronLeft className="h-4 w-4" />
                      {copy.back}
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  )
}

function OptionCard({
  option,
  selected,
  multiSelect,
  onClick,
}: {
  option: QuizOption
  selected: boolean
  multiSelect?: boolean
  onClick: () => void
}) {
  const Icon = option.icon
  return (
    <motion.button
      type="button"
      variants={item}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300',
        selected
          ? 'border-emerald-400/60 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.15)]'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors',
          selected ? 'bg-emerald-500/30 text-emerald-300' : 'bg-white/10 text-slate-400 group-hover:text-white'
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <span className="flex-1 text-sm font-medium text-white sm:text-base">
        {option.label}
      </span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500"
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}
      {multiSelect && !selected && (
        <div className="h-6 w-6 shrink-0 rounded-full border-2 border-white/30" />
      )}
    </motion.button>
  )
}
