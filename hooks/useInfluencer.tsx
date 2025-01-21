import { getInfluencers } from "@/actions/influencer-actions";
import { useInfiniteQuery } from "@tanstack/react-query";

// Define the structure for the pagination cursor
type PageParam = { cursor: string | null } | undefined;
export interface Influencer {
  id: string;
  name: string;
  couponCode: string;
  image: string|null;
  expireTime: Date;
  totalUsers: number;
}
// Function to fetch messages with cursor pagination and optional search
const fetchInfluencers = async ({
  pageParam = { cursor: null },
  searchValue = "",
}: {
  pageParam?: PageParam;
  searchValue?: string;
  selectedChatId?: string; // Chat ID passed as parameter
}): Promise<{
  influencers: Influencer[];
  totalInfluencersCount: number;
  nextCursor: string | null;
}> => {
  const data = await getInfluencers(searchValue, 10, pageParam?.cursor || "");
  if ("error" in data) {
    return {
      influencers: [],
      totalInfluencersCount: 0,
      nextCursor: null,
    };
  }
  return {
    influencers: data.influencers,
    totalInfluencersCount: data.totalInfluencersCount,
    nextCursor: data.nextCursor,
  };
};
// Hook to fetch messages with infinite query and update Zustand store
export const useInfluencerInfiniteQuery = (search?: string) => {
  // Hydrate React Query cache with Zustand's data if available

  // Use react-query's infinite query
  return useInfiniteQuery({
    queryKey: ["get-influencers", search], // Include selectedChat!.chatId for cache uniqueness
    queryFn: ({ pageParam }: { pageParam?: PageParam }) =>
      fetchInfluencers({
        pageParam,
        searchValue: search || "",
      }), // Fetching logic
    getNextPageParam: (lastPage) => {
      // Pagination logic to get next cursor
      return lastPage.nextCursor ? { cursor: lastPage.nextCursor } : undefined;
    },
    initialPageParam: { cursor: null } as any, // Initial cursor for the first page
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes to avoid frequent re-fetching
  });
};
