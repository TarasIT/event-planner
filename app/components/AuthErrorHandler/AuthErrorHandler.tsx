"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useStore } from "@/app/mobX/useStore";
import { localizeResponses } from "@/app/services/localizeResponses";
import { usePathname, useRouter } from "next/navigation";

interface ErrorProps {
  error: string | null | undefined;
}

const AuthErrorHandler: FC<ErrorProps> = observer(({ error }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { authStore } = useStore();

  useEffect(() => {
    (async () => {
      switch (true) {
        case error === "Unauthenticated.":
          await authStore.logout();
          router.push("/");
          break;
        case error &&
          error !== "No events found." &&
          error !== "Failed to delete all events. Please, try later." &&
          pathname === "/profile":
          toast.error(t(localizeResponses(error)));
          authStore.setError(error);
          break;
      }
    })();
  }, [error, pathname, router.push, i18n.language]);

  return null;
});

export default AuthErrorHandler;
