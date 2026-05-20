"use client";

import React from "react";
import {
  useAboutProfiles,
  useAboutProfile,
} from "@/hooks/use-about";
import { CreateProfileForm } from "./create";
import { EditProfileForm } from "./[id]/editID";
import { Loader2 } from "lucide-react";

export default function ManageAboutPage() {
  const { data: profiles, isLoading: isListLoading, error: listError, refetch: refetchList } = useAboutProfiles();
  
  // Find target id safely (active profile or the first one available)
  const targetId = profiles && profiles.length > 0 ? (profiles.find(p => p.is_active)?.id || profiles[0].id) : null;
  
  const { data: profileDetail, isLoading: isDetailLoading, error: detailError, refetch: refetchDetail } = useAboutProfile(targetId);

  const isLoading = isListLoading || (!!targetId && isDetailLoading);
  const error = listError || detailError;

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-sm text-muted-foreground animate-pulse font-medium">Loading CMS Panel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-6 py-12 max-w-6xl mx-auto">
        <div className="text-center py-12 border border-border rounded-2xl bg-red-500/5 text-red-400">
          <p className="font-semibold text-lg">Failed to load CMS Panel</p>
          <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <CreateProfileForm
        onBack={undefined}
        onSuccess={async () => {
          await refetchList();
        }}
      />
    );
  }

  if (profileDetail) {
    return (
      <EditProfileForm
        profile={profileDetail}
        onBack={undefined}
        onSuccess={async () => {
          await refetchDetail();
          await refetchList();
        }}
      />
    );
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      <p className="text-sm text-muted-foreground animate-pulse font-medium">Setting up profile...</p>
    </div>
  );
}
