import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  email: string;
}

interface SessionResponse {
  authenticated: boolean;
  user?: AuthUser;
}

// ─── Query Keys ────────────────────────────────────────────────────────────

export const authKeys = {
  session: ["auth", "session"] as const,
};

// ─── useSession ─────────────────────────────────────────────────────────────

/**
 * Returns the currently authenticated user, or null when not logged in.
 * Re-fetches on window focus so the UI stays in sync across tabs.
 */
export function useSession() {
  return useQuery<AuthUser | null>({
    queryKey: authKeys.session,
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch session");
      const data: SessionResponse = await res.json();
      return data.user ?? null;
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// ─── useLogin ───────────────────────────────────────────────────────────────

interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Mutation hook to log in. Invalidates the session cache on success
 * and redirects to /dashboard (or a custom path).
 */
export function useLogin(redirectTo = "/dashboard") {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, LoginPayload>({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Login failed");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session });
      router.push(redirectTo);
    },
  });
}

// ─── useLogout ──────────────────────────────────────────────────────────────

/**
 * Mutation hook to log out. Clears the session cache and redirects to /login.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session, null);
      queryClient.clear();
      router.push("/login");
    },
  });
}
