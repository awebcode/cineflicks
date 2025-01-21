import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { updateInfluencer } from "@/actions/influencer-actions";
import { toast } from "@/hooks/use-toast";
import type { InfluencerUpdateArgs } from "@/lib/influencer-schema";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import { Loader, Upload, X } from "lucide-react";

interface DialogProps extends InfluencerUpdateArgs {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const EditInfluencer: React.FC<DialogProps> = ({
  open,
  setOpen,
  id,
  name,
  couponCode,
  image,
  expireTime,
}) => {
  const queryClient = useQueryClient();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCouponCode, setUpdatedCouponCode] = useState(couponCode);
  const [updatedExpireTime, setUpdatedExpireTime] = useState(expireTime);
  const [currentImage, setCurrentImage] = useState<string | null>(image); // For displaying the initial image
  const [newImage, setNewImage] = useState<string | null>(null); // For new uploads
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, startUpdateTransaction] = useTransition();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Uploading file:", file); // Debugging log

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file, "photo");
      console.log("Uploaded image URL:", uploadedUrl); // Debugging log
      setNewImage(uploadedUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error); // Debugging log
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };


  const handleImageDelete = async () => {
    try {
      // Delete the currently displayed image (either new or existing)
      const imageToDelete = newImage || currentImage;
      if (imageToDelete) {
        await deleteFromCloudinary(imageToDelete);
        setNewImage(null);
        setCurrentImage(null);
        toast({
          title: "Success",
          description: "Image deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    startUpdateTransaction(async () => {
      try {
        await updateInfluencer(id, {
          name: updatedName,
          couponCode: updatedCouponCode,
          image: newImage || currentImage ||"", // Prioritize the new image
          expireTime: updatedExpireTime,
        });
        toast({ title: "Influencer updated successfully" });
        queryClient.invalidateQueries({ queryKey: ["get-influencers"] });
        setOpen(false);
      } catch (error) {
        toast({
          title: "Error updating influencer",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit Influencer</DialogTitle>
          <DialogDescription>
            Make changes to your Influencer here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="couponCode" className="text-right">
              Coupon Code
            </Label>
            <Input
              id="couponCode"
              value={updatedCouponCode}
              onChange={(e) => setUpdatedCouponCode(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expireTime" className="text-right">
              Expire Time
            </Label>
            <Input
              id="expireTime"
              type="number"
              value={updatedExpireTime}
              onChange={(e) => setUpdatedExpireTime(e.target.value)}
              className="col-span-3"
              placeholder="1,2,3 etc single number of days"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                type="file"
                id="image-upload-update-influencer"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload-update-influencer"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#F5A64C] text-black font-semibold rounded-xl hover:bg-[#E89539] transition-colors cursor-pointer"
              >
                <Upload className="mr-2" size={20} />
                {isUploading ? "Uploading..." : "Upload Image"}
              </label>
              {(newImage || currentImage) && (
                <div className="relative w-16 h-16">
                  <Image
                    src={newImage || currentImage || "/placeholder.svg"}
                    alt="Uploaded"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleImageDelete}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-[#F2AA4C] text-white rounded-full p-1 hover:bg-[#E89539] transition-colors"
                    aria-label="Delete image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isUpdating || isUploading}
          >
            {isUpdating ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfluencer;
