type Reaction = {
  emoji: string;
  label: string;
  count: number;
}

type InteractionBarProps = {
  reactions: Reaction[];
  commentCount: number;
};

export function InteractionBar({ reactions, commentCount }: InteractionBarProps) {
  return (
    // This bar is visually sectioned off and provides a clear "jump link"
    <div className="my-8 border-y border-gray-200 py-2">
      <a
        href="#interactions"
        className="flex items-center justify-center gap-4 rounded-md p-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 no-underline"
        aria-label="Scroll to reactions and comments"
      >
        <div className="flex items-center gap-3">
          {reactions.map(({ emoji, count, label }) => (
            <span key={label} className="flex items-center" title={`${count} people reacted with ${label}`}>
              {emoji}
              <span className="ml-1 font-medium">{count}</span>
            </span>
          ))}
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.37,14.66A16,16,0,0,0,40,240a15.89,15.89,0,0,0,10.27-3.88L89.5,196.8l.17-.12H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Z"></path></svg>
          <span className="font-medium">{commentCount} Comments</span>
        </div>
      </a>
    </div>
  )
}