import { getPartners } from "@/actions/partner-actions";
import { useInfiniteQuery } from "@tanstack/react-query";

// Define the structure for the pagination cursor
type PageParam = { cursor: string | null } | undefined;
export interface Partner {
  id: string;
  title: string;
  description: string;
  link: string | null;
  photoUrl: string | null;
  videoUrl: string | null;
  createdAt: Date;
}

// Function to fetch partners with cursor pagination and optional search
const fetchPartners = async ({
  pageParam = { cursor: null },
  searchValue = "",
}: {
  pageParam?: PageParam;
  searchValue?: string;
}): Promise<{
  partners: Partner[];
  totalPartnersCount: number;
  nextCursor: string | null;
}> => {
  const data = await getPartners(searchValue, 10, pageParam?.cursor || "");
  if ("error" in data) {
    return {
      partners: [],
      totalPartnersCount: 0,
      nextCursor: null,
    };
  }
  return {
    partners: data.partners,
    totalPartnersCount: data.totalPartnersCount,
    nextCursor: data.nextCursor,
  };
};

// Hook to fetch partners with infinite query
export const usePartnerInfiniteQuery = (search?: string) => {
  return useInfiniteQuery({
    queryKey: ["get-partners", search],
    queryFn: ({ pageParam }: { pageParam?: PageParam }) =>
      fetchPartners({
        pageParam,
        searchValue: search || "",
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ? { cursor: lastPage.nextCursor } : undefined;
    },
    initialPageParam: { cursor: null } as any,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
