"use client";

import { css, styled } from "styled-components";

export const DeleteDataForm = styled.div`
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
  border: 1px solid red;

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

export const FormTitle = styled.h2`
  margin-bottom: 20px;

  font-size: 24px;
  color: #411dd158;
`;

export const DeleteBtn = styled.button`
  min-width: 280px;
  min-height: 50px;
  border: 1px solid red;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  color: red;
  background-color: #fff;
  transition: color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    color: #fff;
    background-color: red;
  }

  font-size: 18px;

  ${css`
    @media screen and (max-width: 767px) {
      min-width: 200px;
    }
  `}
`;

export const ModalBtn = styled.button`
  min-width: 80px;
  min-height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: #7b61ff;
  transition: color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    background-color: #411dd1;
  }

  font-size: 18px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const ModalDescription = styled.p`
  font-size: 20px;
  text-align: center;
  color: #3f3f3f;
  margin-bottom: 20px;
`;
