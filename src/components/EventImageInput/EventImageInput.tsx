import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  ImageLabel,
  ImageInput,
  SvgDeleteIcon,
  ImageInputWrapper,
} from "./EventImageInput.styled";

export const EventImageInput: FC = (): JSX.Element => {
  const [imageInputValue, setImageInputValue] = useState<string>("");
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

  const cleanImageInput = (): void => {
    setImageInputValue("");
  };

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setImageInputValue(e.target.value.trim());
  };

  return (
    <ImageLabel>
      <InputName
        imageInputValue={imageInputValue}
        isImageInputCompleted={isImageInputCompleted}
      >
        Add picture
      </InputName>

      <ImageInputWrapper
        isImageInputCompleted={isImageInputCompleted}
        imageInputValue={imageInputValue}
      >
        <label>{imageInputValue ? imageInputValue : "input"}</label>
        <ImageInput
          type="file"
          accept="image/*"
          value={imageInputValue}
          ref={imageInputRef}
          isImageInputCompleted={isImageInputCompleted}
          imageInputValue={imageInputValue}
          onChange={handleImageInputChange}
        />
        <SvgDeleteIcon
          onClick={cleanImageInput}
          imageInputValue={imageInputValue}
        >
          <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
        </SvgDeleteIcon>
      </ImageInputWrapper>
    </ImageLabel>
  );
};
