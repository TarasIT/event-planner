import { css, styled } from "styled-components";

export const Title = styled.h1`
  margin-bottom: 25px;

  color: #3f3f3f;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        font-size: 24px;
      }
    }
  `}
`;
