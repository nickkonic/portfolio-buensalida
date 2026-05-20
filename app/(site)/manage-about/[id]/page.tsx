"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAboutProfile } from "@/hooks/use-about";
import { ViewProfileDetails } from "./viewID";
import { EditProfileForm } from "./editID";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default function ProfileDetailPage({ params, searchParams }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const resolvedSearchParams = use(searchParams);

  const { data: profile, isLoading, error, refetch } = useAboutProfile(id);
  const [isEditing, setIsEditing] = useState(resolvedSearchParams.edit === "true");

  // Keep state in sync with URL queries if they change
  useEffect(() => {
    setIsEditing(resolvedSearchParams.edit === "true");
  }, [resolvedSearchParams.edit]);

  const handleBack = () => {
    router.push("/manage-about");
  };

  const handleSuccess = () => {
    refetch();
    setIsEditing(false);
    // Remove query params
    router.push(`/manage-about/${id}`);
  };

  const handleToggleEdit = (editing: boolean) => {
    setIsEditing(editing);
    if (editing) {
      router.push(`/manage-about/${id}?edit=true`);
    } else {
      router.push(`/manage-about/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading profile details...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center max-w-md mx-auto px-4">
        <div className="h-12 w-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold">Profile Not Found</h2>
        <p className="text-sm text-muted-foreground">
          {error?.message || "The profile you are trying to access does not exist or has been deleted."}
        </p>
        <Button onClick={handleBack} variant="outline" className="rounded-xl mt-2">
          Back to List
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container px-4 py-8 max-w-[1600px] mx-auto">
        <EditProfileForm
          profile={profile}
          onBack={() => handleToggleEdit(false)}
          onSuccess={handleSuccess}
        />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <ViewProfileDetails
        profile={profile}
        onBack={handleBack}
        onEdit={() => handleToggleEdit(true)}
      />
    </div>
  );
}
