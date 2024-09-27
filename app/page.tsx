"use client";

import { Suspense } from "react";
import Loading from "./loading";
import { Container, Subtitle, Title } from "./page.styled";
import { poppins } from "./assets/fonts";
import { useTranslation } from "react-i18next";

const StartPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<Loading />}>
      <Container className={poppins.className}>
        <Title>{t("startPage.title")}</Title>
        <Subtitle>{t("startPage.subtitle")}</Subtitle>
      </Container>
    </Suspense>
  );
};

export default StartPage;
