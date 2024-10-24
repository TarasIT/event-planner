"use client";

import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/mobX/useStore";
import { toast } from "react-toastify";
import { localizeResponses } from "@/app/services/localizeResponses";
import { observer } from "mobx-react";

interface ErrorProps {
  error: string | null;
}

const ErrorHandler: FC<ErrorProps> = observer(({ error }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { authStore, eventsStore } = useStore();

  useEffect(() => {
    const { setLoggedIn, deleteToken } = authStore;

    if (error === "Unauthenticated.") {
      toast.error(t(localizeResponses(error)));
      authStore.setError(error);
      deleteToken();
      setLoggedIn(false);
      router.push(`/?lang=${i18n.language}`);
    }
    if (error && error !== "No events found.") {
      toast.error(t(localizeResponses(error)));
      eventsStore.setError(error);
    }
  }, [authStore, eventsStore, error, i18n.language, router]);

  return null;
});

export default ErrorHandler;
