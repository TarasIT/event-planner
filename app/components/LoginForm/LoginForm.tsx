"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";
import { AuthBtn, AuthForm, Container } from "./LoginForm.styled";
import { NewEvent } from "../../types/types";
import { EventTitleInput } from "../EventTitleInput/EventTitleInput";
import { EventLocationInput } from "../EventLocationInput/EventLocationInput";
import { EventDescriptionInput } from "../EventDescriptionInput/EventDescriptionInput";
import { EventCategoryInput } from "../EventCategoryInput/EventCategoryInput";
import { EventPriorityInput } from "../EventPriorityInput/EventPriorityInput";
import { EventImageInput } from "../EventImageInput/EventImageInput";
import { EventDateInput } from "../EventDateInput/EventDateInput";
import { EventTimeInput } from "../EventTimeInput/EventTimeInput";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";

export const LoginForm: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const { setFormValues, eventsStore } = useStore();
  const KEY = process.env.NEXT_PUBLIC_STORAGE_KEY!;
  const parsedEvents = eventsStore.getEvents(KEY);

  return (
    <AuthForm>
      <EmailInput />
      <PasswordInput />
      <AuthBtn className={poppins.className}>{t("login")}</AuthBtn>
    </AuthForm>
  );
});
