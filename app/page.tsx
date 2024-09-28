"use client";

import { Suspense } from "react";
import Loading from "./loading";
import {
  Container,
  FeaturesList,
  FeatureItem,
  FeaturesListTitle,
  FeatureTitle,
  Subtitle,
  Title,
  FeatureDescription,
  CreateIcon,
  IconWrapper,
  EditIcon,
  SortIcon,
  FilterIcon,
  SearchIcon,
  DeleteIcon,
} from "./page.styled";
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
    </Suspense>
  );
};

export default StartPage;
