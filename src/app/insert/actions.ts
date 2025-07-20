'use server'

import { createClient } from '@/utils/supabase/server'
import { Comment } from '../lib/interaction-types'

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