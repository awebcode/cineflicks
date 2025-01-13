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
  expireTime,
}) => {
  const queryClient = useQueryClient();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCouponCode, setUpdatedCouponCode] = useState(couponCode);
  const [updatedExpireTime, setUpdatedExpireTime] = useState(expireTime);
  const [isUpdating, startUpdateTransaction] = useTransition();

  const handleSubmit = async () => {
    startUpdateTransaction(async () => {
      try {
        await updateInfluencer(id, {
          name: updatedName,
          couponCode: updatedCouponCode,
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfluencer;
