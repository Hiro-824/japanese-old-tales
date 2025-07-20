import { InteractionsLoaderProps } from "../lib/interaction-types";
import { TaleContent } from "./tale-content";

const SkeletonBar = () => (
    <div className="h-6 w-full animate-pulse rounded-md bg-gray-200" />
);

const SkeletonComment = () => (
    <div className="flex items-start gap-4">
        <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div className="w-full">
            <div className="h-5 w-1/3 animate-pulse rounded-md bg-gray-200" />
            <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gray-200" />
            <div className="mt-1 h-4 w-3/4 animate-pulse rounded-md bg-gray-200" />
        </div>
    </div>
);

export function InteractionsSkeleton() {
    return (
        <>
            {/* Skeleton for InteractionBar */}
            <div className="my-8 border-y border-gray-200 py-2">
                <div className="flex items-center justify-center gap-4 rounded-md p-2">
                    <SkeletonBar />
                </div>
            </div>

            <div id="interactions" className="mt-16 pt-12 border-t border-gray-200 mb-40">
                {/* Skeleton for Reaction Buttons */}
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">What did you think?</h2>
                    <div className="flex justify-center gap-2 sm:gap-4">
                        <div className="h-12 w-20 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-12 w-20 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-12 w-20 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-12 w-20 animate-pulse rounded-full bg-gray-200" />
                    </div>
                </div>
                {/* Skeleton for Comments */}
                <div className="mt-16">
                    <h2 className="text-xl font-bold mb-6">
                        <div className="inline-block h-6 w-40 animate-pulse rounded-md bg-gray-200" />
                    </h2>
                    {/* Comment Form Skeleton */}
                    <div className="mb-8 h-40 w-full animate-pulse rounded-lg bg-gray-100 p-4" />
                    <div className="space-y-6">
                        <SkeletonComment />
                        <SkeletonComment />
                    </div>
                </div>
            </div>
        </>
    );
}