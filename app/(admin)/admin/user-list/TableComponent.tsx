import React, { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import type { Role } from "@prisma/client";
import Link from "next/link";

interface TableProps {
  users: User[];
}

export const UserTable: React.FC<TableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    startDeleteTransition(async () => {
      try {
        await deleteUser(id);
        toast({ title: "User deleted successfully" });
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

  const handleEdit = (user: User) => {
    setSelectedUser(user); // Set the selected user
  };

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Coupon</TableHead>
            <TableHead>Wallet Ad</TableHead>
            <TableHead>Influencer Id</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === "ADMIN" ? (
                  <span className="text-emerald-500">Admin</span>
                ) : (
                  "User"
                )}
              </TableCell>
              <TableCell>{user.taskCount}</TableCell>
              <TableCell>{user.couponCode}</TableCell>
              <TableCell>{user.walletAddress}</TableCell>
              <TableCell>{user.influencerId}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(user.createdAt))}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link href={`/profile/${user.id}`}>
                  <EyeIcon className="w-4 h-4 text-green-500 cursor-pointer" />
                </Link>
                <Edit
                  onClick={() => handleEdit(user)}
                  className="w-4 h-4 text-green-500 cursor-pointer"
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

      {/* Edit User Dialog */}
      {selectedUser && (
        <EditUserDialog user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

interface EditUserDialogProps {
  user: User;
  onClose: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [couponCode, setCouponCode] = useState(user.couponCode ?? "");
  const [walletAddress, setWalletAddress] = useState(user.walletAddress ?? "");
  const [isUpdating, startUpdateTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    startUpdateTransition(async () => {
      try {
        await updateUser({
          userId: user.id,
          name,
          email,
          role,
          couponCode,
          walletAddress,
        });
        toast({ title: "User updated successfully" });
        queryClient.invalidateQueries({ queryKey: ["get-users"] });
        onClose();
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
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as Role)}>
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
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="walletAddress" className="text-right">
              Wallet Address
            </Label>
            <Input
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
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
};
