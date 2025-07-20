import { allTales } from 'contentlayer/generated'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { REACTION_DEFINITIONS } from '@/app/lib/interaction-types'
import { TaleContent } from '@/app/components/tale-content' // Import the new wrapper

// Mock data is no longer needed here as we fetch real data
// ...

export const generateStaticParams = async () => allTales.map((tale) => ({ slug: tale._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)
  return { title: tale.title }
}

const TaleLayout = async ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)

  const supabase = createClient();
  const { data: comments, error } = await supabase
    .from('comments')
    .select()
    .eq('slug', params.slug)
    .order('created_at', { ascending: false });

  const { data: reactionCounts, error: reactionsError } = await supabase
    .from('tale_reactions')
    .select('reaction_type, count')
    .eq('slug', params.slug);

  const countsMap = new Map(reactionCounts?.map(r => [r.reaction_type, r.count]) || []);
  const reactions = REACTION_DEFINITIONS.map(def => ({
    ...def,
    count: countsMap.get(def.label) || 0,
  }));

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

      {/* --- RENDER THE CLIENT WRAPPER --- */}
      {/* We pass all the fetched data and content to this single client component */}
      <TaleContent
        tale={tale}
        initialReactions={reactions}
        initialComments={comments ?? []}
        slug={params.slug}
      />
    </article>
  )
}

export default TaleLayout