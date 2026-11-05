const SITE_LINKS = [
  { label: 'Programme Finder', href: '/programmes' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Apply Now', href: '/apply' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'International', href: '/international' },
  { label: 'Research', href: '/research' },
  { label: 'Placements', href: '/placements' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Events', href: '/events' },
  { label: 'Library', href: '/library' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Examinations', href: '/examinations' },
  { label: 'Departments A–Z', href: '/departments' },
  { label: 'About SRMIST', href: '/about' },
] as const

const allowedHrefs = new Set(SITE_LINKS.map((link) => link.href))

type AIResult = {
  answer: string
  links: { label: string; href: string; reason: string }[]
  followUp: string
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown } | null
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 800) : ''

  if (!message) {
    return Response.json({ error: 'Please enter a question.' }, { status: 400 })
  }

  const apiKey = process.env.APP_OPENAI_API_KEY
  const baseURL = process.env.APP_OPENAI_BASE_URL
  if (!apiKey || !baseURL) {
    return Response.json(
      { error: 'The intelligent assistant needs its OpenAI base URL configured.' },
      { status: 503 },
    )
  }

  const siteMap = SITE_LINKS.map((link) => `${link.label}: ${link.href}`).join('\n')
  const response = await fetch(`${baseURL.replace(/\/$/, '')}/responses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: `You are SRM Guide, a concise university website assistant. Help prospective students navigate this SRMIST concept site. Never invent deadlines, fees, eligibility rules, rankings, or guarantees. If exact current information is required, say the visitor should verify it with the official university or admissions team. Recommend up to 3 relevant links using only this map:\n${siteMap}`,
        },
        { role: 'user', content: message },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'srm_guide_response',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              answer: { type: 'string' },
              links: {
                type: 'array',
                maxItems: 3,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    label: { type: 'string' },
                    href: { type: 'string' },
                    reason: { type: 'string' },
                  },
                  required: ['label', 'href', 'reason'],
                },
              },
              followUp: { type: 'string' },
            },
            required: ['answer', 'links', 'followUp'],
          },
        },
      },
      max_output_tokens: 500,
    }),
  })

  if (!response.ok) {
    const upstreamError = await response.text()
    console.error('OpenAI request failed', response.status, upstreamError.slice(0, 500))
    return Response.json(
      { error: 'SRM Guide is temporarily unavailable. Please try again.' },
      { status: 502 },
    )
  }

  const result = (await response.json()) as {
    output?: { content?: { type?: string; text?: string }[] }[]
  }
  const text = result.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === 'output_text')?.text

  if (!text) {
    return Response.json({ error: 'SRM Guide could not prepare a response.' }, { status: 502 })
  }

  const parsed = JSON.parse(text) as AIResult
  parsed.links = parsed.links.filter((link) =>
    allowedHrefs.has(link.href as (typeof SITE_LINKS)[number]['href']),
  )
  return Response.json(parsed)
}
