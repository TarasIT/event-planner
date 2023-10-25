import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Sprite from "../../assets/images/sprite.svg";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import {
  Container,
  GoBackLink,
  SvgBackLinkIcon,
  Title,
} from "./CreateEventPage.styled";

const CreateEvent: FC = (): JSX.Element => {
  const { id } = useParams();

  return (
    <Container>
      <GoBackLink to="/">
        <SvgBackLinkIcon>
          <use xlinkHref={`${Sprite}#icon-arrow-left`}></use>
        </SvgBackLinkIcon>
        Back
      </GoBackLink>
      <Title>{id ? "Edit event" : "Create new event"}</Title>
      <NewEventForm />
    </Container>
  );
};

export default CreateEvent;
