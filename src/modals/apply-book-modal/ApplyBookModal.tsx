"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconClipboardCheck } from "@tabler/icons-react";
import { useState } from "react";
import ApplyBookForm from "@/components/form/apply-book-form/ApplyBookForm";

interface ApplyBookModalProps {
  book: {
    _id: string;
    title: string;
    quantity: number;
  };
}

export default function ApplyBookModal({ book }: ApplyBookModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-bold uppercase tracking-widest text-[10px] cursor-pointer"
        >
          <IconClipboardCheck size={16} />
          Apply for the Book
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest">
            Request Book Archive
          </DialogTitle>
        </DialogHeader>
        <ApplyBookForm
          bookId={book._id}
          bookTitle={book.title}
          availableQuantity={book.quantity}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
