"use client";

import { styled } from "styled-components";
import { ModalBtn } from "@/app/styles/common.styled";

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #ff0000d0;
`;

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
  border: 1px solid #ff0000d0;

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

export const DeleteBtn = styled.button`
  min-width: 280px;
  min-height: 50px;
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  color: #fff;
  background-color: #ff0000d0;
  transition: color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    color: #fff;
    background-color: red;
  }

  font-size: 18px;

  @media (width < 768px) {
    min-width: 200px;
  }
`;

export const DeleteModalBtn = styled(ModalBtn)`
  background-color: #ff0000d0;

  &:hover,
  &:focus {
    background-color: red;
  }
`;
