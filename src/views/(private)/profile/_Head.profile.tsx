"use client";
import * as yup from "yup";
import { useState } from "react";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Profile } from "@/types/auth";
import { useFormik } from "formik";
import { toast } from "sonner";
import { update_auth_profile } from "@/services/auth";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  profile: Profile;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  fullname: yup.string().required("Fullname is required"),
  username: yup.string().required("Username is required"),
});

function Head_profile(props: Props) {
  const { profile } = props;

  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: profile?.fullname,
      username: profile?.username,
      email: profile?.email,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        fullname: values.fullname === profile.fullname ? "" : values.fullname,
        username: values.username === profile.username ? "" : values.username,
        email: values.email === profile.email ? "" : values.email,
      };

      return update_auth_profile(payload)
        .then((response) => {
          if (!response.status) {
            throw {
              message: response?.message,
            };
          }

          toast.success("You're all set!", {
            description: "Your profile has been updated successfully.",
            icon: <CheckCircle size="14px" className="text-green-600" />,
          });
        })
        .catch((error) => {
          switch (error?.message) {
            case "Email already registered":
              formik.setFieldError("email", error?.message);
              break;

            case "Username already registered":
              formik.setFieldError("username", error?.message);
              break;
            default:
              toast.error("Failed to update profile", {
                description: "Something went wrong. Please try again.",
                icon: <XCircle size="14px" className="text-red-600" />,
              });
              break;
          }
        });
    },
  });

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-[48px] font-bold text-white">
              {profile.fullname?.charAt(0)}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          {!isEditing ? (
            <div className="space-y-5">
              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Full Name
                </p>
                <p className="text-[18px] font-semibold text-foreground">
                  {profile.fullname}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Username
                </p>
                <p className="text-[16px] text-foreground">
                  {profile.username}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-muted-foreground mb-1">Email</p>
                <p className="text-[16px] text-foreground">{profile.email}</p>
              </div>

              <div className="pt-4">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <Input
                id="fullname"
                name="fullname"
                label="Fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                errorMsg={formik.errors.fullname}
              />

              <Input
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                errorMsg={formik.errors.username}
              />

              <Input
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                errorMsg={formik.errors.email}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  loading={formik.isSubmitting}
                >
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default Head_profile;
