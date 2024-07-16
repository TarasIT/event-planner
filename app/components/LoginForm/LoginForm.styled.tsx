"use client";

import { css, styled } from "styled-components";

export const AuthForm = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 8px;
  width: 450px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${css`
    @media screen and (max-width: 767px) {
      width: 280px;
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 360px;
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
    @media screen and (max-width: 767px) {
      flex-wrap: nowrap;
      margin-bottom: 40px;
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      height: 480px;
      column-gap: 24px;
      margin-bottom: 40px;
    }

    @media screen and (min-width: 1280px) {
      height: 280px;
    }
  `}
`;

export const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 193px;
  height: 56px;
  margin-left: auto;
  margin-right: auto;
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
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;
