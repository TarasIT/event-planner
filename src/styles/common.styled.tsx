import { styled } from "styled-components";

export const TimeSelector = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  background-color: transparent;
  touch-action: none;
  cursor: pointer;
`;
