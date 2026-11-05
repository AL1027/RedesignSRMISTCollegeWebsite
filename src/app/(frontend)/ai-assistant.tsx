'use client'

import { FormEvent, useState } from 'react'

type AIResult = {
  answer: string
  links: { label: string; href: string; reason: string }[]
  followUp: string
}

const prompts = [
  'Help me choose a programme',
  'What scholarships can I explore?',
  'How do I apply as an international student?',
]

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<AIResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask(question: string) {
    const cleanQuestion = question.trim()
    if (!cleanQuestion || loading) return
    setMessage(cleanQuestion)
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanQuestion }),
      })
      const data = (await response.json()) as AIResult & { error?: string }
      if (!response.ok) throw new Error(data.error || 'Unable to reach SRM Guide.')
      setResult(data)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to reach SRM Guide.')
    } finally {
      setLoading(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void ask(message)
  }

  return (
    <div className={`ai-assistant ${open ? 'ai-open' : ''}`}>
      <button
        className="ai-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span className="ai-spark" aria-hidden="true" />
        <span>Ask SRM</span>
      </button>
      <section className="ai-panel" aria-label="SRM intelligent assistant" aria-hidden={!open}>
        <div className="ai-panel-head">
          <div>
            <span className="ai-status" /> <b>SRM Guide</b>
            <small>AI-powered university assistant</small>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close assistant">
            Close
          </button>
        </div>
        <div className="ai-conversation" aria-live="polite">
          {!result && !loading && (
            <>
              <h2>Where would you like to go next?</h2>
              <p>Ask about programmes, applications, scholarships, campus life or careers.</p>
              <div className="ai-prompts">
                {prompts.map((prompt) => (
                  <button key={prompt} onClick={() => void ask(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            </>
          )}
          {loading && (
            <div className="ai-thinking">
              <i />
              <i />
              <i />
              <span>Finding the best path for you…</span>
            </div>
          )}
          {error && <p className="ai-error">{error}</p>}
          {result && !loading && (
            <div className="ai-result">
              <span className="ai-result-label">SRM Guide</span>
              <p>{result.answer}</p>
              {!!result.links.length && (
                <div className="ai-recommendations">
                  <span>Recommended for you</span>
                  {result.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      <div>
                        <b>{link.label}</b>
                        <small>{link.reason}</small>
                      </div>
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              )}
              <button
                className="ai-follow-up"
                onClick={() => {
                  setMessage(result.followUp)
                  setResult(null)
                }}
              >
                Ask another question
              </button>
            </div>
          )}
        </div>
        <form className="ai-form" onSubmit={submit}>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask SRM Guide…"
            maxLength={800}
          />
          <button type="submit" disabled={loading || !message.trim()} aria-label="Send question">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
          </button>
        </form>
        <small className="ai-disclaimer">
          AI can make mistakes. Verify important admission details.
        </small>
      </section>
    </div>
  )
}
