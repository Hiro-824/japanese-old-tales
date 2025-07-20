import { Suspense } from 'react';
import { allTales } from 'contentlayer/generated'
import Link from 'next/link'
import { InteractionsLoader } from '@/app/components/interactions-loader';
import { InteractionsSkeleton } from '@/app/components/interactions-skeleton';

export const generateStaticParams = async () => allTales.map((tale) => ({ slug: tale._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)
  return { title: tale.title }
}

const TaleLayout = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)

  // Data fetching is REMOVED from the main page component.
  // It's now handled inside InteractionsLoader.

  return (
    <article className="prose mx-auto max-w-xl py-8 px-4">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-block p-2 -m-2 text-2xl transition-transform rounded-full hover:bg-gray-100 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
          aria-label="Back to top page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
      </div>

      {/* --- Wrap the slow part in Suspense --- */}
      <Suspense fallback={<InteractionsSkeleton />}>
        {/* 
          This async component will be awaited on the server.
          While it's loading, the fallback will be shown instantly.
          The page's static content is outside the Suspense boundary, 
          so it renders immediately.
        */}
        <InteractionsLoader tale={tale} slug={params.slug} />
      </Suspense>

    </article>
  )
}

export default TaleLayout