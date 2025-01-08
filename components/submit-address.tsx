"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bep20Schema, type Bep20FormData } from "@/lib/schema";
import dynamic from "next/dynamic";
const SuccessPopup = dynamic(() => import("./common/success-popup"), {});
export default function SubmitAddressPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<Bep20FormData>({
      resolver: zodResolver(bep20Schema),
    mode: "all",
    defaultValues: {
      address: "",
    },
  });

  async function onSubmit(data: Bep20FormData) {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log(data);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1614] flex items-center justify-center p-4">
     <SuccessPopup open={showSuccess} setOpen={setShowSuccess} />
      <div className="w-full max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Submit your bep20 address
        </h1>

        <p className="text-gray-400 max-w-lg mx-auto">
          Lorem ipsum, placeholder or dummy text used in typesetting and graphic design
          for previewing layouts.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...form.register("address")}
              type="text"
              placeholder="Enter your Bep20 address"
              className="w-full px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
            />
            {form.formState.errors.address && (
              <p className="mt-2 text-sm text-red-500">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 bg-[#F5A64C] text-black font-semibold rounded-xl hover:bg-[#E89539] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
