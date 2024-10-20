"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  InputName,
  ImageLabel,
  ImageInput,
  Spinner,
  SvgDeleteIcon,
  ImageInputWrapper,
} from "./EventImageInput.styled";
import { useStore } from "../../mobX/useStore";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";
import { convertImageToBase64 } from "@/app/services/convertImageToBase64";
import { reduceImageSize } from "@/app/services/reduceImageSize";
import { toast } from "react-toastify";

const shouldForwardProp = (prop: string) => {
  return prop !== "picture" && prop !== "isImageInputCompleted";
};

export const EventImageInput: FC = (): JSX.Element => {
  const [picture, setPicture] = useState<string | File | Blob>();
  const [isImageInputCompleted, setIsImageInputCompleted] =
    useState<boolean>(false);
  const [isImagePrepared, setIsImagePrepared] = useState<boolean | "pending">(
    "pending"
  );
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();
  const imageErrorsMap = new Map<string, string>([
    ["Image resizing error.", "createEventPage.imageResizingError"],
    ["Image conversion error.", "createEventPage.imageConvertionError"],
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.picture) {
      eventDataStore.setPicture(event.picture);
      setPicture(event.picture);
      setIsImagePrepared(true);
    }
  }, [id, eventsStore.event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (imageInputRef.current !== e.target) {
      setIsImageInputCompleted(true);
    } else {
      setIsImageInputCompleted(false);
    }
  };

  const preparePicture = async (file: File): Promise<File | Blob | string> => {
    setIsImagePrepared(false);
    let picture: File | Blob | string = "";
    try {
      if (id) {
        picture = await convertImageToBase64(await reduceImageSize(file));
      } else {
        picture = await reduceImageSize(file);
      }
      return picture;
    } catch (error: unknown) {
      toast.error(t(imageErrorsMap.get(error as string) || (error as string)));
      return picture;
    } finally {
      setIsImagePrepared(true);
    }
  };

  const handleImageInputChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const preparedPicture = await preparePicture(file);
      if (preparedPicture) {
        setPicture(preparedPicture);
        eventDataStore.setPicture(preparedPicture);
      } else {
        setPicture("");
        eventDataStore.setPicture(null);
      }
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ImageLabel className={poppins.className}>
        <InputName
          picture={picture}
          isImageInputCompleted={isImageInputCompleted}
        >
          {t("common.eventForm.pictureInput")}
        </InputName>

        <ImageInputWrapper
          isImageInputCompleted={isImageInputCompleted}
          picture={picture}
        >
          <label className={poppins.className}>
            {t("common.eventForm.formInputPlaceholder")}
            <ImageInput
              type="file"
              accept="image/*"
              ref={imageInputRef}
              isImageInputCompleted={isImageInputCompleted}
              picture={picture}
              onChange={handleImageInputChange}
            />
          </label>
          {picture ? (
            <DeleteIconBox
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (!eventDataStore.picture) return;
                setPicture("");
                eventDataStore.setPicture("");
              }}
            >
              <SvgDeleteIcon picture={picture} />
            </DeleteIconBox>
          ) : (
            !isImagePrepared && <Spinner />
          )}
        </ImageInputWrapper>
      </ImageLabel>
    </StyleSheetManager>
  );
};
