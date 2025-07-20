import { createClient } from '@/utils/supabase/server'
import { REACTION_DEFINITIONS } from '@/app/lib/interaction-types'
import { TaleContent } from '@/app/components/tale-content'
import { Tale } from '.contentlayer/generated/types';

type InteractionsLoaderProps = {
  tale: Tale;
  slug: string;
}

// This is a new async Server Component
export async function InteractionsLoader({ tale, slug }: InteractionsLoaderProps) {
  // The slow database queries are now isolated in this component
  const supabase = createClient();
  
  // We can fetch in parallel to make it a bit faster
  const [commentsResult, reactionsResult] = await Promise.all([
    supabase
      .from('comments')
      .select()
      .eq('slug', slug)
      .order('created_at', { ascending: false }),
    supabase
      .from('tale_reactions')
      .select('reaction_type, count')
      .eq('slug', slug)
  ]);

  const { data: comments, error: commentsError } = commentsResult;
  const { data: reactionCounts, error: reactionsError } = reactionsResult;
  
  if (commentsError || reactionsError) {
    // In a real app, you'd want better error handling
    console.error(commentsError || reactionsError);
  }

  const countsMap = new Map(reactionCounts?.map(r => [r.reaction_type, r.count]) || []);
  const reactions = REACTION_DEFINITIONS.map(def => ({
    ...def,
    count: countsMap.get(def.label) || 0,
  }));

  // Once data is ready, we render the client component with it
  return (
    <TaleContent
      tale={tale}
      initialReactions={reactions}
      initialComments={comments ?? []}
      slug={slug}
    />
  )
}