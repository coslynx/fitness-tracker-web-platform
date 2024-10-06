import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/client";
import { User } from "@/types/user";

export const useUser = () => {
  const { data: session } = useSession();

  const { data: user, isLoading, error } = useQuery<User | null>(
    ["user", session?.user?.id],
    () =>
      session?.user?.id ? getUser(session.user.id) : Promise.resolve(null)
  );

  return { user, isLoading, error };
};