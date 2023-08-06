import React, { FC } from "react";
import Sprite from "../../assest/images/sprite.svg";
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
    </Container>
  );
};

export default CreateEvent;
