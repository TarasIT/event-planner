"use client";

import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GoBackLink, SvgBackLinkIcon, Back } from "./BackLink.styled";
import { poppins } from "@/app/assets/fonts";

export const BackLink: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const pathRedirects: Record<string, string> = {
    "/signup": "/",
    "/login": "/",
    "/forgot-password": "/login",
  };

  return (
    <GoBackLink
      onClick={() => {
        const redirectPath = pathRedirects[pathname];
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.back();
          router.refresh();
        }
      }}
      className={poppins.className}
    >
      <SvgBackLinkIcon />
      <Back>{t("common.backBtn")}</Back>
    </GoBackLink>
  );
};
