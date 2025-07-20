'use client'

import { formatRelativeDate } from '@/utils/formatDate'
import { Comment, Reaction } from '../lib/interaction-types'

type InteractionsProps = {
  reactions: Reaction[];
  comments: Comment[];
  selectedReaction: Reaction | null;
  onReactionClick: (reaction: Reaction) => void;
  onCommentSubmit: (commentData: { nickname: string; text: string }) => void;
}

export function Interactions({
  reactions,
  comments,
  selectedReaction,
  onReactionClick,
  onCommentSubmit
}: InteractionsProps) {
  // State and handlers are removed from here. They now live in the parent.

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nickname = formData.get('nickname') as string
    const text = formData.get('comment') as string

    if (!nickname.trim() || !text.trim()) {
      alert('Please provide a nickname and a comment.')
      return
    }

    // Call the parent handler
    onCommentSubmit({ nickname, text });
    event.currentTarget.reset()
  }

  return (
    <div id="interactions" className="mt-16 pt-12 border-t border-gray-200 mb-40">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">What did you think?</h2>
        <div className="flex justify-center gap-2 sm:gap-4">
          {reactions.map((reaction) => (
            <button
              key={reaction.label}
              // Call the parent handler
              onClick={() => onReactionClick(reaction)}
              aria-label={`React with ${reaction.label}`}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                ${selectedReaction?.label === reaction.label
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200'
                }`}
            >
              <span className="text-xl -ml-1">{reaction.emoji}</span>
              <span className="font-medium text-gray-700">{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6">Comments ({comments.length})</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
          {/* ... The rest of the form JSX remains exactly the same ... */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., StoryLover"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Your Comment
              </label>
              <textarea
                name="comment"
                id="comment"
                rows={3}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Share your thoughts on the tale..."
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Comment
            </button>
          </div>
        </form>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-serif">
                {comment.nickname?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {comment.nickname}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {formatRelativeDate(comment.created_at)}
                  </span>
                </p>
                <p className="mt-1 text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}