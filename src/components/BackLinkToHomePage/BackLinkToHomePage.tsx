import React, { FC } from "react";
import Sprite from "../../assets/images/sprite.svg";
import { GoBackLink, SvgBackLinkIcon } from "./BackLinkToHomePage.styled";
import { useTranslation } from "react-i18next";

export const BackLinkToHomePage: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <GoBackLink to="/">
      <SvgBackLinkIcon>
        <use xlinkHref={`${Sprite}#icon-arrow-left`}></use>
      </SvgBackLinkIcon>
      {t("backBtn")}
    </GoBackLink>
  );
};
