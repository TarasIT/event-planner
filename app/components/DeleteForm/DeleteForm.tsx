"use client";

import React, { FC, useState } from "react";
import {
  DeleteBtn,
  DeleteDataForm,
  FormTitle,
  ModalActions,
  ModalBtn,
  ModalDescription,
} from "./DeleteForm.styled";
import { poppins } from "@/app/assets/fonts";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";

export const DeleteForm: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const { t } = useTranslation();

  const openModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.id === "delete-events"
      ? setDescription(t("deleteAllEventsModalMessage"))
      : setDescription(t("deleteProfileModalMessage"));
    setIsModalOpen(true);
  };
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <DeleteDataForm>
      <FormTitle className={poppins.className}>{t("deleteData")}</FormTitle>
      <DeleteBtn
        id="delete-events"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        {t("deleteAllEvents")}
      </DeleteBtn>
      <DeleteBtn
        id="delete-profile"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        {t("deleteProfile")}
      </DeleteBtn>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalDescription className={poppins.className}>
          {description}
        </ModalDescription>
        <ModalActions>
          <ModalBtn
            type="button"
            className={poppins.className}
            onClick={closeModal}
          >
            {t("yes")}
          </ModalBtn>
          <ModalBtn
            type="button"
            className={poppins.className}
            onClick={closeModal}
          >
            {t("no")}
          </ModalBtn>
        </ModalActions>
      </Modal>
    </DeleteDataForm>
  );
};
