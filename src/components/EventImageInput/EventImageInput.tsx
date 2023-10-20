import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  ImageLabel,
  ImageInput,
  SvgDeleteIcon,
  ImageInputWrapper,
} from "./EventImageInput.styled";
import { StyleSheetManager } from "styled-components";

interface ImageInputProps {
  setImage: (image: string) => void;
}

const shouldForwardProp = (prop: string) => {
  return prop !== "imageBase64" && prop !== "isImageInputCompleted";
};

export const EventImageInput: FC<ImageInputProps> = ({
  setImage,
}): JSX.Element => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isImageInputCompleted, setIsImageInputCompleted] =
    useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageBase64(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ImageLabel>
        <InputName
          imageBase64={imageBase64}
          isImageInputCompleted={isImageInputCompleted}
        >
          Add picture
        </InputName>

        <ImageInputWrapper
          isImageInputCompleted={isImageInputCompleted}
          imageBase64={imageBase64}
        >
          <label>
            input
            <ImageInput
              type="file"
              accept="image/*"
              ref={imageInputRef}
              isImageInputCompleted={isImageInputCompleted}
              imageBase64={imageBase64}
              onChange={handleImageInputChange}
            />
          </label>
          <SvgDeleteIcon
            onClick={() => setImageBase64("")}
            imageBase64={imageBase64}
          >
            <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
          </SvgDeleteIcon>
        </ImageInputWrapper>
      </ImageLabel>
    </StyleSheetManager>
  );
};
