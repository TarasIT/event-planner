"use client";

import { styled } from "styled-components";

export const PasswordsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
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

  @media (width < 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (768px <= width < 1280px) {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 40px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  color: #411dd158;
`;

export const ResetBtn = styled.button`
  min-width: 280px;
  min-height: 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  background-color: #7b61ff;
  transition: color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    background-color: #6243ff;
  }

  font-size: 18px;

  @media (width < 768px) {
    min-width: 200px;
  }
`;
