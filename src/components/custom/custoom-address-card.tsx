import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Trash2, Star } from "lucide-react";
import { useState } from "react";
import type { Address } from "@/utils/interface";

interface AddressCardProps {
  address: Address;
  index: number;
  isSelected?: boolean;
  onSelect?: (index: number, selected: boolean) => void;
  onDelete?: (index: number) => void;
  onSetDefault?: (index: number) => void;
}

export function AddressCard({
  address,
  index,
  isSelected = false,
  onSelect,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const fullAddress = [
    address.address_line1,
    address.address_line2,
    address.barangay,
    address.city,
    address.province,
    address.region,
    address.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 ${
        isSelected ? "border-blue-500 border-2 bg-blue-50" : "border-gray-200"
      } ${isHovered ? "shadow-md" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Header with checkbox and title */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) =>
                onSelect?.(index, checked as boolean)
              }
              className="mt-1"
              aria-label={`Select address ${index + 1}`}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">
                  Address {index + 1}
                </h3>
                {address.is_default && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    <Star size={12} /> Default
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address details */}
        <div className="mb-4 space-y-3">
          <div className="flex gap-3">
            <MapPin size={18} className="text-gray-400 flex-0 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              {fullAddress}
            </p>
          </div>

          {/* Address breakdown */}
          <div className="grid grid-cols-2 gap-4 pl-6 pt-2 border-t border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Region
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {address.region}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Province
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {address.province}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                City / Municipality
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {address.city}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Barangay
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {address.barangay}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Postal Code
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {address.postal_code}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          {!address.is_default && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSetDefault?.(index)}
              className="flex-1 gap-2"
            >
              <Star size={16} />
              <span className="hidden sm:inline">Set Default</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(index)}
            className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
