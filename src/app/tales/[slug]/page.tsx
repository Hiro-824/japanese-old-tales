import { allTales } from 'contentlayer/generated'
import Link from 'next/link'
import { Interactions } from '@/app/components/interactions'
import { InteractionBar } from '@/app/components/interaction-bar'

// --- MOCK DATA (In a real app, you'd fetch this from a database based on the slug) ---
const mockReactions = [
  { emoji: '❤️', label: 'love', count: 27 },
  { emoji: '🙏', label: 'thanks', count: 18 },
  { emoji: '😮', label: 'surprised', count: 5 },
  { emoji: '😢', label: 'sad', count: 11 },
]
const mockComments = [
  { id: 1, nickname: 'Bookworm', timestamp: '2 days ago', text: 'What a beautiful and timeless story. It really makes you think.' },
  { id: 2, nickname: 'Taro', timestamp: '1 day ago', text: 'I remember my grandmother telling me this tale when I was a child. Thank you for bringing back the memories!' },
]
// --- END MOCK DATA ---

export const generateStaticParams = async () => allTales.map((tale) => ({ slug: tale._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)
  return { title: tale.title }
}

const TaleLayout = ({ params }: { params: { slug: string } }) => {
  const tale = allTales.find((tale) => tale._raw.flattenedPath === params.slug)
  if (!tale) throw new Error(`Tale not found for slug: ${params.slug}`)

  // In a real app, you would fetch these based on `params.slug`
  const reactions = mockReactions
  const comments = mockComments

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
      <InteractionBar reactions={reactions} commentCount={comments.length} />

      {/* --- STORY CONTENT --- */}
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />

      {/* --- INTERACTION SECTION AT THE BOTTOM --- */}
      <Interactions initialReactions={reactions} initialComments={comments} />
    </article>
  )
}

export default TaleLayout