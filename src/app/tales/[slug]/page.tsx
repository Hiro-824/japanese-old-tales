import { format, parseISO } from 'date-fns'
import { allTales } from 'contentlayer/generated'
import Link from 'next/link'

export const generateStaticParams = async () => allTales.map((tale) => ({ slug: tale._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)
  return { title: tale.title }
}

const TaleLayout = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-4">
        <Link href="/" className="inline-block text-2xl hover:underline" aria-label="Back to top page">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
      </div>
      <div className="mt-8 mb-8 text-left">
        <h1 className="text-3xl font-bold">{tale.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />
    </article>
  )
}

export default TaleLayout