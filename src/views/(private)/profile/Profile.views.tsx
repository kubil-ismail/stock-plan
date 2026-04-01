"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/button";
import { PB_PATH_AUTH_LOGOUT } from "@/lib/route";
import { MyBrokerResponse, ProfileResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import Head_profile from "./_Head.profile";
import Broker_profile from "./_Broker.profile";

interface Response {
  profile: ProfileResponse;
  brokers: MyBrokerResponse;
}

interface Props {
  response: Response;
}

export default function Profile(props: Props) {
  const { profile, brokers } = props.response ?? {};
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="hidden md:block">
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <Head_profile profile={profile.data} />

      {/* Broker Management Section */}
      <Broker_profile brokers={brokers} />

      {/* Account Summary */}
      {/* <GlassCard className="p-6">
        <h2 className="text-[20px] font-semibold text-foreground mb-6">
          Account Summary
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-lg bg-accent/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-[24px] font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard> */}

      {/* Logout Button */}
      <div className="pb-6">
        <Button
          variant="outline"
          className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/5 flex items-center gap-2"
          onClick={() => {
            router.push(PB_PATH_AUTH_LOGOUT);
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
