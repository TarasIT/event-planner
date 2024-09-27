"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  color: #6243ff;

  @media (width < 768px) {
    & {
      padding: 20px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 24px;
    }
  }
`;

export const Subtitle = styled.p`
  margin-bottom: 30px;

  font-size: 24px;
  font-style: normal;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 18px;
    }
  }
`;
