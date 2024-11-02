"use client";

import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import {
  Container,
  CreateIcon,
  DeleteIcon,
  EditIcon,
  FeatureDescription,
  FeatureItem,
  FeaturesList,
  FeaturesListTitle,
  FeatureTitle,
  FilterIcon,
  IconWrapper,
  SearchIcon,
  SortIcon,
  Subtitle,
  Title,
} from "./StartPageContainer.styled";
import { useSearchParams } from "next/navigation";

export const StartPageContainer: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const query = useSearchParams();
  const currentLang = query.get("lang");

  useEffect(() => {
    if (currentLang) i18n.changeLanguage(currentLang);
  }, [currentLang]);

  return (
    <>
      <Container className={poppins.className}>
        <Title>{t("startPage.title")}</Title>
        <Subtitle>{t("startPage.subtitle")}</Subtitle>
      </Container>
      <Container className={poppins.className}>
        <FeaturesListTitle>{t("startPage.featureTitle")}</FeaturesListTitle>
        <FeaturesList>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <CreateIcon />
              </IconWrapper>
              {t("startPage.creation")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.creationDescription")}
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <EditIcon />
              </IconWrapper>
              {t("startPage.editing")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.editingDescription")}
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <SortIcon />
              </IconWrapper>
              {t("startPage.sorting")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.sortingDescription")}
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
              {t("startPage.searching")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.searchingDescription")}
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <FilterIcon />
              </IconWrapper>
              {t("startPage.filtration")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.filtrationDescription")}
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              <IconWrapper>
                <DeleteIcon />
              </IconWrapper>
              {t("startPage.deletion")}
            </FeatureTitle>
            <FeatureDescription>
              {t("startPage.deletionDescription")}
            </FeatureDescription>
          </FeatureItem>
        </FeaturesList>
      </Container>
    </>
  );
};
