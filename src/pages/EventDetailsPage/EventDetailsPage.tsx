import React, { FC } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  Container,
  GoBackLink,
  SvgBackLinkIcon,
} from "./EventDetailsPage.styled";

const EventDetailsPage: FC = (): JSX.Element => {
  return (
    <Container>
      <GoBackLink to="/">
        <SvgBackLinkIcon>
          <use xlinkHref={`${Sprite}#icon-arrow-left`}></use>
        </SvgBackLinkIcon>
        Back
      </GoBackLink>
    </Container>
  );
};

export default EventDetailsPage;
