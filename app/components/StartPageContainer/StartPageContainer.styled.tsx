"use client";

import { styled } from "styled-components";
import { BsPlusLg } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { IoOptionsOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

const IconStyles = (Icon: React.ComponentType) => styled(Icon)`
  width: 25px;
  height: 25px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  text-align: center;
  padding: 50px 20px;
  color: #6243ff;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  @media (width < 768px) {
    & {
      padding: 20px;
    }
  }
`;

export const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 30px;

  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 26px;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 24px;
  font-style: normal;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 18px;
    }
  }
`;

export const FeaturesListTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (width < 768px) {
    & {
      font-size: 24px;
    }
  }
`;

export const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: 302px 302px 302px;
  column-gap: 24px;
  row-gap: 40px;
  padding: 20px;

  @media (768px <= width < 1280px) {
    grid-template-columns: 332px 332px;
    row-gap: 24px;
  }
  @media (width < 768px) {
    grid-template-columns: 271px;
    row-gap: 24px;
  }
`;

export const FeatureItem = styled.li`
  padding: 10px;
  border-radius: 10px;
  border: 1px #6243ff solid;
  color: #6243ff;
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 4px 8px rgba(98, 67, 255, 0.4);
  }
`;

export const FeatureTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  font-size: 22px;

  @media (width < 768px) {
    & {
      font-size: 20px;
    }
  }
`;

export const FeatureDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

export const CreateIcon = IconStyles(BsPlusLg);

export const EditIcon = IconStyles(MdModeEdit);

export const SortIcon = IconStyles(IoOptionsOutline);

export const FilterIcon = IconStyles(CiFilter);

export const SearchIcon = IconStyles(IoIosSearch);

export const DeleteIcon = IconStyles(RiDeleteBinLine);
