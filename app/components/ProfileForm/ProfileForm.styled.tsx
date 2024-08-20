"use client";

import { css, styled } from "styled-components";

export const ProfileUserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 767px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 54px;
  border-radius: 20px;
  border: 1px solid #7b61ff;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${css`
    @media screen and (max-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 40px;
    }
  `}
`;
