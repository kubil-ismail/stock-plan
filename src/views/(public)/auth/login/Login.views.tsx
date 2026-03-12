"use client";
import * as yup from "yup";
import Link from "next/link";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { PB_PATH_AUTH_FORGOT, PB_PATH_AUTH_REGISTER } from "@/lib/route";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const search = useSearchParams();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      return fetch("/api/login", {
        method: "post",
        body: JSON.stringify(values),
      })
        .then((respone) => respone.json())
        .then((response) => {
          if (!response.success) {
            throw {
              message: "Email / password not match",
            };
          }

          if (search.size > 0) {
            router.replace(String(search.get("redirect")));
            return;
          }

          router.refresh();
        })
        .catch((error) => {
          formik.setFieldError(
            "email",
            error?.message ?? "Something wrong, try again"
          );
        });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <GlassCard elevation={3} className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-white/20" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-[14px] text-muted-foreground">
              Sign in to continue to Stockplan
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMsg={formik.errors.email}
            />

            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMsg={formik.errors.password}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-[14px] text-muted-foreground">
                  Remember me
                </span>
              </label>
              <Link
                href={PB_PATH_AUTH_FORGOT}
                className="text-[14px] text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[14px] text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href={PB_PATH_AUTH_REGISTER}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
