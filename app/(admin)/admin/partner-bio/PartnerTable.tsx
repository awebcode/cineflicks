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
import { deletePartner, updatePartner } from "@/actions/partner-actions";
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
import { Partner } from "@/hooks/usePartners"; // Import your Partner interface
import Link from "next/link";
import { usePartnerStore } from "@/store/usePartnerStore";
import { useShallow } from "zustand/react/shallow";
interface TableProps {
  partners: Partner[];
}

export const PartnerTable: React.FC<TableProps> = ({ partners }) => {
  // const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const queryClient = useQueryClient();
  const { setSelectedPartner, selectedPartner } = usePartnerStore(useShallow((s) => s));
  const handleDelete = async (id: string) => {
    startDeleteTransition(async () => {
      try {
        await deletePartner(id);
        toast({ title: "Partner deleted successfully" });
        queryClient.invalidateQueries({ queryKey: ["get-partners"] });
      } catch (error) {
        toast({
          title: "Error deleting partner",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    });
  };

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner); // Set the selected partner for editing
  };

  return (
    <>
      <Table>
        <TableCaption>A list of partners.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Video</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.title}</TableCell>
              <TableCell>{partner.description.slice(0, 20) + "..."}</TableCell>
              <TableCell>
                <a href={partner.link ?? "#"} target="_blank" rel="noopener noreferrer">
                  {partner.link ?? "No Link"}
                </a>
              </TableCell>
              <TableCell>
                {partner.photoUrl ? (
                  <Avatar>
                    <AvatarImage src={partner.photoUrl} alt={partner.title} />
                    <AvatarFallback>{partner.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  "No Photo"
                )}
              </TableCell>
              <TableCell>
                {partner.videoUrl ? (
                  <span className="text-green-500">Video Available</span>
                ) : (
                  <span className="text-red-500">No Video</span>
                )}
              </TableCell>
              <TableCell>{formatDistanceToNow(new Date(partner.createdAt))}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link href={`/partner/${partner.id}`}>
                  <EyeIcon className="w-4 h-4 text-green-500 cursor-pointer" />
                </Link>
                <Edit
                  onClick={() => handleEdit(partner)}
                  className="w-4 h-4 text-green-500 cursor-pointer"
                />
                {isDeleting ? (
                  <Loader className="w-4 h-4 text-green-500 animate-spin" />
                ) : (
                  <Trash
                    onClick={() => handleDelete(partner.id)}
                    className="w-4 h-4 text-red-500 cursor-pointer"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Partner Dialog */}
      {/* {selectedPartner && (
        <EditPartnerDialog
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )} */}
    </>
  );
};

// interface EditPartnerDialogProps {
//   partner: Partner;
//   onClose: () => void;
// }

// const EditPartnerDialog: React.FC<EditPartnerDialogProps> = ({ partner, onClose }) => {
//   const [title, setTitle] = useState(partner.title);
//   const [description, setDescription] = useState(partner.description);
//   const [link, setLink] = useState(partner.link ?? "");
//   const [photoUrl, setPhotoUrl] = useState(partner.photoUrl ?? "");
//   const [videoUrl, setVideoUrl] = useState(partner.videoUrl ?? "");
//   const [isUpdating, startUpdateTransition] = useTransition();
//   const queryClient = useQueryClient();

//   const handleSubmit = async () => {
//     startUpdateTransition(async () => {
//       try {
//         await updatePartner(partner.id, {
//           title,
//           description,
//           link,
//           photoUrl,
//           videoUrl,
//         });
//         toast({ title: "Partner updated successfully" });
//         queryClient.invalidateQueries({ queryKey: ["get-partners"] });
//         onClose();
//       } catch (error) {
//         toast({
//           title: "Error updating partner",
//           description: "Please try again later",
//           variant: "destructive",
//         });
//       }
//     });
//   };

//   return (
//     <Dialog open={!!partner} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-black text-white">
//         <DialogHeader>
//           <DialogTitle>Edit Partner</DialogTitle>
//           <DialogDescription>
//             Make changes to the partner details. Click save when you&apos;re done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="title" className="text-right">
//               Title
//             </Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="description" className="text-right">
//               Description
//             </Label>
//             <Input
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="link" className="text-right">
//               Link
//             </Label>
//             <Input
//               id="link"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="photoUrl" className="text-right">
//               Photo URL
//             </Label>
//             <Input
//               id="photoUrl"
//               value={photoUrl}
//               onChange={(e) => setPhotoUrl(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="videoUrl" className="text-right">
//               Video URL
//             </Label>
//             <Input
//               id="videoUrl"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit" onClick={handleSubmit}>
//             {isUpdating ? "Saving..." : "Save changes"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
