/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthAnimationLayout from "@/components/layout/auth-animation-layout";
import { Link } from "react-router-dom";
import { useSignUpUser } from "@/hooks/use-signup-user";
import { SignUpUser } from "@/supabase/auth/user-signup";
import type { SignUpFormDataUser } from "@/utils/types";
import { LoaderCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const { loading, setLoading, navigate, register, handleSubmit, errors } =
    useSignUpUser();

  const submitForm = async (data: SignUpFormDataUser) => {
    try {
      setLoading(true);
      await SignUpUser(data);
      navigate("/user/signin");
    } catch (error: any) {
      toast.error(`${error.message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthAnimationLayout>
      <Toaster position="bottom-right" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg md:min-w-md space-y-6">
          <Card className="border-gray-200 shadow-sm bg-white/95">
            <CardHeader className="space-y-2">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight ">
                  CELESTIAL BLOOM
                </h1>
              </div>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
                <p className="text-gray-600 text-sm mb-2">
                  Personal Information
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Input {...register("firstName")} />
                    {errors.firstName && (
                      <p className="text-xs text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="middleName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Middle Name
                    </label>
                    <Input {...register("middleName")} />
                    {errors.middleName && (
                      <p className="text-xs text-red-600">
                        {errors.middleName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Input {...register("lastName")} />
                    {errors.lastName && (
                      <p className="text-xs text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="birthdate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Birthdate
                    </label>
                    <Input {...register("birthdate")} type="date" />
                    {errors.birthdate && (
                      <p className="text-xs text-red-600">
                        {errors.birthdate.message}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Account Information
                </p>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="border-gray-200"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="border-gray-200"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="border-gray-200"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-full"
                  disabled
                >
                  Sign In {loading && <LoaderCircle className="animate-spin" />}
                </Button>
              </form>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/user/signin"
                    className="text-black font-semibold hover:text-gray-700"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthAnimationLayout>
  );
}
