"use client";
import * as yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { GlassCard } from "@/components/glass-card";
import { useRouter, useSearchParams } from "next/navigation";
import { PB_PATH_AUTH_LOGIN } from "@/lib/route";

const validationSchema = yup.object({
  fullname: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password min 8 character")
    .required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Password confirmation must match")
    .required("Password Confirmation is required"),
});

export default function Register() {
  const router = useRouter();
  const search = useSearchParams();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      return fetch("/api/register", {
        method: "post",
        body: JSON.stringify(values),
      })
        .then((respone) => respone.json())
        .then((response) => {
          if (!response.success) {
            throw {
              message: response?.message,
            };
          }

          if (search.size > 0) {
            router.replace(String(search.get("redirect")));
            return;
          }

          router.refresh();
        })
        .catch((error) => {
          handleErrorMessage(error?.message ?? "Something wrong, try again");
        });
    },
  });

  const handleErrorMessage = (message: string) => {
    console.log(message);
    switch (message) {
      case "Email already registered":
        formik.setFieldError("email", message);
        break;
      case "Username already registered":
        formik.setFieldError("username", message);
        break;
      default:
        formik.setFieldError("password2", message);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/10 flex items-center justify-center px-4 py-12">
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
              Create account
            </h1>
            <p className="text-[14px] text-muted-foreground">
              Start your investment journey with Stockplan
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              id="fullname"
              name="fullname"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              errorMsg={formik.errors.fullname}
            />

            <Input
              id="username"
              name="username"
              label="Username"
              type="text"
              placeholder="johndoe"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              errorMsg={formik.errors.username}
            />

            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
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

            <Input
              id="password2"
              name="password2"
              label="Password Confirmation"
              type="password"
              placeholder="••••••••"
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              errorMsg={formik.errors.password2}
            />

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            >
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[14px] text-muted-foreground">
              Already have an account?{" "}
              <Link
                href={PB_PATH_AUTH_LOGIN}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
