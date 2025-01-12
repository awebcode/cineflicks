"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type VideoFormValues, videoFormSchema } from "@/lib/schema";
import { Plus, Upload, X } from "lucide-react";

export default function VideoUploadForm() {
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      videoUrl: "",
      title: "",
      description: "",
      timing: "",
      language: "english",
      cast: [{ id: uuidv4(), name: "", bio: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "cast",
    control: form.control,
  });

  async function onSubmit(data: VideoFormValues) {
    try {
      // Simulate API call
      console.log("Form data:", data);
      const formData = new FormData();
      if (data.video) {
        formData.append("video", data.video[0]);
      }
      formData.append("data", JSON.stringify(data));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Video uploaded successfully!");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading video");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-4 flex items-start justify-center">
      <Card className="w-full max-w-3xl bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Video Upload Section */}
              <div className="space-y-4 hidden">
                <FormField
                  control={form.control}
                  name="video"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">
                        Upload Video
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => onChange(e.target.files)}
                          className="bg-zinc-800 border-zinc-700 text-zinc-300 file:bg-zinc-700 file:text-zinc-300 file:border-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">
                        Upload URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="www.video_link_here..."
                          className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Title and Description */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max 20 Character"
                          className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-end">
                        <span className="text-xs text-zinc-400">
                          {field.value.length}/20
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">
                        Description(Bio)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Max 300 words..."
                          className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Timing and Language */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">
                        Timing (Duration)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex 3hrs"
                          className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cast Members */}
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid md:grid-cols-2 gap-6 relative"
                  >
                    <FormField
                      control={form.control}
                      name={`cast.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Cast Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`cast.${index}.bio`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Cast Bio
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Textarea
                                className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500 min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -right-2 -top-2 text-zinc-400 hover:text-red-500"
                                onClick={() => remove(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  UPLOAD FILE
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                  onClick={() => append({ id: uuidv4(), name: "", bio: "" })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD MORE CAST
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
