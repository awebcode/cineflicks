import React, { useState, useTransition } from "react";
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
import { formatDistanceToNow } from "date-fns";
import { Edit, EyeIcon, Loader, Trash } from "lucide-react";
import { deleteUser, updateUser } from "@/actions/user-actions";
import { toast } from "@/hooks/use-toast";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/hooks/useUsers";
import type { UpdateUserArgs } from "@/lib/user-schema";
import type { Role } from "@prisma/client";
import Link from "next/link";

interface TableComponentProps {
  users: User[];
}

export const TableComponent: React.FC<TableComponentProps> = ({ users }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [isDeleting, startDeleteTransaction] = useTransition();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    startDeleteTransaction(async () => {
      try {
        await deleteUser(id);
        toast({
          title: "User deleted successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["get-users"] });
      } catch (error) {
        toast({
          title: "Error deleting user",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Table>
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Image</TableHead>

          <TableHead>Email</TableHead>
          <TableHead>Coupon Code</TableHead>
          <TableHead>Wallet Address</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.email}</TableCell>

            <TableCell>{user.couponCode}</TableCell>
            <TableCell>{user.walletAddress}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(user.createdAt))}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Link href={`/profile/${user.id}`}>
                <EyeIcon className="w-4 h-4 text-green-500 cursor-pointer" />
              </Link>
              <Edit
                onClick={() => setOpenUpdateDialog(true)}
                className="w-4 h-4 text-green-500 cursor-pointer"
              />
              <EditUser
                open={openUpdateDialog}
                setOpen={setOpenUpdateDialog}
                userId={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
                couponCode={user.couponCode ?? ""}
                walletAddress={user.walletAddress ?? ""}
              />
              {isDeleting ? (
                <Loader className="w-4 h-4 text-green-500 animate-spin" />
              ) : (
                <Trash
                  onClick={() => handleDelete(user.id)}
                  className="w-4 h-4 text-red-500 cursor-pointer"
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface DialogProps extends UpdateUserArgs {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function EditUser({
  open,
  setOpen,
  userId: id,
  name,
  email,
  role,
  couponCode,
  walletAddress,
}: DialogProps) {
  const queryClient = useQueryClient();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedRole, setUpdatedRole] = useState(role);
  const [updatedCouponCode, setUpdatedCouponCode] = useState(couponCode);
  const [updatedWalletAddress, setUpdatedWalletAddress] = useState(walletAddress);
  const [isUpdating, startUpdateTransaction] = useTransition();

  const handleSubmit = async () => {
    startUpdateTransaction(async () => {
      try {
        await updateUser({
          userId: id,
          name: updatedName,
          email: updatedEmail,
          role: updatedRole,
          couponCode: updatedCouponCode,
          walletAddress: updatedWalletAddress,
        });
        toast({ title: "User updated successfully" });
        queryClient.invalidateQueries({ queryKey: ["get-users"] });
        setOpen(false);
      } catch (error) {
        toast({
          title: "Error updating user",
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your user here. Click save when you&apos;re done.
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
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={updatedRole}
              onValueChange={(value) => setUpdatedRole(value as Role)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="walletAddress" className="text-right">
              Wallet Address
            </Label>
            <Input
              id="walletAddress"
              value={updatedWalletAddress}
              onChange={(e) => setUpdatedWalletAddress(e.target.value)}
              className="col-span-3"
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
}
