import React, { FC } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  Container,
  GoBackLink,
  SvgBackLinkIcon,
} from "./EventDetailsPage.styled";
import { EventDetailsCard } from "../../components/EventDetailsCard/EventDetailsCard";

const EventDetailsPage: FC = (): JSX.Element => {
  return (
    <Container>
      <GoBackLink to="/">
        <SvgBackLinkIcon>
          <use xlinkHref={`${Sprite}#icon-arrow-left`}></use>
        </SvgBackLinkIcon>
        Back
      </GoBackLink>
      <EventDetailsCard />
    </Container>
  );
};

export default EventDetailsPage;
