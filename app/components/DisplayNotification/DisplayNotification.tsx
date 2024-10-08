"use client";

import { useStore } from "@/app/mobX/useStore";
import { localizeResponses } from "@/app/services/localizeResponses";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { toast } from "react-toastify";

interface NotificationProps {
  error: string | null;
}

const DisplayNotification: FC<NotificationProps> = ({ error }): null => {
  const { authStore } = useStore();

  useEffect(() => {
    if (error) {
      toast.error(t(localizeResponses(error)));
      authStore.setError(error);
    }
  }, [error]);

  return null;
};

export default DisplayNotification;
