"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/app/mobX/useStore";
import { localizeResponses } from "@/app/services/localizeResponses";
import { handleUnauthenticatedUser } from "@/app/services/handleUnauthenticatedUser";

interface ErrorProps {
  error: string | null | undefined;
}

const AuthErrorHandler: FC<ErrorProps> = observer(({ error }) => {
  const { t } = useTranslation();
  const { authStore, eventsStore } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const checkIsUnauthenticated = (err: string | undefined) =>
    err === "Unauthenticated.";

  useEffect(() => {
    const combinedError = error || authStore.error || eventsStore.error;

    (async () => {
      if (checkIsUnauthenticated(combinedError as string)) {
        await handleUnauthenticatedUser(combinedError as string);
        router.push("/");
        return;
      } else if (
        error &&
        pathname === "/profile" &&
        ![
          "Unauthenticated.",
          "No events found.",
          "Failed to delete all events. Please, try later.",
        ].includes(error)
      ) {
        authStore.setError(error);
        toast.error(t(localizeResponses(error as string)));
      }
    })();
  }, []);

  return null;
});

export default AuthErrorHandler;
