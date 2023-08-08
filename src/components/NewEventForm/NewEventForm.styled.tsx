import { css, styled } from "styled-components";

interface CreateEventFormProps {
  titleInputValue?: string;
  isTitleInputValid?: boolean;
  isTitleInputCompleted?: boolean;
}

export const CreateEventForm = styled.form`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 490px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);
`;

export const SvgSelectIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%) rotate(-90deg);
  width: 24px;
  height: 24px;
  fill: #7b61ff;
`;
