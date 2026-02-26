import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthAnimationLayout from "@/components/layout/auth-animation-layout";
import { useSignInUser } from "@/hooks/use-signin-user";
import { LoaderCircle } from "lucide-react";
import { SignInUser } from "@/supabase/auth/user-signin";
import type { SignInFormDataUser } from "@/utils/types";

export default function SignUp() {
  const { loading, setLoading, register, handleSubmit, errors, navigate } =
    useSignInUser();

  const submitForm = async (data: SignInFormDataUser) => {
    try {
      setLoading(true);
      await SignInUser(data.email, data.password);
      navigate("/user/dashboard");
    } catch (error) {
      console.log("Error in signin part", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthAnimationLayout>
      <div className="min-h-screenflex items-center justify-center md:p-4 p-10">
        <div className="w-full max-w-lg  md:min-w-md space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight ">
              CELESTIAL BLOOM
            </h1>

            <p className="text-gray-600 text-sm">Welcome back</p>
          </div>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
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
                    {...register("email")}
                    className="border-gray-200"
                  />
                  {errors && errors.password && errors.email && (
                    <p className="text-xs text-red-600">Wrong credentials</p>
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
                    {...register("password")}
                    className="border-gray-200"
                  />
                  {errors && errors.password && errors.email && (
                    <p className="text-xs text-red-600">Wrong credentials</p>
                  )}
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
                  Don't have an account?{" "}
                  <Link
                    to="/user/signup"
                    className="text-black font-semibold hover:text-gray-700"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthAnimationLayout>
  );
}
