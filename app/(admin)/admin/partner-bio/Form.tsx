"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, X, Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { partnerFormSchema, type PartnerFormValues } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function PartnerBioForm() {
  const router=useRouter()
  const [photoPreview, setPhotoPreview] = React.useState<string>("");
  const [videoPreview, setVideoPreview] = React.useState<string>("");
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState({ photo: 0, video: 0 });
  const [photoUploaded, setPhotoUploaded] = React.useState("");
  const [videoUploaded, setVideoUploaded] = React.useState("");

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      photoUrl: "",
      videoUrl: "",
    },
    mode: "all",
  });

  async function handleFileUpload(file: File, type: "photo" | "video") {
    try {
      // File size validation
      if (type === "photo" && file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Photo size must not exceed 10MB.",
          variant: "destructive",
        });
        return;
      }

      if (type === "video" && file.size > 300 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Video size must not exceed 300MB.",
          variant: "destructive",
        });
        return;
      }

      if (type === "photo") {
        setIsUploadingPhoto(true);
      } else {
        setIsUploadingVideo(true);
      }
      setUploadProgress((prev) => ({ ...prev, [type]: 0 }));

      // Show local preview immediately
      if (type === "photo") {
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        setVideoPreview(URL.createObjectURL(file));
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [type]: prev[type] >= 95 ? prev[type] : prev[type] + 5,
        }));
      }, 100);

      const url = await uploadToCloudinary(file, type);

      clearInterval(progressInterval);
      setUploadProgress((prev) => ({ ...prev, [type]: 100 }));

      if (type === "photo") {
        form.setValue("photoUrl", url);
        setPhotoUploaded(url);
      } else {
        form.setValue("videoUrl", url);
        setVideoUploaded(url);
      }

      toast({
        title: "File uploaded successfully",
      });

      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [type]: 0 }));
      }, 1000);
    } catch (error) {
      toast({
        title: "Error uploading file",
        variant: "destructive",
      });
    } finally {
      if (type === "photo") {
        setIsUploadingPhoto(false);
      } else {
        setIsUploadingVideo(false);
      }
    }
  }

  async function clearFile(url: string, type: "photo" | "video") {
    if (url && url !== "" && typeof url === "string") {
      await deleteFromCloudinary(url);
    }
    if (type === "photo") {
      setPhotoPreview("");
      setPhotoUploaded("");
      form.setValue("photoUrl", "");
    } else {
      setVideoPreview("");
      setVideoUploaded("");
      form.setValue("videoUrl", "");
    }
  }

  async function onSubmit(data: PartnerFormValues) {
    try {
      const response = await fetch("/api/admin/partner/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Partner bio saved successfully",
        duration: 3000,
      });
      router.push("/admin");
    } catch (error) {
      toast({
        title: "Error saving partner bio",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
      <div className="w-full mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Partners Bio</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section: Title and Link */}
              <div className="flex flex-col space-y-6 md:w-1/2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max 20 Character"
                          className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://"
                          className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Section: Description */}
              <div className="md:w-1/2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description (Bio)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Max 300 words..."
                          className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-500 h-40 md:h-48"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Photo */}
              <div>
                <FormLabel className="text-white">Upload Photo</FormLabel>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById("photo-upload")?.click()}
                    className="bg-[#F5A64C] text-black px-4 py-2 rounded-md font-medium"
                    disabled={isUploadingPhoto || isUploadingVideo}
                  >
                    Choose Photo
                  </button>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    disabled={isUploadingPhoto || isUploadingVideo}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "photo");
                    }}
                    className="hidden"
                  />
                  {isUploadingPhoto && uploadProgress.photo > 0 && (
                    <>
                      <Loader className="mr-2 h-6 w-6 animate-spin" />
                      <Progress
                        value={uploadProgress.photo}
                        className="mt-2 h-1 bg-[#F5A64C]"
                      />
                    </>
                  )}
                  {photoPreview && (
                    <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                      {photoUploaded && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => clearFile(photoUploaded, "photo")}
                        className="absolute top-2 left-2 bg-red-500 rounded-full p-1"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Video */}
              <div>
                <FormLabel className="text-white">Upload Video</FormLabel>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById("video-upload")?.click()}
                    className="bg-[#F5A64C] text-black px-4 py-2 rounded-md font-medium"
                    disabled={isUploadingPhoto || isUploadingVideo}
                  >
                    Choose Video
                  </button>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    disabled={isUploadingPhoto || isUploadingVideo}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "video");
                    }}
                    className="hidden"
                  />
                  {isUploadingVideo && uploadProgress.video > 0 && (
                    <>
                      <Loader className="mr-2 h-6 w-6 animate-spin" />
                      <Progress
                        value={uploadProgress.video}
                        className="mt-2 h-1 bg-[#F5A64C]"
                      />
                    </>
                  )}
                  {videoPreview && (
                    <div className="mt-4 relative w-full max-h-[200px] rounded-lg overflow-hidden">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full object-cover"
                      />
                      {videoUploaded && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => clearFile(videoUploaded, "video")}
                        className="absolute top-2 left-2 bg-red-500 rounded-full p-1"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-fit bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium py-2"
              disabled={
                isUploadingPhoto || isUploadingVideo || form.formState.isSubmitting
              }
            >
              {(isUploadingPhoto || isUploadingVideo || form.formState.isSubmitting) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              SAVE
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
