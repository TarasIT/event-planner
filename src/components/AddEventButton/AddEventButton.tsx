import React, { FC } from "react";
import { AddEventLink, SvgButtonIcon } from "./AddEventButton.styled";
import Sprite from "../../assets/images/sprite.svg";
import { useTranslation } from "react-i18next";

export const AddEventButton: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <AddEventLink to="/create-event">
      <SvgButtonIcon>
        <use xlinkHref={`${Sprite}#icon-plus`}></use>
      </SvgButtonIcon>
      <span>{t("addNewEventBtn")}</span>
    </AddEventLink>
  );
};
