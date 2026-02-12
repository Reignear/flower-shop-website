import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface CustomDialogProps {
  width?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  open?: boolean;
  openChange?: (open: boolean) => void;
}

export default function CustomDialog({
  width,
  title,
  description,
  children,
  trigger,
  open,
  openChange,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`sm:max-w-md  ${width}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
}
