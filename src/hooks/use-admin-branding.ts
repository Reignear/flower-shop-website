import type {
  BankTransferMethod,
  CODMethod,
  GcashMethod,
  PayPalMethod,
} from "@/utils/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAdminBranding = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(
    null,
  );
  const { register: registerGcash, handleSubmit: handleSubmitGcash } =
    useForm<GcashMethod>();
  const { register: registerPayPal, handleSubmit: handleSubmitPayPal } =
    useForm<PayPalMethod>();
  const { register: registerBank, handleSubmit: handleSubmitBankTransfer } =
    useForm<BankTransferMethod>();
  const { register: registerCOD, handleSubmit: handleSubmitCOD } =
    useForm<CODMethod>();
  return {
    activePaymentMethod,
    setActivePaymentMethod,
    registerGcash,
    handleSubmitGcash,
    registerPayPal,
    handleSubmitPayPal,
    registerBank,
    handleSubmitBankTransfer,
    registerCOD,
    handleSubmitCOD,
  };
};
