import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { allTales, Tale } from 'contentlayer/generated'

function TaleCard(tale: Tale) {
  return (
    <Link 
      href={tale.url}
      className="block p-4 rounded-lg transition-transform transition-colors active:scale-105 md:hover:scale-105 md:hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <h2 className="mb-1 text-xl text-black">
        {tale.title}
      </h2>
      <p className="text-sm text-gray-500">{tale.tagline}</p>
    </Link>
  )
}

export default function Home() {
  const tales = allTales.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8 px-4">
      <h1 className="mb-8 text-center text-2xl font-black">Japanese Old Tales</h1>
      {tales.map((tale) => (
        <TaleCard key={tale.url} {...tale} />
      ))}
    </div>
  )
}