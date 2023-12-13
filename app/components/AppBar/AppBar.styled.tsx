"use client";

import { css, styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        justify-content: space-between;
        width: 100%;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        margin-bottom: 96px;
      }
    }
  `}
`;

export const Title = styled.h1`
  margin-right: auto;

  color: #3f3f3f;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        display: none;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        position: absolute;
        top: 81px;
        left: 0;
      }
    }
  `}
`;

export const Menu = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        justify-content: flex-end;
        width: 100%;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        justify-content: flex-end;
        width: 768px;
      }
    }
  `}
`;

export const MenuItem = styled.li`
  &:not(:last-child) {
    margin-right: 24px;
  }

  ${css`
    @media screen and (max-width: 767px) {
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 80px;
        margin-right: 0;
      }

      &:nth-child(1) {
        position: relative;
        top: -28px;
        right: 160px;
        margin-right: 0;
      }
    }
  `}
`;
