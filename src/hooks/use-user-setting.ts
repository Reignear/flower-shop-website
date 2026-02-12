import { useState } from "react";
import type {
  Address,
  Barangay,
  CityMunicipality,
  Province,
  Region,
} from "@/utils/interface";
import { useForm } from "react-hook-form";
export const useUserSetting = () => {
  const [region, setRegion] = useState<Region[]>();
  const [province, setProvince] = useState<Province[]>();
  const [city, setCity] = useState<CityMunicipality[]>();
  const [barangay, setBarangay] = useState<Barangay[]>();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const { register, handleSubmit, control } = useForm<Address>();
  return {
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
    selectedBarangay,
    setSelectedBarangay,
    register,
    handleSubmit,
    control,
  };
};
