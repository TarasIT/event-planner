import { styled, css, keyframes } from "styled-components";

interface FilterProps {
  isFilterListOpened: boolean;
  currentFilter?: string;
}

export const FilterBox = styled.div<FilterProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: ${({ isFilterListOpened, currentFilter }) =>
    isFilterListOpened ? "170px" : currentFilter ? "170px" : "129px"};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: ${({ isFilterListOpened, currentFilter }) =>
    isFilterListOpened ? "24px" : currentFilter ? "12px" : "16px"};
  padding-right: ${({ isFilterListOpened, currentFilter }) =>
    isFilterListOpened ? "24px" : currentFilter ? "12px" : "16px"};
  border: none;
  border-radius: 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: ${({ isFilterListOpened }) =>
    isFilterListOpened ? "0" : "8px"};
  border-bottom-right-radius: ${({ isFilterListOpened }) =>
    isFilterListOpened ? "0" : "8px"};
  cursor: pointer;
  transition-property: width padding-left padding-right color;
  transition-duration: 300ms;

  background: #fff;
  box-shadow: ${({ isFilterListOpened }) =>
    isFilterListOpened ? "none" : "2px 4px 9px 0px rgba(166, 141, 174, 0.28)"};

  ${css<FilterProps>`
    @media screen and (max-width: 767px) {
      width: ${({ isFilterListOpened }) =>
        isFilterListOpened ? "170px" : "56px"};
      padding-left: 16px;
      padding-right: 16px;
      box-shadow: ${({ isFilterListOpened }) =>
        isFilterListOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
    }
  `}
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

export const FilterList = styled.ul<FilterProps>`
  position: absolute;
  top: 57px;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 1px solid #aca7c3;
  background: #fff;

  ${css<FilterProps>`
    @media screen and (max-width: 767px) {
      box-shadow: ${({ isFilterListOpened }) =>
        isFilterListOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
    }
  `}

  ${({ isFilterListOpened }) =>
    isFilterListOpened &&
    css`
      animation: ${openCategories} 0.3s ease-out;
    `}
`;

export const SvgUpIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: rotate(-90deg);
  stroke: #aca7c3;
  transition: stroke 300ms;

  ${FilterBox}:hover > & {
    stroke: #7b61ff;
  }
`;

export const SvgDownIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: rotate(-90deg);
  stroke: #aca7c3;
  transition: stroke 300ms;
  transform: rotate(180deg);

  ${FilterBox}:hover > & {
    stroke: #7b61ff;
  }
`;

export const Filter = styled.p`
  width: 100%;

  color: #aca7c3;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

export const FilterItem = styled.li`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 4px;
  border-bottom: 1px solid;
  border-bottom-color: #aca7c3;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    border-bottom-color: #7b61ff;
  }

  &:hover > ${Filter} {
    color: #7b61ff;
  }

  &:hover > ${SvgUpIcon}, &:hover > ${SvgDownIcon} {
    stroke: #7b61ff;
  }
`;

export const CurrentFilter = styled.p<FilterProps>`
  color: #3f3f3f;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  transition: color 300ms;

  color: ${({ isFilterListOpened }) =>
    isFilterListOpened ? "#7b61ff" : "#3F3F3F"};

  &:hover {
    color: #7b61ff;
  }

  ${FilterBox}:hover > & {
    color: #7b61ff;
  }

  ${css<FilterProps>`
    @media screen and (max-width: 767px) {
      display: ${({ isFilterListOpened }) =>
        isFilterListOpened ? "block" : "none"};
    }
  `}
`;

export const SvgFilterIcon = styled.svg<FilterProps>`
  width: 24px;
  height: 24px;
  transition: rotate(-90deg);
  stroke: ${({ isFilterListOpened }) =>
    isFilterListOpened ? "#7b61ff" : "#3F3F3F"};

  transition: stroke 300ms;

  ${FilterBox}:hover > & {
    stroke: #7b61ff;
  }
`;
