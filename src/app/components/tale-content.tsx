'use client'

import { useState } from 'react'
import { InteractionBar } from './interaction-bar'
import { Interactions } from './interactions'
import { insertData, updateReaction } from '../insert/actions'
import { Comment, Reaction } from '../lib/interaction-types'
import { Tale } from '.contentlayer/generated/types'

type TaleContentProps = {
  tale: Tale; // Using the Tale type from contentlayer
  initialReactions: Reaction[];
  initialComments: Comment[];
  slug: string;
}

export function TaleContent({ tale, initialReactions, initialComments, slug }: TaleContentProps) {
  // --- STATE LIFTED FROM Interactions component ---
  const [reactions, setReactions] = useState(initialReactions)
  const [comments, setComments] = useState(initialComments)
  
  // We keep track of the selected reaction in the parent now
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null)

  // --- HANDLERS LIFTED FROM Interactions component ---
  const handleReactionClick = (reaction: Reaction) => {
    const oldSelected = selectedReaction;
    let newReactions = [...reactions];

    if (oldSelected?.label === reaction.label) {
      newReactions = newReactions.map(r =>
        r.label === reaction.label ? { ...r, count: r.count - 1 } : r
      );
      setSelectedReaction(null);
      updateReaction(slug, reaction.label, 'decrement');
    } else {
      if (oldSelected) {
        newReactions = newReactions.map(r =>
          r.label === oldSelected.label ? { ...r, count: r.count - 1 } : r
        );
        updateReaction(slug, oldSelected.label, 'decrement');
      }
      newReactions = newReactions.map(r =>
        r.label === reaction.label ? { ...r, count: r.count + 1 } : r
      );
      setSelectedReaction(reaction);
      updateReaction(slug, reaction.label, 'increment');
    }
    setReactions(newReactions);
  }

  const handleCommentSubmit = (newCommentData: Omit<Comment, 'id' | 'created_at' | 'slug'>) => {
    const newComment: Comment = {
      id: Date.now(),
      slug: slug,
      nickname: newCommentData.nickname,
      text: newCommentData.text,
      created_at: 'Just now',
    }

    setComments([newComment, ...comments]);
    insertData(newComment);
  }

  return (
    <>
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold">{tale.title}</h1>
      </div>

      {/* InteractionBar now receives state from this component */}
      <InteractionBar reactions={reactions} commentCount={comments.length} />

      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: tale.body.html }} />

      {/* Interactions now receives state and handlers as props */}
      <Interactions
        reactions={reactions}
        comments={comments}
        selectedReaction={selectedReaction}
        onReactionClick={handleReactionClick}
        onCommentSubmit={handleCommentSubmit}
      />
    </>
  )
}