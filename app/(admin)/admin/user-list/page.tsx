// app/components/UserList.tsx

import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming shadcn table is imported
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton component

// Fetch users server-side
const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      couponCode: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

const UserList = async () => {
  const users = await getUsers();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-600  shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Total Users: {users.length}</h2>

      {/* Show Skeleton while the page is loading */}
      <div className="space-y-4">
        {!users.length ? (
          <>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </>
        ) : (
          <Table>
            <TableHeader className="hover:bg-inherit">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.couponCode}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserList;
