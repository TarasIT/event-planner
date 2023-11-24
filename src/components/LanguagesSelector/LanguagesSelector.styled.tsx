import { styled, keyframes, css } from "styled-components";

interface LanguagesProps {
  isLangListOpened: boolean;
}

const openLanguages = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LangBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 69px;
  height: 48px;
  padding: 12px 4px 12px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  color: #3f3f3f;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

export const SvgLangIcon = styled.svg<LanguagesProps>`
  width: 24px;
  height: 24px;
  fill: #3f3f3f;
  transition: transform 300ms;
  transform: ${({ isLangListOpened }) =>
    isLangListOpened ? "rotate(90deg)" : "rotate(-90deg)"};
`;

export const LangList = styled.ul<LanguagesProps>`
  position: absolute;
  top: 63px;
  left: 0;
  z-index: 1;
  width: 69px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 12px;

  border-radius: 8px;
  background: #fff;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${({ isLangListOpened }) =>
    isLangListOpened &&
    css`
      animation: ${openLanguages} 300ms ease;
    `}
`;

export const LangItem = styled.li`
  width: 45px;
  padding-bottom: 4px;
  border-bottom: 1px solid #aca7c3;

  color: #aca7c3;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:hover {
    color: #7b61ff;
  }
`;
