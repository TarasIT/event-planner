"use client";

import styled from "styled-components";

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

  @media (width < 768px) {
    min-width: 200px;
  }
`;
