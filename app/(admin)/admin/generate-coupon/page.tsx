"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@/components/common/PrimaryButton";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { TableComponent } from "./TableComponent";

// Zod schema for validation
const formSchema = z.object({
  couponCode: z.string().min(1, "Coupon code is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+$/, "Duration must be a number"),
});

type FormData = z.infer<typeof formSchema>;

const GenerateCouponPage = () => {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [recentUsers, setRecentUsers] = useState([
    {
      username: "John Doe",
      image: "/path/to/image.jpg",
      couponCode: "ABC123",
      expireTime: "2025-01-01",
    },
    {
      username: "Jane Smith",
      image: "/path/to/image.jpg",
      couponCode: "XYZ456",
      expireTime: "2025-02-01",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Function to generate coupon code (mocked)
  const generateCoupon = (data: FormData) => {
    setIsGenerating(true);
    setTimeout(() => {
      const newCouponCode = `COUPON-${Math.random()
        .toString(36)
        .substr(2, 8)
        .toUpperCase()}`;
      setCouponCode(newCouponCode);
      setIsGenerating(false);
    }, 1500);
  };

  // Copy coupon URL to clipboard
  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${couponCode}`);
      toast({
        title: "Copied to clipboard!",
        description: `The coupon URL ${process.env.NEXT_PUBLIC_APP_URL}/${couponCode} has been copied.`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      {/* Section 1: Coupon Generation */}
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <form onSubmit={handleSubmit(generateCoupon)}>
          {/* Inputs Section */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="couponCode"
                className="block text-sm font-semibold text-gray-700"
              >
                Coupon Code
              </label>
              <input
                {...register("couponCode")}
                id="couponCode"
                type="text"
                className="w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
                placeholder="Enter coupon code"
              />
              {errors.couponCode && (
                <p className="mt-2 text-sm text-red-500">{errors.couponCode.message}</p>
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
                type="text"
                className="w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
                placeholder="Enter duration"
              />
              {errors.duration && (
                <p className="mt-2 text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>
          </div>

          {/* Button Section */}
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

        {/* Display Coupon URL */}
        {couponCode && (
          <div className="text-left mt-4 flex items-center gap-4">
            <p className="text-lg font-semibold text-gray-700">Your generated coupon:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={`${process.env.NEXT_PUBLIC_APP_URL}/${couponCode}`}
                readOnly
                className="w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl border border-[#F5A64C] focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Copy Coupon URL"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Recent Users and Table */}
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <h1>Recent Users {recentUsers.length}</h1>
          <div className="flex gap-2 h-20">
            <input
              id="search-recent-users"
              type="text"
              className="w-full  px-6 py-2 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
              placeholder="Enter your search query"
            />
          
            <button className="px-4 w-full  h-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download Users
            </button>
          </div>
        </div>

        {/* Shadcn Table */}
        <TableComponent users={recentUsers} />
      </div>
    </div>
  );
};

export default GenerateCouponPage;
