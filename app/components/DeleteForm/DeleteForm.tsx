"use client";

import React, { FC, useState } from "react";
import {
  DeleteBtn,
  DeleteDataForm,
  ModalActions,
  ModalBtn,
  ModalDescription,
} from "./DeleteForm.styled";
import DeleteFormTitle from "../DeleteFormTitle/DeleteFormTitle";
import { poppins } from "@/app/assets/fonts";
import Modal from "../Modal/Modal";

export const DeleteForm: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const openModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.id === "delete-events"
      ? setDescription("Are you sure, you want to delete all your events?")
      : setDescription(
          "Are you sure, you want to delete your profile with all your events?"
        );
    setIsModalOpen(true);
  };
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <DeleteDataForm>
      <DeleteFormTitle />
      <DeleteBtn
        id="delete-events"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        Delete all events
      </DeleteBtn>
      <DeleteBtn
        id="delete-profile"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        Delete your profile
      </DeleteBtn>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalDescription className={poppins.className}>
          {description}
        </ModalDescription>
        <ModalActions>
          <ModalBtn type="button" onClick={closeModal}>
            Yes
          </ModalBtn>
          <ModalBtn type="button" onClick={closeModal}>
            No
          </ModalBtn>
        </ModalActions>
      </Modal>
    </DeleteDataForm>
  );
};
