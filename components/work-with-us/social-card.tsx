"use client";

import { createTask } from "@/actions/task-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { commentSchema, type CommentFormData } from "@/lib/schema";
import { cn } from "@/lib/utils";
import useTaskStore from "@/store/useTaskStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import PendingButton from "../common/pending-button";

interface SocialCardProps {
  id: string | number;
  platform: string;
  description: string;
  socialUrl: string;
}

function SocialCard({ id, platform, description, socialUrl }: SocialCardProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { addTask, updateTask, getTaskById, isSubmitted } = useTaskStore(
    (state) => state
  );
  const session = useSession();
  const userId = session.data?.user?.id;
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "all",
    defaultValues: { url: "" },
  });

  const onSubmit = async (data: CommentFormData) => {
    if (!userId) return;

    startTransition(async () => {
      try {
        if (isSubmitted || task?.completed) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "You have already submitted this task",
          });
          return;
        }
        const data = await createTask({
          userId,
          platform,
          socialUrl,
          url: form.getValues("url"),
          title: `Follow Cineflicks on ${platform}`,
        });
        if (data && "error" in data && data?.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.message,
          });
          return;
        }

        if (!data) return;

        if (data.success) {
          toast({
            title: "Success",
            description: data.message,
          });
          setIsFollowed(true);
          updateTask(id, { completed: true });
          form.reset();
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        });
      }
    });
  };

  const handleFollow = () => {
    if (!userId) {
      signIn("google");
      return;
    }
    // Open the link in a new tab
    window.open(socialUrl, "_blank");

    if (task?.completed || isSubmitted) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You have already completed this task",
      });
      return;
    }

    if (!isSubmitted && !task?.completed) {
      setIsFollowed(true);
      addTask({
        id,
        userId,
        platform,
        socialUrl,
        title: `Follow Cineflicks on ${platform}`,
        description,
        completed: false,
      });
    }
  };

  const task = getTaskById(id);

  return (
    <Card className="bg-[#2A2D35] w-full md:w-[378px]  border-none text-white">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Task #{id}</h1>
        <div className="flex justify-between items-center">
          {task?.completed && session?.data?.user ? (
            <div className="w-fit px-4 py-1 rounded-[8px] bg-[#29B41D] text-white">
              Completed
            </div>
          ) : task && session?.data?.user ? (
            <Button
              className="w-fit bg-[#F5A64C] hover:bg-[#E89539] cursor-pointer"
              onClick={handleFollow}
            >
              Pending
            </Button>
          ) : (
            <Button
              className="w-fit bg-green-500 hover:bg-green-400 cursor-pointer"
              onClick={handleFollow}
            >
              Start Task
            </Button>
          )}

          <Button
            className="w-fit bg-green-500 hover:bg-green-400 cursor-pointer"
            onClick={() => window.open(socialUrl, "_blank")}
          >
            Watch
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">
          Follow Cineflicks on{" "}
          <span className="text-[#F5A64C]">{platform}</span>
        </h2>
        <p className="text-gray-400">{description}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Post your comment URL"
                      className={cn(
                        "bg-[#1C1E24] h-[56px] border-none text-gray-300 placeholder:text-gray-500",
                        isSubmitted || task?.completed
                          ? "cursor-not-allowed"
                          : "cursor-text"
                      )}
                      disabled={isSubmitted || task?.completed}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              {userId ? (
                <>
                  <Button
                    type="button"
                    className={cn(
                      "flex-1 h-[43px] w-[146px] font-medium text-black",
                      isFollowed || task
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white cursor-not-allowed"
                        : "bg-[#F5A64C] hover:bg-[#E89539]"
                    )}
                    disabled={isFollowed || !!task}
                    onClick={handleFollow}
                  >
                    {isFollowed || task ? "Followed" : "Follow"}
                  </Button>
                  <PendingButton
                    disabled={
                      isPending ||
                      !form.formState.isValid ||
                      !task ||
                      isSubmitted ||
                      task?.completed
                    }
                    type="submit"
                    className={cn(
                      "flex-1 h-[43px] w-[146px] font-medium text-black",
                      isSubmitted || task?.completed
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white cursor-not-allowed"
                        : "bg-[#F5A64C] hover:bg-[#E89539]"
                    )}
                  >
                    {isSubmitted || task?.completed
                      ? "Verified✅"
                      : isPending
                      ? "Verifying..."
                      : "Verify"}
                  </PendingButton>
                </>
              ) : (
                <Button
                  type="button"
                  className="flex-1 bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Login to follow
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SocialCard;
