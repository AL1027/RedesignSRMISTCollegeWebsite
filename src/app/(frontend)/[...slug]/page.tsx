import { notFound } from 'next/navigation'
import SiteClient from '../site-client'

const routes = [
  'academics',
  'admissions',
  'research',
  'campus-life',
  'about',
  'programmes',
  'international',
  'placements',
  'rankings',
  'scholarships',
  'events',
  'library',
  'alumni',
  'examinations',
  'departments',
  'apply',
  'apply/programme',
  'apply/details',
  'apply/review',
] as const

type RoutePath = `/${(typeof routes)[number]}`

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.split('/') }))
}

export const dynamicParams = false

export default async function SitePage({ params }: PageProps<'/[...slug]'>) {
  const { slug } = await params
  const route = slug.join('/')
  if (!routes.includes(route as (typeof routes)[number])) notFound()
  return <SiteClient initialPath={`/${route}` as RoutePath} />
}
