import { allTales } from 'contentlayer/generated'
import Link from 'next/link'
import { Interactions } from '@/app/components/interactions'
import { InteractionBar } from '@/app/components/interaction-bar'
import { createClient } from '@/utils/supabase/server'

// --- MOCK DATA (In a real app, you'd fetch this from a database based on the slug) ---
const mockReactions = [
  { emoji: '❤️', label: 'love', count: 27 },
  { emoji: '🙏', label: 'thanks', count: 18 },
  { emoji: '😮', label: 'surprised', count: 5 },
  { emoji: '😢', label: 'sad', count: 11 },
]
// --- END MOCK DATA ---

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
  const reactions = mockReactions
  //const comments = mockComments

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
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold">{tale.title}</h1>
      </div>

      {/* --- NEW INTERACTION BAR --- */}
      <InteractionBar reactions={reactions} commentCount={comments?.length ?? 0} />

      {/* --- STORY CONTENT --- */}
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />

      {/* --- INTERACTION SECTION AT THE BOTTOM --- */}
      <Interactions initialReactions={reactions} initialComments={comments ?? []} slug={params.slug} />
    </article>
  )
}

export default TaleLayout