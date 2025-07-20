'use server'

import { createClient } from '@/utils/supabase/server'
import { Comment, ReactionLabel } from '../lib/interaction-types'
import { revalidatePath } from 'next/cache'

export async function insertData(comment: Comment) {
    // Supabaseクライアントを作成
    const supabase = await createClient()

    // フォームから入力値を取得
    const newComment = {
        nickname: comment.nickname,
        slug: comment.slug,
        text: comment.text,
    }

    // データ挿入
    const { error } = await supabase
        .from('comments')
        .insert(newComment)

    // エラーが発生した場合
    if (error) {
        // ...
    }
}

export async function updateReaction(slug: string, reaction: ReactionLabel, action: 'increment' | 'decrement') {
    const supabase = await createClient()

    console.log(`[SERVER ACTION] Fired updateReaction:`, { slug, reaction, action });

    const rpcName = action === 'increment' ? 'increment_reaction' : 'decrement_reaction';

    const { error } = await supabase.rpc(rpcName, {
        slug_text: slug,
        reaction_type_text: reaction,
    });

    if (error) {
        console.error(`Error ${action}ing reaction:`, error);
        return { error: `Could not update reaction.` };
    }

    revalidatePath(`/tales/${slug}`);
    return { success: true };
}