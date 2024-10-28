"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useStore } from "@/app/mobX/useStore";
import { localizeResponses } from "@/app/services/localizeResponses";

interface ErrorProps {
  error: string | null | undefined;
}

const EventsErrorHandler: FC<ErrorProps> = observer(({ error }) => {
  const { t } = useTranslation();
  const { eventsStore } = useStore();

  useEffect(() => {
    if (error === "Unauthenticated.") return;

    switch (true) {
      case error === "No events found.":
        eventsStore.setError(error as string);
        break;
      case error !== null:
        toast.error(t(localizeResponses(error as string)));
        eventsStore.setError(error as string);
        break;
    }
  }, []);

  return null;
});

export default EventsErrorHandler;
