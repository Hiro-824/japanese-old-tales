import { format, parseISO } from 'date-fns'
import { allTales } from 'contentlayer/generated'

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
      <div className="mb-8 text-center">
        <time dateTime={tale.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(tale.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{tale.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />
    </article>
  )
}

export default TaleLayout