import React, { FC } from "react";
import { AddEventLink, SvgButtonIcon } from "./AddEventButton.styled";
import Sprite from "../../assets/images/sprite.svg";

export const AddEventButton: FC = (): JSX.Element => {
  return (
    <AddEventLink to="/create-event">
      <SvgButtonIcon>
        <use xlinkHref={`${Sprite}#icon-plus`}></use>
      </SvgButtonIcon>
      <span>Add New Event</span>
    </AddEventLink>
  );
};
