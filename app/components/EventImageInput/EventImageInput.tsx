"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  InputName,
  ImageLabel,
  ImageInput,
  SvgDeleteIcon,
  ImageInputWrapper,
} from "./EventImageInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../mobX/useStore";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => {
  return prop !== "imageBase64" && prop !== "isImageInputCompleted";
};

export const EventImageInput: FC = (): JSX.Element => {
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isImageInputCompleted, setIsImageInputCompleted] =
    useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { setFormValues, eventsStore } = useStore();
  const { id } = useParams();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id as string);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.image) {
      setFormValues.setImage(event.image);
      setImageBase64(event.image);
    }
  }, [event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (imageInputRef.current !== e.target) {
      setIsImageInputCompleted(true);
    } else {
      setIsImageInputCompleted(false);
    }
  };

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageBase64(reader.result);
          setFormValues.setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ImageLabel className={poppins.className}>
        <InputName
          imageBase64={imageBase64}
          isImageInputCompleted={isImageInputCompleted}
        >
          {t("pictureInput")}
        </InputName>

        <ImageInputWrapper
          isImageInputCompleted={isImageInputCompleted}
          imageBase64={imageBase64}
        >
          <label className={poppins.className}>
            {t("formInputPlaceholder")}
            <ImageInput
              type="file"
              accept="image/*"
              ref={imageInputRef}
              isImageInputCompleted={isImageInputCompleted}
              imageBase64={imageBase64}
              onChange={handleImageInputChange}
            />
          </label>
          {imageBase64 && (
            <DeleteIconBox
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setImageBase64("");
              }}
            >
              <SvgDeleteIcon imageBase64={imageBase64} />
            </DeleteIconBox>
          )}
        </ImageInputWrapper>
      </ImageLabel>
    </StyleSheetManager>
  );
};
