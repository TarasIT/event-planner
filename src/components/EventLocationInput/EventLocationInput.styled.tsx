import { css, styled } from "styled-components";

interface CreateEventFormProps {
  locationInputValue?: string;
  isLocationInputValid?: boolean;
  isLocationInputCompleted?: boolean;
}
export const SvgDeleteIcon = styled.svg<CreateEventFormProps>`
  position: absolute;
  top: 40px;
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  transition: stroke 300ms;
  stroke: ${({
    locationInputValue,
    isLocationInputValid,
    isLocationInputCompleted,
  }) => {
    if (locationInputValue && isLocationInputValid) return "#7b61ff";
    if (!isLocationInputValid) return "#ff2b77";
    if (!locationInputValue || isLocationInputCompleted) return "#aca7c3";
  }};
`;
export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;
`;

export const InvalidInputWarning = styled.path`
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

export const LocationInput = styled.input<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({
    locationInputValue,
    isLocationInputValid,
    isLocationInputCompleted,
  }) => {
    if (
      locationInputValue &&
      isLocationInputValid &&
      !isLocationInputCompleted
    ) {
      return "#aca7c3";
    }
    if (!isLocationInputValid) return "#ff2b77";
    if (!locationInputValue) return "#aca7c3";
    if (
      locationInputValue &&
      isLocationInputValid &&
      isLocationInputCompleted
    ) {
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

export const LocationLabel = styled.label`
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
