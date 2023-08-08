import { css, keyframes, styled } from "styled-components";

interface CreateEventFormProps {
  isPriorityListOpened: boolean;
}

export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;

  color: #7b61ff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const PriorityBox = styled.div`
  width: 372px;
  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;

export const PriorityInput = styled.div<CreateEventFormProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 372px;
  height: 56px;
  padding: 16px 12px;
  border: 1px solid;
  border-radius: 8px;
  border-color: #aca7c3;
  cursor: pointer;
  transition: color 300ms;
  color: ${({ isPriorityListOpened }) =>
    isPriorityListOpened ? "#7b61ff" : "#3f3f3f"};
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: #fff;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;

export const SvgPriorityIcon = styled.svg<CreateEventFormProps>`
  width: 24px;
  height: 24px;
  fill: #7b61ff;
  transition: transform 300ms;
  transform: ${({ isPriorityListOpened }) =>
    isPriorityListOpened ? "rotate(90deg)" : "rotate(-90deg)"};
`;

const openCategories = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PriorityList = styled.ul<CreateEventFormProps>`
  position: absolute;
  top: 74px;
  left: 0;
  z-index: 2;
  width: 372px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;
  padding-right: 16px;

  border-radius: 8px;
  background: #fff;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${({ isPriorityListOpened }) =>
    isPriorityListOpened &&
    css`
      animation: ${openCategories} 300ms ease-out;
    `}

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;

export const Priority = styled.p`
  color: #3f3f3f;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

export const PriorityItem = styled.li`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;

  &:not(:last-child) {
    margin-bottom: 8px;
    border-bottom: 1px solid #aca7c3;
  }

  &:hover > ${Priority} {
    color: #7b61ff;
  }
`;
