// pages/generate-coupon.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@/components/common/PrimaryButton";
import { toast } from "@/hooks/use-toast";
import { Copy, CopyCheck, Loader } from "lucide-react";
import { createInfluencer } from "@/actions/influencer-actions";
import { useInfluencerInfiniteQuery, type Influencer } from "@/hooks/useInfluencer";
import { TableComponent } from "./TableComponent";
import { debounce } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+$/, "Duration must be a number"),
});

type FormData = z.infer<typeof formSchema>;

const GenerateCouponPage = () => {
  const queryClient=useQueryClient()
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [totalInfluencersCount, setTotalInfluencersCount] = useState<number>(0);
  const debouncedSetSearch = debounce(setSearch, 300); // Delay input handling by 300m
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfluencerInfiniteQuery(search);
  /**
   *  Function to generate coupon or Create new influencer
   * @param data
   */
  const generateCoupon = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const res = await createInfluencer(data.name, parseInt(data.duration));
      if ("error" in res) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      } else {
        setCouponCode(res.couponCode);
        queryClient.invalidateQueries({queryKey:["get-influencers"]})
        toast({
          title: "Success",
          description: "Coupon code generated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create influencer",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}?couponCode=${couponCode}`
      );
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: `The coupon URL ${process.env.NEXT_PUBLIC_APP_URL}?couponCode=${couponCode} has been copied.`,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setInfluencers(data.pages.flatMap((page) => page.influencers));
      setTotalInfluencersCount(data.pages[0].totalInfluencersCount);
    }
  }, [data]);
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
         setIsCopied(false)
      }, 3000);
    }
  },[isCopied])

  const handleDownloadCsv = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/influencers/download"
    );
    if (response.ok) {
      // Create a temporary link to trigger the download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "influencers.csv";
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
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <form onSubmit={handleSubmit(generateCoupon)}>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="duration"
                className="block text-sm font-semibold text-gray-700"
              >
                Duration (Days)
              </label>
              <input
                {...register("duration")}
                id="duration"
                type="number"
                className="w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
                placeholder="Enter duration 1,2,3... in days"
              />
              {errors.duration && (
                <p className="mt-2 text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div className="flex mt-4">
            <PrimaryButton
              type="submit"
              disabled={isGenerating}
              className="px-12 py-4 bg-[#F5A64C] text-black font-semibold rounded-xl hover:bg-[#E89539] transition-colors disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate Coupon"}
            </PrimaryButton>
          </div>
        </form>

        {couponCode && (
          <div className="text-left w-full mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={`${process.env.NEXT_PUBLIC_APP_URL}/${couponCode}`}
                readOnly
                className="w-full max-w-full px-4 py-3 bg-[#1E1E1E] text-white rounded-xl border border-[#F5A64C] focus:outline-none" // Ensuring it takes all available space
              />
              <button
                onClick={copyToClipboard}
                className="text-emerald-500 hover:text-emerald-700"
              >
                {isCopied ? <CopyCheck size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Recent Users and Table */}
      {/* Section 2: Recent Users and Table */}
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
          <h1>Recent Influcencers-({totalInfluencersCount})</h1>
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
          {isLoading && <Loader className="mx-auto h-6 w-6 animate-spin" />}
          <TableComponent influencers={influencers || []} />

          {/* Load more button */}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default GenerateCouponPage;
