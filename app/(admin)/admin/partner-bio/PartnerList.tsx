"use client";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PartnerTable } from "./PartnerTable";
import { usePartnerInfiniteQuery, type Partner } from "@/hooks/usePartners";
import { debounce } from "lodash";
import { Loader } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; // Adjust the path based on your ShadCN setup

const PartnerListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [fileFormat, setFileFormat] = useState<string>("csv"); // Default format
  const debouncedSetSearch = debounce(setSearch, 300);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [totalPartnersCount, setTotalPartnersCount] = useState<number>(0);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    usePartnerInfiniteQuery(search);

  useEffect(() => {
    if (data) {
      setPartners(data.pages.flatMap((page) => page.partners));
      setTotalPartnersCount(data.pages[0].totalPartnersCount);
    }
  }, [data]);

  const handleDownloadFile = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/partners/download?format=${fileFormat}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `partners.${fileFormat}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        toast({
          title: "Error",
          description: `Failed to download ${fileFormat.toUpperCase()}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Download Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
          <h1>Recent Partners ({totalPartnersCount})</h1>
          <div className="flex gap-2 h-12 md-2 md:mt-0">
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger className="w-40 h-full">
                {fileFormat.toUpperCase()}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleDownloadFile}
              className="px-4 w-full h-full py-2 bg-[#F5A64C] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download
            </button>
            <input
              id="search-recent-partners"
              type="text"
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="w-full px-6 py-2 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
              placeholder="Enter partner name or description"
            />
          </div>
        </div>
        <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
          {isLoading && <Loader className="h-6 w-6 animate-spin" />}
          <PartnerTable partners={partners || []} />
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 w-fit bg-[#F5A64C] text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default PartnerListPage;
