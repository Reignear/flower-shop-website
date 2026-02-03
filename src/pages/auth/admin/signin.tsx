import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SignInFormData } from "@/utils/types";
import { SignInAdmin } from "@/supabase/auth/admin-signin";
import { useSignInAdmin } from "@/hooks/use-signin-admin";
import { LoaderCircle } from "lucide-react";

export default function Login() {
  const { register, handleSubmit, errors, loading, setLoading, navigate } =
    useSignInAdmin();

  const submitForm = async (data: SignInFormData) => {
    try {
      setLoading(true);
      await SignInAdmin(data.email, data.password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Error in signin part", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      {/* <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight hover:text-gray-600 transition">
            CELESTIAL BLOOM
          </h1>

          <p className="text-gray-600 text-sm">Welcome back</p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Sign in</CardTitle>
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
                  className="border-gray-200"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
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
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white rounded-full"
              >
                Sign In{loading && <LoaderCircle className="animate-spin" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div> */}
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight hover:text-gray-600 transition">
            CELESTIAL BLOOM
          </h1>

          <p className="text-gray-600 text-sm">Hi! Welcome back</p>
        </div>
        <Card>
          <CardContent className="w-2xl">
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src="/assets/images/celestial-bloom-logo.webp"
                  alt="Celestial Bloom"
                  className=""
                />
              </div>
              <div className="flex items-center justify-center">
                <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
                  <CardHeader className=" p-0">
                    <CardTitle className="text-2xl">Sign in</CardTitle>
                    <CardDescription>
                      Enter your email to access your account
                    </CardDescription>
                  </CardHeader>
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
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
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
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-full"
                  >
                    Sign In
                    {loading && <LoaderCircle className="animate-spin" />}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
