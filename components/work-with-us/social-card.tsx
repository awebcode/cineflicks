"use client";

import { useState } from "react";
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

interface SocialCardProps {
  platform: string;
  status: "completed" | "pending";
  description: string;
}

export function SocialCard({ platform, status, description }: SocialCardProps) {
  const [isFollowed, setIsFollowed] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "all",
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (data: CommentFormData) => {
    console.log(data);
    // Handle verification here
  };

  return (
    <Card className="bg-[#2A2D35] border-none text-white">
      <CardHeader>
        {status === "completed" ? (
          <div className="w-fit px-4 py-1 rounded-md bg-[#A17C43] text-white">
            Completed
          </div>
        ) : (
          <Button className="w-fit bg-[#2EAE48] hover:bg-[#259A3E]">
            Start the task
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Follow Cineflicks on {platform}</h2>
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
                      placeholder="Post your comment url"
                      className="bg-[#1C1E24] border-none text-gray-300 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                className="flex-1 bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium"
                onClick={() => setIsFollowed(true)}
              >
                {isFollowed ? "Followed" : "Follow"}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium"
              >
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
