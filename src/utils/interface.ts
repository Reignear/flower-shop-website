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
}

export interface Feedback{
  id: number;
  user_id: User;
  product_id: Product;
  rating: number;
  feedback: string;
  status: string;
  created_at: string;
}
