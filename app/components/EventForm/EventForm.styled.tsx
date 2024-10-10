"use client";

import { css, styled } from "styled-components";

export const CreateEventForm = styled.form`
  width: 100%;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 54px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${css`
    @media (width < 768px) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (768px <= width < 1280px) {
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 40px;
    }
  `}
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 42px;
  row-gap: 20px;
  margin-bottom: 60px;

  ${css`
    @media (width < 768px) {
      flex-wrap: nowrap;
      margin-bottom: 40px;
    }

    @media (768px <= width < 1280px) {
      height: 480px;
      column-gap: 24px;
      margin-bottom: 40px;
    }

    @media screen and (min-width: 1279px) {
      height: 280px;
    }
  `}
`;

export const AddEventButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;

  width: 193px;
  height: 56px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 8px;
  border: none;

  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  background: #7b61ff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);
  cursor: pointer;
  transition: background 300ms;

  &:hover {
    background: #6243ff;
  }

  ${css`
    @media (width < 768px) {
      width: 240px;
    }
  `}
`;
