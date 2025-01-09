import { getUsers } from "@/actions/user-actions";
import type { Role } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

// Define the structure for the pagination cursor
type PageParam = { cursor: string | null } | undefined;
export interface User {
  name: string;
  id: string;
  email: string;
  image: string;
  role: Role;
  createdAt: Date;
  couponCode: string | null;
  walletAddress: string | null;
}
// Function to fetch messages with cursor pagination and optional search
const fetchUsers = async ({
  pageParam = { cursor: null },
  searchValue = "",
}: {
  pageParam?: PageParam;
  searchValue?: string;
  selectedChatId?: string; // Chat ID passed as parameter
}): Promise<{
  users: User[];
  totalUsersCount: number;
  nextCursor: string | null;
}> => {
  const data = await getUsers(searchValue, 10, pageParam?.cursor || "");
  if ("error" in data) {
    return {
      users: [],
      totalUsersCount: 0,
      nextCursor: null,
    };
  }
  return {
    users: data.users,
    totalUsersCount: data.totalUsersCount,
    nextCursor: data.nextCursor,
  };
};

// Hook to fetch messages with infinite query and update Zustand store
export const useUsersInfiniteQuery = (search?: string) => {
  // Hydrate React Query cache with Zustand's data if available

  // Use react-query's infinite query
  return useInfiniteQuery({
    queryKey: ["get-users", search], // Include selectedChat!.chatId for cache uniqueness
    queryFn: ({ pageParam }: { pageParam?: PageParam }) =>
      fetchUsers({
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
