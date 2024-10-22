"use client";

import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/mobX/useStore";
import { toast } from "react-toastify";
import { localizeResponses } from "@/app/services/localizeResponses";

interface GoogleProps {
  token?: string | undefined;
  error?: string | null;
}

const GoogleAuth: FC<GoogleProps> = ({ token, error }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { authStore } = useStore();

  useEffect(() => {
    const { setLoggedIn, setToken, deleteToken, setError } = authStore;

    if (!authStore.isLoggedIn && !authStore.token && token) {
      setToken(token);
      setLoggedIn(true);
    }

    if (error === "Unauthenticated.") {
      toast.error(t(localizeResponses(error)));
      setError(error);
      deleteToken();
      setLoggedIn(false);
      router.push(`/?lang=${i18n.language}`);
      return;
    }
  }, [
    authStore.isLoggedIn,
    authStore.token,
    token,
    error,
    toast.error,
    t,
    router.push,
  ]);

  return null;
};

export default GoogleAuth;
