"use client";

import { styled } from "styled-components";

export const Title = styled.h1`
  margin-bottom: 25px;

  color: #3f3f3f;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 24px;
    }
  }
`;
