import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  username: string;
  image: string;
  couponCode: string;
  expireTime: string;
}

interface TableComponentProps {
  users: User[];
}

export const TableComponent: React.FC<TableComponentProps> = ({ users }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Coupon Code</TableHead>
          <TableHead>Expire Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.username}</TableCell>
            <TableCell>
              <img
                src={user.image}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </TableCell>
            <TableCell>{user.couponCode}</TableCell>
            <TableCell>{user.expireTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
