import { supabase } from "@/supabase/client";
import type {
  GcashMethod,
  PayPalMethod,
  BankTransferMethod,
} from "@/utils/interface";

// Since each billing method has different fields, we create separate functions for each type of billing method to handle the insertion logic accordingly
export const insertGcash = async ({ gcash }: { gcash: GcashMethod }) => {
  const { data: gcashData } = await supabase
    .from("billing_method_table")
    .insert({
      method_type: "gcash",
      gcash_number: gcash.gcash_number,
      gcash_name: gcash.gcash_name,
    });

  return gcashData;
};

// PayPal only has one field (email) so we can have a simpler function for it
export const insertPayPal = async ({ paypal }: { paypal: PayPalMethod }) => {
  const { data: paypalData } = await supabase
    .from("billing_method_table")
    .insert({
      method_type: "paypal",
      paypal_email: paypal.paypal_email,
    });

  return paypalData;
};

// Bank transfer has multiple fields so we create a separate function for it
export const insertBankTransfer = async ({
  bank,
}: {
  bank: BankTransferMethod;
}) => {
  const { data: bankData, error } = await supabase
    .from("billing_method_table")
    .insert({
      method_type: "bank",
      bank_name: bank.bank_name,
      bank_account_name: bank.bank_account_name,
      bank_account_number: bank.bank_account_number,
    });

  console.log("Bank Insert Error:", error);
  return bankData;
};

// COD is a special case since it only has an enabled/disabled state, we check if a COD record already exists and update it instead of inserting a new one
export const insertCOD = async () => {
  const { data: existingCOD } = await supabase
    .from("billing_method_table")
    .select("*")
    .eq("method_type", "cod")
    .single();
  if (existingCOD) {
    // Update existing COD record
    const { data: codData } = await supabase
      .from("billing_method_table")
      .update({ cod_enabled: true })
      .eq("method_type", "cod");
    return codData;
  } else {
    // Insert new COD record
    const { data: codData } = await supabase
      .from("billing_method_table")
      .insert({
        method_type: "cod",
        cod_enabled: true,
      });
    return codData;
  }
};
