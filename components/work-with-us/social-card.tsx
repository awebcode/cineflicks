"use client";

import { useState, useEffect, useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { commentSchema, type CommentFormData } from "@/lib/schema";
import { createTask } from "@/actions/task-actions";
import useTaskStore from "@/store/useTaskStore";
import { signIn, useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PendingButton from "../common/pending-button";

interface SocialCardProps {
  id: string | number;
  platform: string;
  description: string;
  socialUrl: string;
}

export function SocialCard({ id, platform, description, socialUrl }: SocialCardProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  // const [data, createTaskAction, isPending] = useActionState(createTask, null);
  const { addTask, updateTask, getTaskById,isSubmitted } = useTaskStore((state) => state);
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
        if(isSubmitted){
          toast({
            variant: "destructive",
            title: "Error",
            description: "You have already submitted your tasks",
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
          form.reset()
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
    if (!userId) return;

    router.push(socialUrl);

    if (!isSubmitted) {
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
        {task?.completed ? (
          <div className="w-fit px-4 py-1 rounded-md bg-emerald-500 text-white">
            Completed
          </div>
        ) : isPending ? (
          <Button
            className="w-fit bg-[#F5A64C] hover:bg-[#E89539]"
            onClick={handleFollow}
          >
            Start Task
          </Button>
        ) : (
          <Button
            className="w-fit bg-green-500 hover:bg-green-400"
            onClick={handleFollow}
          >
           Start Task
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">
          Follow Cineflicks on <span className="text-[#F5A64C]">{platform}</span>
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
                      className="bg-[#1C1E24] h-[56px] border-none text-gray-300 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              {userId ? (
                <>
                  {" "}
                  <Button
                    type="button"
                    className="flex-1 bg-[#F5A64C] h-[43px] w-[146px] hover:bg-[#E89539] text-black font-medium"
                    onClick={handleFollow}
                  >
                    {isFollowed || task ? (
                      <span className="bg-emerald-500">Followed</span>
                    ) : (
                      "Follow"
                    )}
                  </Button>
                  <PendingButton
                    disabled={isPending || !form.formState.isValid || !task}
                    type="submit"
                    className="flex-1 h-[43px] w-[146px] bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium"
                  >
                    {isSubmitted ? (
                      <span className="bg-emerald-500">Verified✅</span>
                    ) : isPending ? (
                      "Verifying..."
                    ) : (
                      "Verify"
                    )}
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
