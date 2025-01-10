// pages/generate-coupon.tsx
"use client";
import React, { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";

import { TableComponent } from "./TableComponent";
import { useUsersInfiniteQuery, type User } from "@/hooks/useUsers";
import { debounce } from "lodash";
import { Loader } from "lucide-react";

const UserListPage = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSetSearch = debounce(setSearch, 300); // Delay input handling by 300m
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useUsersInfiniteQuery(search);

  useEffect(() => {
    if (data) {
      setUsers(data.pages.flatMap((page) => page.users));
      setTotalUsersCount(data.pages[0].totalUsersCount);
    }
  }, [data]);

  const handleDownloadCsv = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/users/download");
    if (response.ok) {
      // Create a temporary link to trigger the download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      toast({
        title: "Error",
        description: "Failed to download CSV",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      {/* Section 1: Coupon Generation */}

      {/* Section 2: Recent Users and Table */}
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
          <h1>Recent Users-({totalUsersCount})</h1>
          <div className="flex gap-2 h-12 md-2 md:mt-0">
            <input
              id="search-recent-users"
              type="text"
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="w-full  px-6 py-2 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
              placeholder="Enter your search query"
            />

            <button
              onClick={handleDownloadCsv}
              className="px-4 w-full  h-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download CSV
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
         {isLoading&&<Loader className="h-6 w-6 animate-spin" />}
          <TableComponent users={users || []} />

          {/* Load more button */}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 w-fit bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
