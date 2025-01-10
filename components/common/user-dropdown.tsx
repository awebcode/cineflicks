"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
interface UserDropdownProps {
  name?: string | null;
  image?: string | null;
  role?: Role;
}
const UserDropdown: React.FC<UserDropdownProps> = ({ name, image, role }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          title={name ?? "Profile"}
          className="flex flex-col items-center gap-2 px-4"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={image || ""} alt={name || "User"} />
            <AvatarFallback>{name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {role === Role.ADMIN && (
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
