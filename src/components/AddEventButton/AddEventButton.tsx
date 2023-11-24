import React, { FC } from "react";
import { AddEventLink, SvgButtonIcon } from "./AddEventButton.styled";
import Sprite from "../../assets/images/sprite.svg";
import { useTranslation } from "react-i18next";
import { useStore } from "../../hooks/useStore";

export const AddEventButton: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { categoryFilter } = useStore();

  return (
    <AddEventLink
      to="/create-event"
      onClick={() => categoryFilter.getCurrentCategory("")}
    >
      <SvgButtonIcon>
        <use xlinkHref={`${Sprite}#icon-plus`}></use>
      </SvgButtonIcon>
      <span>{t("addNewEventBtn")}</span>
    </AddEventLink>
  );
};
