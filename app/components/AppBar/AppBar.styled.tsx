"use client";

import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;

  @media (768px <= width < 1280px) {
    & {
      margin-bottom: 96px;
    }
  }
`;

export const Title = styled.h1`
  margin-right: auto;

  color: #3f3f3f;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (width < 768px) {
    & {
      display: none;
    }
  }

  @media (768px <= width < 1280px) {
    & {
      position: absolute;
      top: 81px;
      left: 0;
    }
  }
`;

export const Menu = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (width < 768px) {
    & {
      justify-content: flex-end;
      width: 100%;
    }
  }

  @media (768px <= width < 1280px) {
    & {
      justify-content: flex-end;
      width: 767px;
    }
  }
`;

export const MenuItem = styled.li`
  &:not(:last-child) {
    margin-right: 24px;
  }

  @media (width < 768px) {
    &:nth-child(1) {
      position: relative;
      top: 0;
      right: 160px;
      margin-right: 0;
    }

    &:nth-child(2) {
      position: relative;
      top: -28px;
      right: 144px;
      margin-right: 0;
    }

    &:nth-child(3) {
      position: absolute;
      top: 0;
      right: 72px;
      margin-right: 0;
    }
  }
`;
