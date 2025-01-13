// Table component
import React, { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { Edit, EyeIcon, Trash } from "lucide-react";
import { deleteInfluencer } from "@/actions/influencer-actions";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import EditInfluencer from "./EditInfluencer";
import type { Influencer } from "@/hooks/useInfluencer";



interface TableComponentProps {
  influencers: Influencer[];
}

export const TableComponent: React.FC<TableComponentProps> = ({ influencers }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isDeleting, startDeleteTransaction] = useTransition();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    startDeleteTransaction(async () => {
      try {
        await deleteInfluencer(id);
        toast({ title: "Influencer deleted successfully" });
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
  useEffect(() => {
    if (isDeleting) {
    toast({
      title: "Influencer deleting...",
    })
    setTimeout(() => {
      setSelectedInfluencer(null);
    }, 1000);
   }
  }, [isDeleting]);

  return (
    <>
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
          {influencers.map((influencer) => (
            <TableRow key={influencer.id}>
              <TableCell>{influencer.name}</TableCell>
              <TableCell>{influencer.couponCode}</TableCell>
              <TableCell>{influencer.totalUsers}</TableCell>
              <TableCell>
                <RemainingTime expireTime={influencer.expireTime} />
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Link href={`/influencer/${influencer.id}`}>
                  <EyeIcon className="w-4 h-4 text-green-500 cursor-pointer" />
                </Link>
                <Edit
                  onClick={() => setSelectedInfluencer(influencer)}
                  className="w-4 h-4 text-green-500 cursor-pointer"
                />
                <Trash
                  onClick={() => handleDelete(influencer.id)}
                  className="w-4 h-4 text-red-500 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Influencer Modal */}
      {selectedInfluencer && (
        <EditInfluencer
          open={!!selectedInfluencer}
          setOpen={(isOpen) => !isOpen && setSelectedInfluencer(null)}
          id={selectedInfluencer.id}
          name={selectedInfluencer.name}
          couponCode={selectedInfluencer.couponCode}
          expireTime={selectedInfluencer.expireTime as any}
        />
      )}
    </>
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
        setExpired(true);
      } else {
        setExpired(false);
        setTime(formatDistance(now, expirationDate));
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [expireTime]);

  return expired ? (
    <span className="text-red-500">Expired</span>
  ) : (
    <span>Remaining: {time}</span>
  );
};

