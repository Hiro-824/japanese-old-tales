import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allTales, Tale } from 'contentlayer/generated'

function TaleCard(tale: Tale) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={tale.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {tale.title}
        </Link>
      </h2>
      <time dateTime={tale.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(tale.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />
    </div>
  )
}

export default function Home() {
  const tales = allTales.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Next.js + Contentlayer Example</h1>
      {tales.map((tale, idx) => (
        <TaleCard key={idx} {...tale} />
      ))}
    </div>
  )
}