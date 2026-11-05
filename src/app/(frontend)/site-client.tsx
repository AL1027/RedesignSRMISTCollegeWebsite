'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import AIAssistant from './ai-assistant'

type ContentRoute =
  | '/academics'
  | '/admissions'
  | '/research'
  | '/campus-life'
  | '/about'
  | '/programmes'
  | '/international'
  | '/placements'
  | '/rankings'
  | '/scholarships'
  | '/events'
  | '/library'
  | '/alumni'
  | '/examinations'
  | '/departments'
type ApplyRoute = '/apply' | '/apply/programme' | '/apply/details' | '/apply/review'
export type Route = '/' | ContentRoute | ApplyRoute

type RouteLink = {
  label: string
  path: Route
}

type PageBlock = {
  n: string
  title: string
  text: string
  items: string[]
}

type PageContent = {
  eyebrow: string
  title: string
  intro: string
  image: string
  imageAlt: string
  stats: [string, string][]
  blocks: PageBlock[]
}

type SearchResult = {
  answer: string
  links: { label: string; href: string; reason: string }[]
}

const routes: RouteLink[] = [
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Research', path: '/research' },
  { label: 'Campus life', path: '/campus-life' },
  { label: 'About', path: '/about' },
]

const extraRoutes: ContentRoute[] = [
  '/programmes',
  '/international',
  '/placements',
  '/rankings',
  '/scholarships',
  '/events',
  '/library',
  '/alumni',
  '/examinations',
  '/departments',
]
const applyRoutes: ApplyRoute[] = ['/apply', '/apply/programme', '/apply/details', '/apply/review']
const allRoutes: Route[] = [
  '/',
  ...routes.map((route) => route.path),
  ...extraRoutes,
  ...applyRoutes,
]

const images = {
  campus:
    'https://images.unsplash.com/photo-1680084521816-cc1ad0433ceb?auto=format&fit=crop&w=1800&q=88',
  walk: 'https://images.unsplash.com/photo-1687709348710-05314eea5476?auto=format&fit=crop&w=1600&q=88',
  building:
    'https://images.unsplash.com/photo-1680084521631-e4e6d77704d8?auto=format&fit=crop&w=1600&q=88',
  class:
    'https://images.unsplash.com/photo-1629306262232-1f854b4b0b13?auto=format&fit=crop&w=1600&q=88',
  lab: 'https://images.unsplash.com/photo-1668243304131-87cb6634f85b?auto=format&fit=crop&w=1600&q=88',
  library:
    'https://images.unsplash.com/photo-1682203533806-8b5457c84c91?auto=format&fit=crop&w=1600&q=88',
  students:
    'https://images.unsplash.com/photo-1722573783625-eceb04251036?auto=format&fit=crop&w=1600&q=88',
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14m-5-5 5 5-5 5'} />
    </svg>
  )
}

function NetflixIdent({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3600)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="srm-ident" aria-label="SRMIST">
      <div className="ident-ambient" aria-hidden="true" />
      <div className="ident-mark">
        <span>S</span>
        <span>R</span>
        <span>M</span>
      </div>
      <p>Learn · Leap · Lead</p>
      <button onClick={onComplete}>Skip intro</button>
    </div>
  )
}

function LearningDoodles() {
  return (
    <div className="learning-doodles" aria-hidden="true">
      <svg className="doodle doodle-book" viewBox="0 0 120 90">
        <path d="M13 62c17-8 32-6 47 3 15-9 30-11 47-3V20c-17-7-32-5-47 5-15-10-30-12-47-5v42Z" />
        <path d="M60 25v40M22 31c10-3 20-2 29 3M22 42c10-3 20-2 29 3M69 34c9-5 19-6 29-3M69 45c9-5 19-6 29-3" />
      </svg>
      <svg className="doodle doodle-student" viewBox="0 0 100 130">
        <circle cx="50" cy="25" r="13" />
        <path d="m30 59 20-12 20 12v38H30V59Zm0 10L15 93m55-24 15 24M41 97l-6 25m24-25 6 25M35 20l15-10 15 10-15 8-15-8Zm30 0v12" />
      </svg>
      <svg className="doodle doodle-flask" viewBox="0 0 90 110">
        <path d="M34 10h22M40 10v35L17 87c-4 7 1 13 9 13h38c8 0 13-6 9-13L50 45V10M28 76h34M36 61h18" />
        <circle cx="40" cy="84" r="3" />
        <circle cx="53" cy="91" r="2" />
      </svg>
      <svg className="doodle doodle-pencil" viewBox="0 0 120 45">
        <path d="m10 34 8-22 87 1 7 10-8 10-86 1-8 6v-6Zm8-22v22m86-21v20m-94 21 8-7" />
      </svg>
      <svg className="doodle doodle-laptop" viewBox="0 0 120 90">
        <rect x="22" y="10" width="76" height="55" rx="4" />
        <path d="M12 72h96l-8 8H20l-8-8Zm38 0h20" />
      </svg>
    </div>
  )
}

function LinkButton({
  to,
  children,
  light = false,
}: {
  to: Route
  children: ReactNode
  light?: boolean
}) {
  return (
    <a href={to} className={`button ${light ? 'button-light' : ''}`}>
      {children}
      <Arrow />
    </a>
  )
}

function HomeChrome() {
  const [pastHero, setPastHero] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const updateClock = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    const updateScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.72)
    updateClock()
    updateScroll()
    const clockTimer = window.setInterval(updateClock, 15000)
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => {
      window.clearInterval(clockTimer)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return (
    <>
      <header className={`home-chrome ${pastHero ? 'hidden' : ''}`}>
        <span className="home-seal" />
        <div className="home-statement">
          <b>SRMIST is a university for learning and discovery</b>
          <span>Working across engineering, medicine, law and the arts</span>
        </div>
        <nav>
          <a href="/programmes">Programmes</a>
          <a href="/research">Research</a>
          <a href="/apply">Admissions</a>
        </nav>
        <div className="home-location">
          <b>Chennai</b>
          <span>{clock}</span>
        </div>
      </header>
      <nav className={`home-pill ${pastHero ? 'show' : ''}`} aria-label="Quick navigation">
        <a href="/programmes">Programmes</a>
        <a href="/research">Research</a>
        <a className="pill-apply" href="/apply">
          Apply now
        </a>
      </nav>
    </>
  )
}

function Header({ path }: { path: Route }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)

  async function runSearch(event: FormEvent) {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setSearchLoading(true)
    setSearchResult(null)
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Website search: ${query}` }),
      })
      if (response.ok) setSearchResult((await response.json()) as SearchResult)
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    setOpen(false)
    setSearch(false)
  }, [path])

  if (path === '/') return <HomeChrome />

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="SRMIST home">
          <span className="brand-seal">S</span>
          <span>
            <b>SRM</b>
            <small>Institute of Science and Technology</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {routes.map((item) => (
            <a key={item.path} className={path === item.path ? 'active' : ''} href={item.path}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearch(true)} aria-label="Open search">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
          <a className="apply-link" href="/apply">
            Apply now <Arrow />
          </a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <p>Explore SRMIST</p>
        {routes.map((item, i) => (
          <a key={item.path} href={item.path}>
            <span>0{i + 1}</span>
            {item.label}
            <Arrow diagonal />
          </a>
        ))}
      </div>
      {search && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
          <button
            className="search-close"
            onClick={() => setSearch(false)}
            aria-label="Close search"
          >
            Close
          </button>
          <div>
            <span className="eyebrow">What are you looking for?</span>
            <form className="ai-search-form" onSubmit={runSearch}>
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search programmes, people, places…"
              />
              <button type="submit" disabled={searchLoading || !searchQuery.trim()}>
                {searchLoading ? 'Thinking…' : 'Search with AI'}
              </button>
            </form>
            {searchResult && (
              <div className="ai-search-results">
                <p>{searchResult.answer}</p>
                <div>
                  {searchResult.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      <b>{link.label}</b>
                      <span>{link.reason}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="search-links">
              <span>Popular:</span>
              <a href="/academics">B.Tech Computer Science</a>
              <a href="/admissions">Scholarships</a>
              <a href="/campus-life">Hostels</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-lead">
        <span className="eyebrow">Your next chapter</span>
        <h2>Let’s build what’s next.</h2>
        <LinkButton to="/apply" light>
          Start your application
        </LinkButton>
      </div>
      <div className="footer-grid">
        <div>
          <a className="brand footer-brand" href="/">
            <span className="brand-seal">S</span>
            <span>
              <b>SRM</b>
              <small>Institute of Science and Technology</small>
            </span>
          </a>
          <p>Kattankulathur, Chennai, Tamil Nadu 603203</p>
        </div>
        <div>
          <b>Discover</b>
          <a href="/programmes">Programmes</a>
          <a href="/research">Research</a>
          <a href="/international">International</a>
          <a href="/placements">Placements</a>
          <a href="/rankings">Rankings</a>
          <a href="/scholarships">Scholarships</a>
          <a href="/events">Events</a>
          <a href="/library">Library</a>
          <a href="/departments">Departments A–Z</a>
          <a href="/examinations">Examinations</a>
          <a href="/alumni">Alumni</a>
          <a href="/campus-life">Campus life</a>
          <a href="/about">About SRM</a>
        </div>
        <div>
          <b>Connect</b>
          <a href="/admissions">Admissions India</a>
          <a href="/admissions">International students</a>
          <a href="https://www.srmist.edu.in/" target="_blank" rel="noreferrer">
            Official website
          </a>
          <a href="tel:+914427417000">+91 44 2741 7000</a>
        </div>
        <div>
          <b>For you</b>
          <a href="https://www.srmist.edu.in/students/" target="_blank" rel="noreferrer">
            Students
          </a>
          <a href="https://www.srmist.edu.in/faculty/" target="_blank" rel="noreferrer">
            Faculty & staff
          </a>
          <a href="https://alumni.srmist.edu.in/" target="_blank" rel="noreferrer">
            Alumni
          </a>
          <a href="https://www.srmist.edu.in/parents/" target="_blank" rel="noreferrer">
            Parents
          </a>
        </div>
      </div>
      <div className="legal">
        <span>Concept redesign · 2026</span>
        <span>Learn · Leap · Lead</span>
      </div>
    </footer>
  )
}

const disciplines = [
  'Engineering & Technology',
  'Medicine & Health',
  'Management',
  'Science & Humanities',
  'Law',
  'Architecture',
  'Agricultural Sciences',
  'Hotel Management',
]

function Home({ active = true }: { active?: boolean }) {
  const [query, setQuery] = useState('')
  const [openingImage, setOpeningImage] = useState(0)
  const [settled, setSettled] = useState(false)
  const filtered = useMemo(
    () => disciplines.filter((name) => name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  useEffect(() => {
    if (!active) return
    let flash = 0
    const rapid = window.setInterval(() => {
      flash += 1
      setOpeningImage(flash % 7)
      if (flash >= 11) {
        window.clearInterval(rapid)
        setOpeningImage(5)
        setSettled(true)
      }
    }, 90)
    return () => window.clearInterval(rapid)
  }, [active])

  useEffect(() => {
    if (!active || !settled) return
    const cycle = window.setInterval(
      () => setOpeningImage((current) => (current === 5 ? 6 : 5)),
      2800,
    )
    return () => window.clearInterval(cycle)
  }, [active, settled])

  useEffect(() => {
    document.body.classList.toggle('cinematic-home', settled)
    return () => document.body.classList.remove('cinematic-home')
  }, [settled])

  const openingImages = [
    images.walk,
    images.lab,
    images.class,
    images.library,
    images.students,
    images.campus,
    images.building,
  ]
  const framePositions = [
    'frame-center',
    'frame-upper-left',
    'frame-upper-right',
    'frame-low-left',
    'frame-center-right',
    'frame-low-right',
    'frame-center',
  ]

  return (
    <>
      <section className={`opening ${settled ? 'cinematic' : ''}`}>
        <div className="opening-copy">
          <p>One university. Infinite directions.</p>
          <span>Chennai · India</span>
        </div>
        <LearningDoodles />
        <div
          className={`opening-photo ${settled ? `settled ${framePositions[openingImage]}` : ''}`}
        >
          <img
            key={openingImage}
            src={openingImages[openingImage]}
            alt="Life, learning and research at SRMIST"
          />
        </div>
        <h1 aria-label="SRMIST">
          {'SRMIST'.split('').map((letter, i) => (
            <span key={i} style={{ animationDelay: `${1.4 + i * 0.07}s` }}>
              {letter}
            </span>
          ))}
        </h1>
        <div className="cinematic-copy">
          <span>Est. 1985 · Chennai, India</span>
          <h2>
            A university.
            <br />A city of ideas.
          </h2>
          <p>
            Six campuses. Hundreds of programmes. One community learning how to shape what comes
            next.
          </p>
          <a href="/about">
            Enter SRMIST <Arrow />
          </a>
        </div>
        <div className="campus-coordinate">
          <span>Kattankulathur</span>
          <span>12.8231° N · 80.0444° E</span>
        </div>
        <div className="scroll-cue">
          <span>Scroll to discover</span>
          <i />
        </div>
      </section>

      <main className="home-curtain">
        <section className="intro-panel">
          <div>
            <span className="eyebrow">SRMIST · Since 1985</span>
            <h2>
              A place to learn, question, make and <em>move forward.</em>
            </h2>
          </div>
          <div className="intro-side">
            <p>
              Engineers, doctors, lawyers, designers, scientists and entrepreneurs learning side by
              side—on a campus built for possibility.
            </p>
            <LinkButton to="/about" light>
              Discover SRMIST
            </LinkButton>
          </div>
        </section>

        <section className="campus-image">
          <img src={images.campus} alt="University buildings surrounded by lawns" />
          <div>
            <span>Kattankulathur campus</span>
            <span>12.8231° N · 80.0444° E</span>
          </div>
        </section>

        <section className="idea-marquee" aria-label="Learning at SRMIST">
          <div>
            <span>Learn</span>
            <i />
            <span>Question</span>
            <i />
            <span>Build</span>
            <i />
            <span>Discover</span>
            <i />
            <span>Lead</span>
            <i />
            <span>Learn</span>
            <i />
            <span>Question</span>
            <i />
            <span>Build</span>
            <i />
            <span>Discover</span>
            <i />
            <span>Lead</span>
            <i />
          </div>
        </section>

        <section className="study-finder">
          <div className="section-heading">
            <span className="eyebrow">Find your direction</span>
            <h2>What do you want to study?</h2>
          </div>
          <label className="finder-input">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a field of study"
            />
          </label>
          <div className="discipline-list">
            {filtered.map((name, i) => (
              <a href="/academics" key={name}>
                <span>0{i + 1}</span>
                <b>{name}</b>
                <Arrow diagonal />
              </a>
            ))}
            {!filtered.length && (
              <p className="empty-state">No match. Try “Engineering” or “Law”.</p>
            )}
          </div>
        </section>

        <section className="pathways">
          <div className="section-heading light-heading">
            <span className="eyebrow">Choose your pathway</span>
            <h2>
              Your ambition.
              <br />
              Your route.
            </h2>
          </div>
          <div className="pathway-grid">
            {[
              [
                '01',
                'Admissions India',
                'Undergraduate, postgraduate and doctoral programmes across every college.',
              ],
              [
                '02',
                'Medical & Dental',
                'NEET-based admissions and dedicated pathways for health sciences.',
              ],
              [
                '03',
                'International',
                'A global community with application, visa and arrival support.',
              ],
            ].map(([n, title, text]) => (
              <a href="/apply" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="rankings">
          <div className="rank-copy">
            <span className="eyebrow">Recognition</span>
            <h2>Among India’s best, by every measure that matters.</h2>
            <p>
              National recognition, global partnerships and outcomes built on four decades of work.
            </p>
            <LinkButton to="/about">Explore our impact</LinkButton>
          </div>
          <div className="rank-grid">
            <div>
              <b>A++</b>
              <span>NAAC accredited</span>
            </div>
            <div>
              <b>12</b>
              <span>NIRF University 2024</span>
            </div>
            <div>
              <b>980+</b>
              <span>Recruiters on campus</span>
            </div>
            <div>
              <b>52 LPA</b>
              <span>Highest placement</span>
            </div>
          </div>
        </section>

        <section className="next-destinations">
          <div className="section-heading">
            <span className="eyebrow">Go further</span>
            <h2>More ways into SRM.</h2>
          </div>
          <div className="destination-grid">
            <a href="/programmes">
              <span className="destination-index">01</span>
              <img src={images.class} alt="Students learning in a classroom" />
              <div>
                <span>Find your course</span>
                <h3>Programme Finder</h3>
                <Arrow diagonal />
              </div>
            </a>
            <a href="/international">
              <span className="destination-index">02</span>
              <img src={images.students} alt="Students collaborating at university" />
              <div>
                <span>Connect globally</span>
                <h3>International</h3>
                <Arrow diagonal />
              </div>
            </a>
            <a href="/placements">
              <span className="destination-index">03</span>
              <img src={images.walk} alt="Students walking through campus" />
              <div>
                <span>Build your future</span>
                <h3>Placements</h3>
                <Arrow diagonal />
              </div>
            </a>
          </div>
          <div className="quick-discoveries">
            <a href="/rankings">
              <span>Recognition</span>
              <b>Rankings & accreditation</b>
              <Arrow diagonal />
            </a>
            <a href="/scholarships">
              <span>Opportunity</span>
              <b>Scholarships & financial aid</b>
              <Arrow diagonal />
            </a>
            <a href="/events">
              <span>Community</span>
              <b>News & events</b>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="service-gateway">
          <div className="service-gateway-copy">
            <span className="eyebrow">University services</span>
            <h2>
              Find what you need.
              <br />
              Keep moving.
            </h2>
            <p>
              Direct routes into the academic services and communities students use throughout their
              SRM journey.
            </p>
          </div>
          <div className="service-links">
            <a href="/library">
              <span>01</span>
              <div>
                <small>Study & research</small>
                <b>University Library</b>
              </div>
              <Arrow diagonal />
            </a>
            <a href="/departments">
              <span>02</span>
              <div>
                <small>Academic directory</small>
                <b>Departments A–Z</b>
              </div>
              <Arrow diagonal />
            </a>
            <a href="/examinations">
              <span>03</span>
              <div>
                <small>Schedules & results</small>
                <b>Examinations</b>
              </div>
              <Arrow diagonal />
            </a>
            <a href="/alumni">
              <span>04</span>
              <div>
                <small>Lifelong community</small>
                <b>Alumni Network</b>
              </div>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="feature-story">
          <div className="feature-photo">
            <img src={images.lab} alt="Researcher working in a university laboratory" />
          </div>
          <div className="feature-copy">
            <span className="eyebrow">Research & innovation</span>
            <h2>
              Every question can become a <em>breakthrough.</em>
            </h2>
            <p>
              Central laboratories, cross-disciplinary research and an incubation ecosystem bring
              ambitious ideas closer to the people who need them.
            </p>
            <div className="mini-stats">
              <span>
                <b>920+</b>Patents
              </span>
              <span>
                <b>47K+</b>Publications
              </span>
              <span>
                <b>₹250 Cr+</b>Funding
              </span>
            </div>
            <LinkButton to="/research">Explore research</LinkButton>
          </div>
        </section>

        <section className="happenings">
          <div className="section-heading">
            <span className="eyebrow">From the community</span>
            <h2>What’s happening</h2>
          </div>
          <div className="story-grid">
            <article className="story story-main">
              <img src={images.students} alt="Students collaborating in a classroom" />
              <span>Student achievement · 4 min read</span>
              <h3>Ideas become prototypes—and prototypes become something bigger.</h3>
            </article>
            <div className="story-stack">
              <article>
                <span>Innovation</span>
                <h3>SRMIST student recognised at Apple’s Swift Student Challenge</h3>
                <a href="/research">
                  Read story <Arrow />
                </a>
              </article>
              <article>
                <span>Campus</span>
                <h3>Team Camber Racing claims a national Formula Bharat title</h3>
                <a href="/campus-life">
                  Read story <Arrow />
                </a>
              </article>
              <article>
                <span>Community</span>
                <h3>Convocation celebrates the next generation of leaders</h3>
                <a href="/about">
                  Read story <Arrow />
                </a>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const pageData: Record<ContentRoute, PageContent> = {
  '/academics': {
    eyebrow: 'Academics at SRMIST',
    title: 'Study what matters. Build what comes next.',
    intro:
      'Flexible, future-facing programmes connect deep disciplinary learning with the freedom to explore across fields.',
    image: images.class,
    imageAlt: 'Students learning together in a university classroom',
    stats: [
      ['8', 'Academic faculties'],
      ['300+', 'Programmes'],
      ['6', 'Campuses'],
      ['1', 'Connected community'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Engineering & Technology',
        text: 'From foundational science to AI, robotics, mobility and sustainable infrastructure.',
        items: ['B.Tech', 'M.Tech', 'B.Arch', 'PhD'],
      },
      {
        n: '02',
        title: 'Medicine & Health',
        text: 'Integrated education across medicine, dentistry, pharmacy, nursing and allied health.',
        items: ['MBBS', 'BDS', 'Pharmacy', 'Public Health'],
      },
      {
        n: '03',
        title: 'Business, Law & Humanities',
        text: 'Learn to lead organisations, shape policy and understand the systems around us.',
        items: ['MBA', 'BA LLB', 'Commerce', 'Liberal Arts'],
      },
    ],
  },
  '/admissions': {
    eyebrow: 'Admissions 2026',
    title: 'There is more than one way to begin.',
    intro:
      'Find the route that fits your goals. We will guide you from programme discovery through application and arrival.',
    image: images.walk,
    imageAlt: 'Students walking together through campus',
    stats: [
      ['10 min', 'Typical application'],
      ['100+', 'Scholarship categories'],
      ['80+', 'Countries represented'],
      ['6', 'Campus choices'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Undergraduate',
        text: 'For students completing higher secondary education and ready to begin their first degree.',
        items: ['Explore programmes', 'Check eligibility', 'SRMJEEE', 'Apply online'],
      },
      {
        n: '02',
        title: 'Postgraduate & Doctoral',
        text: 'Advanced learning and research pathways for graduates and working professionals.',
        items: ['Master’s programmes', 'PhD admissions', 'Research areas', 'Funding'],
      },
      {
        n: '03',
        title: 'International students',
        text: 'One application journey with dedicated counselling, visa and on-campus support.',
        items: ['Entry requirements', 'Fees', 'Visa support', 'Accommodation'],
      },
    ],
  },
  '/research': {
    eyebrow: 'Research & innovation',
    title: 'Big questions belong to everyone.',
    intro:
      'Researchers from technology, health, science and society work across boundaries to turn new knowledge into public value.',
    image: images.lab,
    imageAlt: 'Scientist conducting research in a laboratory',
    stats: [
      ['920+', 'Patents'],
      ['47K+', 'Publications'],
      ['₹250 Cr+', 'External funding'],
      ['60+', 'Centres & labs'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Centres & laboratories',
        text: 'Shared research infrastructure supports work from nanotechnology to high-performance computing.',
        items: ['Nanotechnology', 'SCIF', 'Medical Research', 'HPCC'],
      },
      {
        n: '02',
        title: 'Innovation ecosystem',
        text: 'Mentors, makerspaces and incubation help university ideas move into the world.',
        items: ['Incubation', 'Student startups', 'Industry partnerships', 'Patents'],
      },
      {
        n: '03',
        title: 'Research with impact',
        text: 'Priority themes respond to India’s needs and global challenges.',
        items: ['Health', 'Climate', 'Future mobility', 'Responsible AI'],
      },
    ],
  },
  '/campus-life': {
    eyebrow: 'Life at SRMIST',
    title: 'A campus with room for every version of you.',
    intro:
      'Live, play, create and find your people in a community where the day rarely ends with the timetable.',
    image: images.students,
    imageAlt: 'University students working together',
    stats: [
      ['50K+', 'Students'],
      ['40+', 'Clubs & teams'],
      ['15+', 'Sports facilities'],
      ['24/7', 'Campus support'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Live well',
        text: 'Thoughtfully designed hostels, diverse dining, healthcare and practical everyday support.',
        items: ['Accommodation', 'Dining', 'Health centre', 'Transport'],
      },
      {
        n: '02',
        title: 'Find your people',
        text: 'Clubs, cultural groups and student chapters make it easy to turn interests into community.',
        items: ['Arts & culture', 'Student clubs', 'NCC & NSS', 'Milan Fest'],
      },
      {
        n: '03',
        title: 'Move & compete',
        text: 'Facilities and teams for athletes, beginners and everyone in between.',
        items: ['Athletics', 'Fitness', 'Team sports', 'Tournaments'],
      },
    ],
  },
  '/programmes': {
    eyebrow: 'Programme finder',
    title: 'Find the course that fits your curiosity.',
    intro:
      'Explore undergraduate, postgraduate and doctoral study across technology, health, business, law, science and the humanities.',
    image: images.class,
    imageAlt: 'Students participating in a university class',
    stats: [
      ['300+', 'Programmes'],
      ['8', 'Academic faculties'],
      ['3', 'Study levels'],
      ['6', 'Campus choices'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Undergraduate study',
        text: 'Build strong foundations, learn through practice and discover where your interests can take you.',
        items: ['B.Tech', 'MBBS & BDS', 'BBA & B.Com', 'Law & Humanities'],
      },
      {
        n: '02',
        title: 'Postgraduate study',
        text: 'Deepen your expertise through advanced coursework, industry projects and specialist pathways.',
        items: ['M.Tech', 'MBA', 'M.Sc', 'Health Sciences'],
      },
      {
        n: '03',
        title: 'Doctoral research',
        text: 'Join active research communities with access to specialist laboratories and experienced supervisors.',
        items: ['Research areas', 'Supervisors', 'Funding', 'PhD admissions'],
      },
    ],
  },
  '/international': {
    eyebrow: 'International at SRMIST',
    title: 'Bring your world. Discover another.',
    intro:
      'Study in Chennai as part of a community shaped by students and university partners from around the globe.',
    image: images.students,
    imageAlt: 'A diverse group of university students working together',
    stats: [
      ['80+', 'Countries represented'],
      ['200+', 'Global partners'],
      ['35+', 'Study abroad destinations'],
      ['1', 'Global community'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Come to SRM',
        text: 'Dedicated advisers support international students from first enquiry through arrival and orientation.',
        items: ['International admission', 'Visa support', 'Fees', 'Arrival guide'],
      },
      {
        n: '02',
        title: 'Go beyond SRM',
        text: 'Study abroad, transfer and short immersion options turn one degree into a global experience.',
        items: ['Semester abroad', 'Twinning', 'Transfer', 'Global immersion'],
      },
      {
        n: '03',
        title: 'Partnerships',
        text: 'Academic collaboration connects our classrooms and laboratories to institutions around the world.',
        items: ['Partner universities', 'Joint research', 'Visiting faculty', 'Advisory board'],
      },
    ],
  },
  '/placements': {
    eyebrow: 'Careers & placements',
    title: 'Turn what you know into where you go.',
    intro:
      'Career preparation starts early, combining skills, experience, mentoring and access to an extensive recruiter network.',
    image: images.walk,
    imageAlt: 'University students walking toward their future',
    stats: [
      ['980+', 'Recruiters'],
      ['5,546+', 'Offers'],
      ['52 LPA', 'Highest CTC'],
      ['7.19 LPA', 'Average CTC'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Prepare',
        text: 'Build communication, problem-solving and interview confidence through structured career preparation.',
        items: ['Career coaching', 'Aptitude', 'Mock interviews', 'Portfolio support'],
      },
      {
        n: '02',
        title: 'Experience',
        text: 'Apply classroom learning through internships, industry projects and entrepreneurial opportunities.',
        items: ['Internships', 'Live briefs', 'Industry projects', 'Startups'],
      },
      {
        n: '03',
        title: 'Connect',
        text: 'Meet organisations across technology, health, consulting, manufacturing and emerging industries.',
        items: ['Campus recruitment', 'Career fairs', 'Alumni network', 'Recruiter partners'],
      },
    ],
  },
  '/rankings': {
    eyebrow: 'Rankings & accreditation',
    title: 'Measured by standards. Defined by impact.',
    intro:
      'Independent rankings and accreditation recognise the scale, quality and consistency of SRMIST education and research.',
    image: images.building,
    imageAlt: 'SRMIST university architecture',
    stats: [
      ['A++', 'NAAC grade'],
      ['12', 'NIRF University'],
      ['13', 'NIRF Engineering'],
      ['7', 'NIRF Dental'],
    ],
    blocks: [
      {
        n: '01',
        title: 'National recognition',
        text: 'SRMIST is assessed across teaching, research, graduation outcomes and public perception.',
        items: ['NIRF University', 'NIRF Engineering', 'NIRF Research', 'NIRF Dental'],
      },
      {
        n: '02',
        title: 'Accreditation',
        text: 'Rigorous institutional and programme reviews support a culture of continuous improvement.',
        items: ['NAAC A++', 'UGC', 'AICTE', 'Programme accreditation'],
      },
      {
        n: '03',
        title: 'Global outlook',
        text: 'International benchmarks reflect the university’s research reach and global academic connections.',
        items: ['QS', 'THE', 'Nature Index', 'Global partnerships'],
      },
    ],
  },
  '/scholarships': {
    eyebrow: 'Scholarships & aid',
    title: 'Talent should decide how far you go.',
    intro:
      'Merit, achievement and need-based support help ambitious students access the opportunities available at SRMIST.',
    image: images.library,
    imageAlt: 'Student studying in a university library',
    stats: [
      ['100+', 'Award categories'],
      ['₹48 Cr+', 'Annual support'],
      ['4', 'Support pathways'],
      ['Every year', 'New awards'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Merit scholarships',
        text: 'Academic performance and entrance results can unlock significant tuition support.',
        items: ['Founder’s scholarship', 'SRMJEEE merit', 'Board merit', 'Academic renewal'],
      },
      {
        n: '02',
        title: 'Achievement awards',
        text: 'Exceptional contribution in sport, culture and innovation is recognised and supported.',
        items: ['Sports', 'Arts & culture', 'Innovation', 'National achievement'],
      },
      {
        n: '03',
        title: 'Access & inclusion',
        text: 'Targeted assistance helps students navigate financial barriers and unexpected circumstances.',
        items: ['Need-based aid', 'Community support', 'Education loans', 'Adviser guidance'],
      },
    ],
  },
  '/events': {
    eyebrow: 'News & events',
    title: 'The university is always in motion.',
    intro:
      'Lectures, festivals, competitions, discoveries and community milestones bring the SRMIST calendar to life.',
    image: images.students,
    imageAlt: 'Students gathering for a university event',
    stats: [
      ['365', 'Days of activity'],
      ['40+', 'Student communities'],
      ['6', 'Campus calendars'],
      ['1', 'Shared culture'],
    ],
    blocks: [
      {
        n: '01',
        title: 'On campus',
        text: 'Public lectures, workshops and celebrations create new reasons to gather every week.',
        items: ['Upcoming events', 'Academic calendar', 'Guest lectures', 'Convocation'],
      },
      {
        n: '02',
        title: 'Student-led',
        text: 'Teams and societies turn ideas into festivals, competitions and cultural experiences.',
        items: ['Milan', 'Aaruush', 'Sports', 'Clubs & chapters'],
      },
      {
        n: '03',
        title: 'Latest stories',
        text: 'Meet the students, researchers and alumni behind recent achievements.',
        items: ['Research news', 'Student success', 'Alumni stories', 'University announcements'],
      },
    ],
  },
  '/library': {
    eyebrow: 'University library',
    title: 'A place to read deeply and think widely.',
    intro:
      'Discover print collections, digital resources, research support and calm spaces designed for focused study.',
    image: images.library,
    imageAlt: 'Student reading inside a university library',
    stats: [
      ['24/7', 'Digital access'],
      ['Print', 'Core collections'],
      ['Digital', 'Journals & databases'],
      ['6', 'Campus networks'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Find information',
        text: 'Search books, journals, databases and specialist collections through one connected discovery experience.',
        items: ['Library catalogue', 'E-journals', 'Databases', 'Institutional repository'],
      },
      {
        n: '02',
        title: 'Study your way',
        text: 'Choose individual focus areas, collaborative tables and digital workspaces across the library network.',
        items: ['Study spaces', 'Group rooms', 'Computer access', 'Opening hours'],
      },
      {
        n: '03',
        title: 'Research support',
        text: 'Get practical help with discovery, citations, publishing and responsible use of information.',
        items: ['Research consultations', 'Referencing', 'Open access', 'Information literacy'],
      },
    ],
  },
  '/alumni': {
    eyebrow: 'SRMIST alumni',
    title: 'The campus stays with you.',
    intro:
      'A global community of graduates continues to share experience, open doors and shape the university’s next chapter.',
    image: images.walk,
    imageAlt: 'Graduates walking together through a university campus',
    stats: [
      ['Global', 'Alumni community'],
      ['Every field', 'Shared experience'],
      ['Since 1985', 'Growing network'],
      ['One SRM', 'Lifelong connection'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Stay connected',
        text: 'Reconnect with classmates, update your profile and join alumni communities wherever you are.',
        items: ['Alumni portal', 'Chapters', 'Reunions', 'Update your details'],
      },
      {
        n: '02',
        title: 'Give experience',
        text: 'Mentoring, talks and industry connections help current students learn from those who came before.',
        items: ['Become a mentor', 'Host an intern', 'Guest talks', 'Career network'],
      },
      {
        n: '03',
        title: 'Keep learning',
        text: 'University events and professional connections make graduation a beginning rather than an ending.',
        items: ['Events', 'Professional learning', 'Campus visits', 'Alumni stories'],
      },
    ],
  },
  '/examinations': {
    eyebrow: 'Examinations',
    title: 'Everything you need, when it matters.',
    intro:
      'A clearer route to examination schedules, hall information, academic rules, results and student support.',
    image: images.class,
    imageAlt: 'Students preparing for university examinations',
    stats: [
      ['Schedules', 'In one place'],
      ['Online', 'Results access'],
      ['Clear', 'Academic guidance'],
      ['Supported', 'Student queries'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Before your examination',
        text: 'Check dates, eligibility, registration guidance and the practical information needed to prepare.',
        items: ['Exam timetable', 'Registration', 'Hall ticket', 'Academic calendar'],
      },
      {
        n: '02',
        title: 'Results & records',
        text: 'Access result information and understand the next steps for reviews and academic documentation.',
        items: ['Results', 'Grade cards', 'Revaluation', 'Transcripts'],
      },
      {
        n: '03',
        title: 'Rules & support',
        text: 'Find transparent examination policies and the right team for questions that need personal help.',
        items: ['Regulations', 'Student queries', 'Forms', 'Contact examinations'],
      },
    ],
  },
  '/departments': {
    eyebrow: 'Departments A–Z',
    title: 'Every discipline. One connected university.',
    intro:
      'Move across SRMIST’s academic landscape and find departments, people and programmes by area of interest.',
    image: images.building,
    imageAlt: 'Academic buildings on a university campus',
    stats: [
      ['8', 'Academic faculties'],
      ['300+', 'Programmes'],
      ['A–Z', 'Department directory'],
      ['6', 'Campus choices'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Technology & science',
        text: 'Explore departments advancing computing, engineering, architecture and the fundamental sciences.',
        items: ['Computing', 'Engineering', 'Architecture', 'Science'],
      },
      {
        n: '02',
        title: 'Health & medicine',
        text: 'Find connected learning across medicine, dentistry, pharmacy, nursing and allied health.',
        items: ['Medicine', 'Dentistry', 'Pharmacy', 'Allied Health'],
      },
      {
        n: '03',
        title: 'Business & society',
        text: 'Discover departments focused on management, law, agriculture, hospitality and the humanities.',
        items: ['Management', 'Law', 'Agriculture', 'Humanities'],
      },
    ],
  },
  '/about': {
    eyebrow: 'About SRMIST',
    title: 'Four decades of learning without limits.',
    intro:
      'What began in 1985 has grown into a multidisciplinary university connected to communities, industries and ideas around the world.',
    image: images.building,
    imageAlt: 'A large Indian university building',
    stats: [
      ['1985', 'Established'],
      ['A++', 'NAAC grade'],
      ['200+', 'Global partners'],
      ['80+', 'Countries represented'],
    ],
    blocks: [
      {
        n: '01',
        title: 'Our story',
        text: 'A history of widening access, building capability and anticipating the needs of a changing world.',
        items: ['History', 'Vision', 'Leadership', 'Governance'],
      },
      {
        n: '02',
        title: 'Recognition',
        text: 'Independent rankings and accreditations reflect consistent investment in learning and research.',
        items: ['NAAC A++', 'NIRF', 'QS Rankings', 'Awards'],
      },
      {
        n: '03',
        title: 'One SRM, many places',
        text: 'Six distinctive campuses share one standard of education and a connected culture.',
        items: ['Kattankulathur', 'Ramapuram', 'Vadapalani', 'Tiruchirappalli'],
      },
    ],
  },
}

function InteriorPage({ path }: { path: ContentRoute }) {
  const data = pageData[path]
  const isAdmissions = path === '/admissions'
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="interior">
      <section className="page-hero">
        <div className="page-title">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
        </div>
        <figure>
          <img src={data.image} alt={data.imageAlt} />
          <figcaption>SRMIST · Chennai</figcaption>
        </figure>
      </section>

      <section className="page-stats">
        {data.stats.map(([value, label]) => (
          <div key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="page-intro">
        <span className="eyebrow">Explore the possibilities</span>
        <h2>
          {path === '/research'
            ? 'From curiosity to consequence.'
            : path === '/campus-life'
              ? 'Make the campus yours.'
              : 'Find the path made for you.'}
        </h2>
      </section>

      <section className="content-blocks">
        {data.blocks.map((block) => (
          <article key={block.n}>
            <span>{block.n}</span>
            <div>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </div>
            <ul>
              {block.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="split-feature">
        <img
          src={path === '/research' ? images.library : images.campus}
          alt="Life and learning at university"
        />
        <div>
          <span className="eyebrow">
            {isAdmissions ? 'Need help deciding?' : 'Connected by purpose'}
          </span>
          <h2>
            {isAdmissions
              ? 'Talk to our admissions team.'
              : 'Learning extends beyond every classroom.'}
          </h2>
          <p>
            {isAdmissions
              ? 'Tell us what you are interested in and our counsellors will help you understand the right next step.'
              : 'Industry, communities and global universities join our students and faculty in work that matters.'}
          </p>
          <a className="text-link" href={isAdmissions ? 'tel:+917026452645' : '/about'}>
            {isAdmissions ? 'Call +91 70 2645 2645' : 'Meet our community'} <Arrow />
          </a>
        </div>
      </section>

      {isAdmissions && (
        <section className="enquiry">
          <div>
            <span className="eyebrow">Admission enquiry</span>
            <h2>Start a conversation.</h2>
            <p>No commitment—just useful guidance for your next step.</p>
            <LinkButton to="/apply">Begin online application</LinkButton>
          </div>
          {submitted ? (
            <div className="form-success">
              <b>Thank you.</b>
              <p>We’ll be in touch with the next steps.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label>
                Full name
                <input required placeholder="Your name" />
              </label>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <label>
                Study level
                <select defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Doctoral</option>
                </select>
              </label>
              <button className="button" type="submit">
                Send enquiry <Arrow />
              </button>
            </form>
          )}
        </section>
      )}
    </main>
  )
}

type ApplicationStep = {
  path: ApplyRoute
  label: string
}

const applicationSteps: ApplicationStep[] = [
  { path: '/apply', label: 'Start' },
  { path: '/apply/programme', label: 'Programme' },
  { path: '/apply/details', label: 'Your details' },
  { path: '/apply/review', label: 'Review' },
]

function ApplicationPage({ path }: { path: ApplyRoute }) {
  const step = applicationSteps.findIndex((item) => item.path === path)
  const [sent, setSent] = useState(false)

  return (
    <main className="application-page">
      <aside className="application-aside">
        <div>
          <span className="eyebrow">SRMIST admissions · 2026</span>
          <h1>Your future starts with one small step.</h1>
          <p>Save your progress at any stage. Most applicants finish in around 10 minutes.</p>
        </div>
        <div className="apply-orbit" aria-hidden="true">
          <span className="orbit-book">BOOK</span>
          <span className="orbit-code">&lt;/&gt;</span>
          <span className="orbit-atom">A+</span>
          <i />
        </div>
        <small>Need help? +91 70 2645 2645</small>
      </aside>
      <section className="application-workspace">
        <div className="application-progress">
          {applicationSteps.map((item, index) => (
            <a className={index <= step ? 'done' : ''} href={item.path} key={item.path}>
              <span>{index + 1}</span>
              {item.label}
            </a>
          ))}
        </div>

        {path === '/apply' && (
          <div className="application-panel">
            <span className="eyebrow">Step 1 of 4</span>
            <h2>How would you like to apply?</h2>
            <p className="panel-lede">Choose the pathway that best describes you.</p>
            <div className="choice-cards">
              <label>
                <input type="radio" name="pathway" defaultChecked />
                <span>01</span>
                <b>Indian applicant</b>
                <small>Indian citizen or resident applying to a programme in India.</small>
              </label>
              <label>
                <input type="radio" name="pathway" />
                <span>02</span>
                <b>International applicant</b>
                <small>International citizen, NRI or sponsored candidate.</small>
              </label>
            </div>
            <a className="button apply-next" href="/apply/programme">
              Continue <Arrow />
            </a>
          </div>
        )}

        {path === '/apply/programme' && (
          <div className="application-panel">
            <span className="eyebrow">Step 2 of 4</span>
            <h2>Choose your direction.</h2>
            <p className="panel-lede">You can change these choices before submitting.</p>
            <div className="application-fields">
              <label>
                Study level
                <select defaultValue="">
                  <option value="" disabled>
                    Select a level
                  </option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Doctoral</option>
                </select>
              </label>
              <label>
                Field of study
                <select defaultValue="">
                  <option value="" disabled>
                    Select a field
                  </option>
                  {disciplines.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Preferred campus
                <select defaultValue="">
                  <option value="" disabled>
                    Select a campus
                  </option>
                  <option>Kattankulathur — Chennai</option>
                  <option>Ramapuram — Chennai</option>
                  <option>Vadapalani — Chennai</option>
                  <option>Tiruchirappalli</option>
                </select>
              </label>
              <label>
                Intake
                <select defaultValue="2026">
                  <option>2026</option>
                  <option>2027</option>
                </select>
              </label>
            </div>
            <div className="apply-buttons">
              <a href="/apply">Back</a>
              <a className="button apply-next" href="/apply/details">
                Continue <Arrow />
              </a>
            </div>
          </div>
        )}

        {path === '/apply/details' && (
          <div className="application-panel">
            <span className="eyebrow">Step 3 of 4</span>
            <h2>Tell us about you.</h2>
            <p className="panel-lede">Use an email and phone number you can access regularly.</p>
            <div className="application-fields">
              <label>
                First name
                <input required placeholder="Your first name" />
              </label>
              <label>
                Last name
                <input required placeholder="Your last name" />
              </label>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <label>
                Mobile number
                <input required type="tel" placeholder="+91 00000 00000" />
              </label>
              <label>
                Date of birth
                <input type="date" />
              </label>
              <label>
                Current city
                <input placeholder="City, State" />
              </label>
            </div>
            <label className="consent">
              <input type="checkbox" /> I agree to receive application updates from SRMIST.
            </label>
            <div className="apply-buttons">
              <a href="/apply/programme">Back</a>
              <a className="button apply-next" href="/apply/review">
                Review application <Arrow />
              </a>
            </div>
          </div>
        )}

        {path === '/apply/review' && (
          <div className="application-panel">
            {sent ? (
              <div className="application-success">
                <span className="success-mark">
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <span className="eyebrow">Application received</span>
                <h2>You’re on your way.</h2>
                <p>
                  Your reference is SRM26-1847. A confirmation has been prepared for your email.
                </p>
                <a className="button" href="/">
                  Return to homepage <Arrow />
                </a>
              </div>
            ) : (
              <>
                <span className="eyebrow">Step 4 of 4</span>
                <h2>One last look.</h2>
                <p className="panel-lede">
                  Confirm the sections below, then submit your application.
                </p>
                <div className="review-list">
                  <a href="/apply">
                    <span>Application pathway</span>
                    <b>Indian applicant</b>
                    <small>Edit</small>
                  </a>
                  <a href="/apply/programme">
                    <span>Programme choice</span>
                    <b>Undergraduate · Engineering</b>
                    <small>Edit</small>
                  </a>
                  <a href="/apply/details">
                    <span>Personal details</span>
                    <b>Contact and identity information</b>
                    <small>Edit</small>
                  </a>
                </div>
                <label className="consent">
                  <input type="checkbox" /> I confirm that the information provided is accurate.
                </label>
                <div className="apply-buttons">
                  <a href="/apply/details">Back</a>
                  <button className="button apply-next" onClick={() => setSent(true)}>
                    Submit application <Arrow />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return allRoutes.includes(path as Route) ? (path as Route) : '/'
}

export default function SiteClient({ initialPath = '/' }: { initialPath?: Route }) {
  const [path, setPath] = useState<Route>(initialPath)
  const [showIdent, setShowIdent] = useState(initialPath === '/')

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor || anchor.target || anchor.origin !== window.location.origin) return
      const next = anchor.getAttribute('href')
      if (!next?.startsWith('/') || next.startsWith('//')) return
      event.preventDefault()
      window.history.pushState({}, '', next)
      setPath(getRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const pop = () => setPath(getRoute())
    document.addEventListener('click', navigate)
    window.addEventListener('popstate', pop)
    return () => {
      document.removeEventListener('click', navigate)
      window.removeEventListener('popstate', pop)
    }
  }, [])

  useEffect(() => {
    document.title =
      path === '/'
        ? 'SRMIST — Learn. Leap. Lead.'
        : path.startsWith('/apply')
          ? 'Apply to SRMIST'
          : `${routes.find((route) => route.path === path)?.label ?? pageData[path as ContentRoute]?.eyebrow} — SRMIST`
  }, [path])

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(
        '.home-curtain > section:not(.intro-panel), .interior > section, .content-blocks article, .pathway-grid a, .story-stack article, .footer-grid > div',
      )
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('motion-in')
              observer?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
      )
      elements.forEach((element, index) => {
        element.classList.add('motion-reveal')
        ;(element as HTMLElement).style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`)
        observer?.observe(element)
      })
    }, 40)
    return () => {
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [path])

  useEffect(() => {
    const light = document.querySelector<HTMLElement>('.cursor-light')
    if (!light || !window.matchMedia('(pointer:fine)').matches) return
    const move = (event: MouseEvent) => {
      light.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const isApply = path.startsWith('/apply')

  return (
    <div>
      {showIdent && <NetflixIdent onComplete={() => setShowIdent(false)} />}
      <div className="cursor-light" aria-hidden="true" />
      <Header path={path} />
      {path === '/' ? (
        <Home active={!showIdent} />
      ) : isApply ? (
        <ApplicationPage path={path as ApplyRoute} />
      ) : (
        <InteriorPage path={path as ContentRoute} />
      )}
      {!isApply && <Footer />}
      <AIAssistant />
    </div>
  )
}
