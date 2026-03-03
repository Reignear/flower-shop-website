import { Label } from "@/components/ui/label";
import type { Category } from "@/utils/interface";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
interface CategoryFormViewProps {
  category: Category;
}
export default function CategoryFormView({ category }: CategoryFormViewProps) {
  return (
    <ScrollArea className="md:h-120 h-80">
      <div className="space-y-5">
        <div className="space-y-2">
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-56 object-cover rounded"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Category:</Label>
          <Input
            className="md:text-base"
            readOnly
            value={capitalizeFirstLetter(category.name)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Description:</Label>
          <Textarea
            className="text-justify text-sm"
            readOnly
            value={capitalizeFirstLetter(category.description)}
          />
        </div>
      </div>{" "}
    </ScrollArea>
  );
}
