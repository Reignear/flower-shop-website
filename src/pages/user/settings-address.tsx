/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserSetting } from "@/hooks/use-user-setting";
import type { Address, Region } from "@/utils/interface";
import { Controller } from "react-hook-form";
import { useInsertAddress } from "@/tanstack/address.mutation";
import { useAddress } from "@/tanstack/fetch.hook";
import { AddressCard } from "@/components/custom/custom-address-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserSettingsLayout from "@/components/layout/user-settings-layout";

const SettingsAddress = () => {
  const {
    region,
    setRegion,
    province,
    setProvince,
    city,
    setCity,
    barangay,
    setBarangay,
    selectedRegion,
    setSelectedRegion,
    selectedProvince,
    setSelectedProvince,
    selectedCity,
    setSelectedCity,
    setSelectedBarangay,
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    control: controlAddress,
  } = useUserSetting();

  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions/")
      .then((response) => response.json())
      .then((data: Region[]) => {
        setRegion(data);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  // Fetch provinces when region changes
  useEffect(() => {
    if (selectedRegion) {
      fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`)
        .then((response) => response.json())
        .then((data) => {
          setProvince(data);
          setCity([]);
          setBarangay([]);
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });
    }
  }, [selectedRegion]);

  // Fetch cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`,
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data);
          setBarangay([]); // Reset dependent field
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedProvince]);

  // Fetch barangays when city changes
  useEffect(() => {
    if (selectedCity) {
      fetch(
        `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`,
      )
        .then((response) => response.json())
        .then((data) => {
          setBarangay(data);
        })
        .catch((error) => {
          console.error("Error fetching barangays:", error);
        });
    }
  }, [selectedCity]);

  const { data: address, isLoading: isAddressLoading } = useAddress();
  const insertADdressMutation = useInsertAddress();
  const submitAddress = async (address: Address) => {
    try {
      await insertADdressMutation.mutateAsync({ address });
    } catch (error) {
      console.error("Error inserting address:", error);
    }
  };

  return (
    <UserSettingsLayout className="grid grid-cols-1 gap-5">
      <form onSubmit={handleSubmitAddress(submitAddress)}>
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Shipping Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Region
              </label>
              <Controller
                name="region"
                control={controlAddress}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(code) => {
                      const selectedRegionData = region?.find(
                        (r) => r.code === code,
                      );
                      field.onChange(selectedRegionData?.name || "");
                      setSelectedRegion(code);
                      setSelectedProvince("");
                      setSelectedCity("");
                    }}
                    value={
                      region?.find((r) => r.name === field.value)?.code || ""
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {region?.map((r: Region) => (
                          <SelectItem key={r.code} value={r.code}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Province
              </label>
              <Controller
                name="province"
                control={controlAddress}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(code) => {
                      const selectedProvinceData = province?.find(
                        (p) => p.code === code,
                      );
                      field.onChange(selectedProvinceData?.name || "");
                      setSelectedProvince(code);
                      setSelectedCity("");
                    }}
                    value={
                      province?.find((p) => p.name === field.value)?.code || ""
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {province?.map((p: any) => (
                          <SelectItem key={p.code} value={p.code}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                City / Municipalities
              </label>
              <Controller
                name="city"
                control={controlAddress}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(code) => {
                      const selectedCityData = city?.find(
                        (c) => c.code === code,
                      );
                      field.onChange(selectedCityData?.name || "");
                      setSelectedCity(code);
                    }}
                    value={
                      city?.find((c) => c.name === field.value)?.code || ""
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {city?.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">
                Barangay
              </label>
              <Controller
                name="barangay"
                control={controlAddress}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(name) => {
                      field.onChange(name);
                      setSelectedBarangay(name);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Barangay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {barangay?.map((b) => (
                          <SelectItem key={b.code} value={b.name}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Address Line 1
              </label>
              <Input
                {...registerAddress("address_line1")}
                placeholder="Purok"
              ></Input>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Address Line 2
              </label>
              <Input
                {...registerAddress("address_line2")}
                placeholder="Street, Building, etc."
              ></Input>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">
                Postal Code
              </label>
              <Input
                type="number"
                {...registerAddress("postal_code")}
                placeholder="Postal Code"
              ></Input>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground"
            disabled={insertADdressMutation.isPending}
          >
            {insertADdressMutation.isPending ? "Saving..." : "Save Address"}
          </Button>
        </Card>
      </form>
      <div className="grid grid-cols-1 gap-5 col-span-2">
        {address?.length === 0 && !isAddressLoading && (
          <Card className="max-h-40 flex items-center justify-center">
            <CardContent>
              <p className="text-muted-foreground text-sm">
                No address found. Please add your shipping address.
              </p>
            </CardContent>
          </Card>
        )}
        <div className="grid grid-cols-2 gap-5">
          {address?.map((addr, index) => (
            <AddressCard address={addr} index={index} key={index} />
          ))}
        </div>
      </div>
    </UserSettingsLayout>
  );
};

export default SettingsAddress;
