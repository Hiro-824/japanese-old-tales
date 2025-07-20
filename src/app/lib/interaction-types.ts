export type Comment = {
    created_at: string;
    id: number;
    nickname: string | null;
    slug: string | null;
    text: string | null;
}

export const REACTION_DEFINITIONS = [
    { emoji: '❤️', label: 'love' },
    { emoji: '🙏', label: 'thanks' },
    { emoji: '😮', label: 'surprised' },
    { emoji: '😢', label: 'sad' },
] as const; // `as const` makes it readonly and types more specific

export type ReactionLabel = typeof REACTION_DEFINITIONS[number]['label'];