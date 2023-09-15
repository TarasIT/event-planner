import React, { FC } from "react";
import Sprite from "../../assets/images/sprite.svg";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import {
  Container,
  GoBackLink,
  SvgBackLinkIcon,
  Title,
} from "./CreateEventPage.styled";

const CreateEvent: FC = (): JSX.Element => {
  return (
    <Container>
      <GoBackLink to="/">
        <SvgBackLinkIcon>
          <use xlinkHref={`${Sprite}#icon-arrow-left`}></use>
        </SvgBackLinkIcon>
        Back
      </GoBackLink>
      <Title>Create new event</Title>
      <NewEventForm />
    </Container>
  );
};

export default CreateEvent;
