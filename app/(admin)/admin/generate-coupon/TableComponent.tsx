import React, { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Influencer } from "@/hooks/useInfluencer";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { Edit, EyeIcon, Loader, Trash } from "lucide-react";
import { deleteInfluencer, updateInfluencer } from "@/actions/influencer-actions";
import { toast } from "@/hooks/use-toast";
import type { InfluencerUpdateArgs } from "@/lib/influencer-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
interface TableComponentProps {
  influencers: Influencer[];
}

export const TableComponent: React.FC<TableComponentProps> = ({ influencers }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [isDeleting, startDeleteTransaction] = useTransition();
  const queryClient = useQueryClient();
  const handleDelete = async (id: string) => {
    startDeleteTransaction(async () => {
      try {
        await deleteInfluencer(id);
        toast({
          title: "Influencer deleted successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["get-influencers"] });
      } catch (error) {
        toast({
          title: "Error deleting influencer",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Table>
      <TableCaption>A list of influencers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Coupon Code</TableHead>
          <TableHead>Total Users</TableHead>
          <TableHead>Expire Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {influencers.map((influencer, index) => (
          <TableRow key={index}>
            <TableCell>{influencer.name}</TableCell>

            <TableCell>{influencer.couponCode}</TableCell>
            <TableCell>{influencer.totalUsers}</TableCell>
            <TableCell><RemainingTime expireTime={influencer.expireTime} /></TableCell>
            <TableCell className="flex items-center gap-2">
              <Link href={`/influencer/${influencer.id}`}>
                <EyeIcon className="w-4 h-4 text-green-500 cursor-pointer" />
              </Link>
              <Edit
                onClick={() => setOpenUpdateDialog(true)}
                className="w-4 h-4 text-green-500"
              />{" "}
              <EditInfluencer
                open={openUpdateDialog}
                setOpen={setOpenUpdateDialog}
                id={influencer.id}
                name={influencer.name}
                couponCode={influencer.couponCode}
                expireTime={influencer.expireTime as unknown as string}
              />
              {isDeleting ? (
                <Loader className="w-4 h-4 text-green-500 animate-spin" />
              ) : (
                <Trash
                  onClick={() => handleDelete(influencer.id)}
                  className="w-4 h-4 text-red-500"
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const RemainingTime = ({ expireTime }: { expireTime: string | Date }) => {
  const [time, setTime] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const expirationDate = new Date(expireTime);

      if (now > expirationDate) {
        setExpired(true); // Mark as expired
      } else {
        setExpired(false); // Show remaining time
        setTime(formatDistance(now, expirationDate));
      }
    };

    updateTime(); // Update time immediately
    const intervalId = setInterval(updateTime, 1000); // Update every second

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [expireTime]);

  if (expired) {
    return <span className="text-red-500">Expired</span>; // Show expired message
  }

  return <span>Remaining: {time}</span>; // Show remaining time
};

interface DialogProps extends InfluencerUpdateArgs {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface DialogProps extends InfluencerUpdateArgs {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function EditInfluencer({
  open,
  setOpen,
  id,
  name,
  couponCode,
  expireTime,
}: DialogProps) {
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
      {" "}
      <DialogContent className="sm:max-w-[425px] bg-black text-white ">
        {" "}
        <DialogHeader>
          {" "}
          <DialogTitle>Edit Influencer</DialogTitle>{" "}
          <DialogDescription>
            {" "}
            Make changes to your Influencer here. Click save when you&apos;re done.{" "}
          </DialogDescription>{" "}
        </DialogHeader>{" "}
        <div className="grid gap-4 py-4">
          {" "}
          <div className="grid grid-cols-4 items-center gap-4">
            {" "}
            <Label htmlFor="name" className="text-right">
              {" "}
              Name{" "}
            </Label>{" "}
            <Input
              id="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="col-span-3"
            />{" "}
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            {" "}
            <Label htmlFor="couponCode" className="text-right">
              {" "}
              Coupon Code{" "}
            </Label>{" "}
            <Input
              id="couponCode"
              value={updatedCouponCode}
              onChange={(e) => setUpdatedCouponCode(e.target.value)}
              className="col-span-3"
            />{" "}
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            {" "}
            <Label htmlFor="expireTime" className="text-right">
              {" "}
              Expire Time{" "}
            </Label>{" "}
            <Input
              id="expireTime"
              type="number"
              value={updatedExpireTime}
              onChange={(e) => setUpdatedExpireTime(e.target.value)}
              className="col-span-3"
              placeholder="1,2,3 etc single number of days"
            />{" "}
          </div>{" "}
        </div>{" "}
        <DialogFooter>
          {" "}
          <Button type="submit" onClick={handleSubmit}>
            {" "}
            {isUpdating ? "Saving..." : "Save changes"}{" "}
          </Button>{" "}
        </DialogFooter>{" "}
      </DialogContent>{" "}
    </Dialog>
  );
}
