/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Session } from "@supabase/supabase-js";
import type { UserRole } from "@/utils/types";

export interface Flower {
  id: number;
  name: string;
  price?: number;
  description?: string;
  imageUrl: string;
}

export interface SignUp {
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthdate: string;
  role: string;
}

export interface AuthContext {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  image_url: any;
  description: string;
}

export interface Feedback {
  id: number;
  user_id: User;
  product_id: Product;
  rating: number;
  feedback: string;
  status: string;
  created_at: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  image: string;
  image_url: any;
  description: string;
  price: number;
  status: string;
  category_id: string | undefined;
  feedback?: Feedback[];
}

export interface Cart {
  id: number;
  user_id: User;
  product_id: Product;
  quantity: number;
  created_at: string;
}

export interface Address {
  id: number;
  user_id?: User;
  address_line1: string;
  address_line2: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  is_default: boolean;
  postal_code?: string;
  created_at?: string;
}

// For address fetch API
export interface Region {
  code: string;
  name: string;
  regionCode: number;
  islandGroupCode: string;
  psgc10DigitCode: number;
}
export interface Province {
  code: string;
  name: string;
  regionCode: number;
  islandGroupCode: string;
  psgc10DigitCode: number;
}
export interface CityMunicipality {
  code: string;
  name: string;
  oldName: string;
  isCapital: boolean;
  isCity: boolean;
  isMunicipality: boolean;
  provinceCode: number;
  districtCode: number;
  regionCode: number;
  islandGroupCode: string;
  psgc10DigitCode: number;
}
export interface Barangay {
  code: string;
  name: string;
  oldName: string;
  subMunicipalityCode: boolean;
  cityCode: number;
  municipalityCode: boolean;
  districtCode: number;
  provinceCode: number;
  regionCode: number;
  islandGroupCode: string;
  psgc10DigitCode: number;
}

// Billing method interfaces
export interface BillingMethodBase {
  id?: number;
  method_type: string;
  is_available?: boolean;
}

// Individual method types
export interface GcashMethod extends BillingMethodBase {
  gcash_number: string;
  gcash_name: string;
}

export interface PayPalMethod extends BillingMethodBase {
  paypal_email: string;
}

export interface BankTransferMethod extends BillingMethodBase {
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
}

export interface CODMethod extends BillingMethodBase {
  cod_enabled: boolean;
}

// Discriminated union for when you need to handle any billing method
export type BillingMethod =
  | GcashMethod
  | PayPalMethod
  | BankTransferMethod
  | CODMethod;

export type OrderItem = {
  id: number;
  order_id: Order;
  product_id: Product;
  quantity: number;
  unit_price: number;
  sub_total: number;
};
export type Payment = {
  id: number;
  billing_method_id: BillingMethod;
  order_id: Order;
  reference_number: string;
  amount: number;
  currency: string;
  status: string;
  payment_gateway: string;
  created_at: string;
};

export type Order = {
  id: number;
  user_id: User;
  order_date: string;
  order_items_table: OrderItem[];
  payment_table: Payment;
  total_amount: number;
  status: string;
  shipping_fee: number;
  user_address_id: Address;
  created_at: string;
  reference_number: string;
};
