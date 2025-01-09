import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react"; // Lucide icon
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

interface SuccessPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SuccessPopup({ open, setOpen }: SuccessPopupProps) {
  const session = useSession();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management for better accessibility when dialog opens
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        ref={dialogRef}
        className="sm:max-w-[425px] bg-black pt-12 text-white"
        aria-live="assertive" // Announcing the dialog for screen readers
      >
        <DialogHeader className="flex items-center gap-2">
          <CheckCircle className="text-green-500" size={40} />
          <DialogTitle className="text-3xl font-semibold tracking-wide">
            Thanks {session.data?.user?.name ? session.data?.user?.name : "User"} for
            participating!
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="text-center">
            <DialogDescription className="text-sm text-gray-300 mb-4">
              Your new home for movies and series. Turn streaming into a rewarding
              experience.
            </DialogDescription>

            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center">
                <h2 className="text-lg font-medium">Watch</h2>
                <Separator orientation="vertical" className="h-6 mx-4 bg-gray-400" />
              </div>
              <div className="flex items-center">
                <h2 className="text-lg font-medium">Earn</h2>
                <Separator orientation="vertical" className="h-6 mx-4 bg-gray-400" />
              </div>
              <div className="flex items-center">
                <h2 className="text-lg font-medium">Repeat</h2>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            type="button"
            aria-label="Close success popup"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
