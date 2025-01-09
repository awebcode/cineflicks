"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bep20Schema, type Bep20FormData } from "@/lib/schema";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import useTaskStore from "@/store/useTaskStore";
import { cn } from "@/lib/utils";
import { updateWalletAddress } from "@/actions/user-actions";
import { toast } from "@/hooks/use-toast";
import PendingButton from "./common/pending-button";

// Dynamically import SuccessPopup to improve performance
const SuccessPopup = dynamic(() => import("./common/success-popup"), { ssr: false });

export default function SubmitAddressPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { data: session } = useSession();
  const { getTasksByUser, allTasks } = useTaskStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const form = useForm<Bep20FormData>({
    resolver: zodResolver(bep20Schema),
    mode: "all",
    defaultValues: { address: "" },
  });

  const userTasks = getTasksByUser(session?.user.id as string);
  const completedTasks = userTasks.filter((task) => task.completed).length;

  async function onSubmit(data: Bep20FormData) {
    try {
      startTransition(async () => {
        try {
          const res = await updateWalletAddress({
            walletAddress: data.address,
            userId: session?.user.id as string,
          });

          if (res && "error" in res && res?.error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: res.message,
            });
          } else {
            toast({
              title: "Success",
              description: res.message,
            });
            setShowSuccess(true);
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: (error as Error).message || "Something went wrong",
          });
        }
      });
    } finally {
      form.reset();
    }
  }

  const isDisabled = userTasks.length !== allTasks.length;

  return (
    <div className="py-20 bg-[#1A1614] flex items-center justify-center p-4">
      <SuccessPopup open={showSuccess} setOpen={setShowSuccess} />

      <div className="w-full max-w-xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl leading-[50px] font-semibold text-white">
          Submit your BEP20 Address
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Complete all tasks to submit your address.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Address Input with associated label */}
          <div className="relative">
            <label htmlFor="address" className="sr-only">
              BEP20 Address
            </label>
            <input
              {...form.register("address")}
              id="address"
              type="text"
              placeholder="Enter your BEP20 address"
              disabled={isDisabled}
              aria-describedby={
                form.formState.errors.address ? "address-error" : undefined
              }
              className={cn(
                "w-full px-6 py-4 bg-[#f5a64c1d] border border-[#F5A64C] rounded-[20px] text-white placeholder:text-white focus:ring-2 focus:ring-[#F5A64C] transition-all",
                { "cursor-not-allowed opacity-50": isDisabled }
              )}
            />
            {form.formState.errors.address && (
              <p id="address-error" className="mt-2 text-sm text-red-500">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || isDisabled}
            className={cn(
              "w-full md:w-auto px-12 py-3 bg-[#F5A64C] text-white font-semibold rounded-xl hover:bg-[#E89539] transition-colors",
              { "cursor-not-allowed opacity-50": isPending || isDisabled }
            )}
          >
            {isPending ? "SUBMITTING..." : "SUBMIT"}
          </button>

          <p className="text-gray-400 text-lg">
            Completed Tasks {completedTasks}/{allTasks.length}
          </p>
        </form>
      </div>
    </div>
  );
}
