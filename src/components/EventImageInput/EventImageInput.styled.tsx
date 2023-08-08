import { css, styled } from "styled-components";

interface CreateEventFormProps {
  imageInputValue?: string;
  isImageInputCompleted?: boolean;
}

export const SvgDeleteIcon = styled.svg<CreateEventFormProps>`
  width: 24px;
  height: 24px;
  cursor: pointer;

  transition: stroke 300ms;
  stroke: ${({ imageInputValue, isImageInputCompleted }) => {
    if (imageInputValue) return "#7b61ff";
    if (!imageInputValue || isImageInputCompleted) return "#aca7c3";
  }};
`;

export const InputName = styled.p<CreateEventFormProps>`
  display: block;
  margin-bottom: 8px;
  color: ${({ imageInputValue, isImageInputCompleted }) => {
    if (imageInputValue) return "#7b61ff";
    if (!imageInputValue || isImageInputCompleted) return "#aca7c3";
  }};
`;

export const ImageInput = styled.input<CreateEventFormProps>`
  display: none;
`;

export const ImageInputWrapper = styled.div<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ imageInputValue, isImageInputCompleted }) => {
    if (imageInputValue) return "#7b61ff";
    if (!imageInputValue || isImageInputCompleted) return "#aca7c3";
  }};
  transition: border-color 300ms;
  cursor: pointer;

  & > label {
    color: ${({ imageInputValue, isImageInputCompleted }) => {
      if (imageInputValue) return "#3F3F3F";
      if (!imageInputValue || isImageInputCompleted) return "#aca7c3";
    }};
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const ImageLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;
  margin-bottom: 20px;

  color: #aca7c3;
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
