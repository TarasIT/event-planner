import { css, styled } from "styled-components";

interface CreateEventFormProps {
  titleInputValue?: string;
  isTitleIputValid?: boolean;
  isTitleIputCompleted?: boolean;
}

export const CreateEventForm = styled.form`
  position: relative;
`;

export const SvgDeleteIcon = styled.svg<CreateEventFormProps>`
  position: absolute;
  bottom: 16px;
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  transition: stroke 300ms;
  stroke: ${({ titleInputValue, isTitleIputValid, isTitleIputCompleted }) => {
    if (titleInputValue && isTitleIputValid) return "#7b61ff";
    if (!isTitleIputValid) return "#ff2b77";
    if (!titleInputValue || isTitleIputCompleted) return "#aca7c3";
  }};
`;

export const TitleInput = styled.input<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({
    titleInputValue,
    isTitleIputValid,
    isTitleIputCompleted,
  }) => {
    if (titleInputValue && isTitleIputValid && !isTitleIputCompleted) {
      return "#aca7c3";
    }
    if (!isTitleIputValid) return "#ff2b77";
    if (!titleInputValue) return "#aca7c3";
    if (titleInputValue && isTitleIputValid && isTitleIputCompleted) {
      return "#7b61ff";
    }
  }};
  transition: border-color 300ms;

  color: #3f3f3f;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: #aca7c3;
  }
`;

export const InvalidInputTitle = styled.span`
  position: absolute;
  right: 19px;
  bottom: -20px;

  color: #ff2b77;
  text-align: right;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const TitleLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;

  color: #7b61ff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;

  ${css`
    @media screen and (max-width: 767px) {
      width: 240px;
      margin-left: auto;
      margin-right: auto;
    }
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
  `}
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 8px;
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
