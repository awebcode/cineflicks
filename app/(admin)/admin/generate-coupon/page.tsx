"use client";
import { createInfluencer } from "@/actions/influencer-actions";
import PrimaryButton from "@/components/common/PrimaryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useInfluencerInfiniteQuery, type Influencer } from "@/hooks/useInfluencer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { Copy, CopyCheck, Loader, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { TableComponent } from "./TableComponent";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration: z.string().min(1, "Duration is required"),
});

type FormData = z.infer<typeof formSchema>;

const GenerateCouponPage = () => {
  const queryClient = useQueryClient();
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [totalInfluencersCount, setTotalInfluencersCount] = useState<number>(0);
  const [downloadType, setDownloadType] = useState<string>("csv");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const debouncedSetSearch = debounce(setSearch, 300);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfluencerInfiniteQuery(search);

  const durationOptions = [
    ...Array.from({ length: 30 }, (_, i) => ({
      value: `${i + 1}`,
      label: `${i + 1} ${i === 0 ? "day" : "days"}`,
    })),
    ...Array.from({ length: 11 }, (_, i) => {
      const months = i + 2;
      const days = months * 30;
      return {
        value: `${days}`,
        label: `${months} ${months === 1 ? "month" : "months"}`,
      };
    }),
    { value: "365", label: "1 year" },
  ];

  const downloadOptions = [
    { value: "csv", label: "CSV" },
    { value: "excel", label: "Excel" },
    { value: "pdf", label: "PDF" },
  ];

  const generateCoupon = async (data: FormData) => {
    setIsGenerating(true);
    try {
      if (!imageUrl) {
        throw new Error("Please upload an image first");
      }
      const res = await createInfluencer(
        data.name,
        Number.parseInt(data.duration),
        imageUrl
      );
      if ("error" in res) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      } else {
        setCouponCode(res.couponCode);
        queryClient.invalidateQueries({ queryKey: ["get-influencers"] });
        toast({
          title: "Success",
          description: "Coupon code generated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create influencer",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadToCloudinary(file, "photo");
        setImageUrl(uploadedUrl);
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        // Reset the file input on error
        event.target.value = "";
        setSelectedImage(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      // User cancelled file selection, reset states
      setSelectedImage(null);
      setImageUrl(null);
    }
  };

  const handleImageDelete = async () => {
    if (imageUrl) {
      setIsDeleting(true);
      try {
        await deleteFromCloudinary(imageUrl);
        setSelectedImage(null);
        setImageUrl(null);
        // Reset the file input
        const fileInput = document.getElementById("image-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        toast({
          title: "Success",
          description: "Image deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete image",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
      }
    } else {
      // If there's no imageUrl but there's a selectedImage, just reset the states
      setSelectedImage(null);
      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/campaign?couponCode=${couponCode}`
      );
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: `The coupon URL ${process.env.NEXT_PUBLIC_APP_URL}?couponCode=${couponCode} has been copied.`,
      });
    }
  };

  const handleDownload = async () => {
    if (!downloadType) {
      toast({
        title: "Error",
        description: "Please select a download format.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/influencers/download?format=${downloadType}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${downloadType}-file.${downloadType}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast({
          title: "Success",
          description: `${downloadType.toUpperCase()} file downloaded successfully!`,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to download ${downloadType.toUpperCase()} file.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while downloading the file.",
        variant: "destructive",
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
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <form onSubmit={handleSubmit(generateCoupon)}>
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div className="w-full">
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

            <div className="w-full h-full">
              <label
                htmlFor="duration"
                className="block text-sm font-semibold text-gray-700"
              >
                Duration
              </label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-full w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.duration && (
                <p className="mt-2 text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div className="flex mt-4 gap-4 items-center">
            <div className="w-full">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="w-full md:w-1/2 h-full inline-flex items-center justify-center px-4 py-2 bg-[#F5A64C] text-black font-semibold rounded-xl hover:bg-[#E89539] transition-colors cursor-pointer"
              >
                <Upload className="mr-2" size={20} />
                {isUploading ? "Uploading..." : "Upload Image"}
              </label>
            </div>
            {(selectedImage || imageUrl || isUploading) && (
              <div className="flex items-center">
                <div className="relative w-32 h-32">
                  {isUploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                      <Loader className="animate-spin" size={32} />
                    </div>
                  ) : (
                    <Image
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : imageUrl || "/placeholder.svg"
                      }
                      alt="Uploaded"
                      fill
                      objectFit="cover"
                      className="rounded-md"
                    />
                  )}
                </div>
                {(selectedImage || imageUrl) && (
                  <button
                    type="button"
                    onClick={handleImageDelete}
                    className="ml-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <X size={20} />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex mt-4">
            <PrimaryButton
              type="submit"
              disabled={isGenerating || !imageUrl || !isValid}
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
                value={`${process.env.NEXT_PUBLIC_APP_URL}/campaign?couponCode=${couponCode}`}
                readOnly
                className="w-full max-w-full px-4 py-3 bg-[#1E1E1E] text-white rounded-xl border border-[#F5A64C] focus:outline-none"
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

      <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
          <h1>Recent Influencers ({totalInfluencersCount})</h1>
          <div className="flex gap-2">
            <Select value={downloadType} onValueChange={setDownloadType}>
              <SelectTrigger className="h-full w-40 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white">
                <SelectValue placeholder="Download" />
              </SelectTrigger>
              <SelectContent>
                {downloadOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <PrimaryButton
              onClick={handleDownload}
              className="py-2 px-4 bg-[#F5A64C] text-white font-semibold rounded-xl hover:bg-[#E89539] transition-colors"
            >
              Download
            </PrimaryButton>
            <input
              id="search-recent-users"
              type="text"
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="w-full px-6 py-2 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
              placeholder="Enter name or code"
            />
          </div>
        </div>
        <div className="shadow-md rounded-lg p-6 flex flex-col gap-4">
          {isLoading && <Loader className="mx-auto h-6 w-6 animate-spin" />}
          <TableComponent influencers={influencers || []} />
        </div>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 w-fit bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateCouponPage;
