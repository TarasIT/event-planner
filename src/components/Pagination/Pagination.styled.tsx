import { css, styled } from "styled-components";

interface PagesProps {
  isActive: boolean;
}

export const PagesList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;

  padding: 10px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${css`
    @media screen and (max-width: 767px) {
      gap: 0;
    }
  `}
`;

export const SvgDecreasePage = styled.svg<PagesProps>`
  width: 24px;
  height: 24px;
  fill: #3f3f3f;
  cursor: pointer;
  fill: ${({ isActive }) => (isActive ? "#7b61ff" : "#aca7c3")};
`;

export const SvgIncreasePage = styled(SvgDecreasePage)`
  transform: rotate(180deg);
`;

export const PageItem = styled.li<PagesProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;

  color: ${({ isActive }) => (isActive ? "#7b61ff" : "#aca7c3")};
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;

  ${css`
    @media screen and (max-width: 767px) {
      width: 40px;
      height: 40px;
      font-weight: 800;
    }
  `}
`;

export const Page = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Ellipsis = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
