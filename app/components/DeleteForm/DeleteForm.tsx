"use client";

import React, { FC, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import {
  DeleteBtn,
  DeleteDataForm,
  DeleteModalBtn,
  FormTitle,
} from "./DeleteForm.styled";
import { poppins } from "@/app/assets/fonts";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/mobX/useStore";
import {
  ModalActions,
  ModalDescription,
  Spinner,
} from "@/app/styles/common.styled";

export const DeleteForm: FC = observer((): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [isDeleteEventsBtnActive, setIsDeleteEventsBtnActive] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const { authStore, eventsStore } = useStore();
  const router = useRouter();

  const openModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.id === "delete-events") {
      setIsDeleteEventsBtnActive(true);
      setDescription(t("modalMessages.deleteAllEvents"));
    }
    if (e.currentTarget.id === "delete-profile") {
      setIsDeleteEventsBtnActive(false);
      setDescription(t("modalMessages.deleteProfile"));
    }
    setIsModalOpened(true);
  };

  const closeModal = (): void => {
    setIsDeleteEventsBtnActive(false);
    setIsModalOpened(false);
  };

  const handleDeletion = async (): Promise<void> => {
    setIsModalOpened(false);

    if (isDeleteEventsBtnActive) {
      await eventsStore.deleteAllEvents();
      if (eventsStore.error === "Unauthenticated.") {
        return router.push("/");
      }
      router.push("/home");
      router.refresh();
    } else {
      await authStore.deleteProfile();
      router.push("/");
    }
  };

  return (
    <DeleteDataForm>
      <FormTitle className={poppins.className}>
        {t("profilePage.deleteData")}
      </FormTitle>
      <DeleteBtn
        id="delete-events"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        {eventsStore.isLoading && isDeleteEventsBtnActive ? (
          <Spinner />
        ) : (
          t("profilePage.deleteAllEvents")
        )}
      </DeleteBtn>
      <DeleteBtn
        id="delete-profile"
        type="button"
        onClick={openModal}
        className={poppins.className}
      >
        {authStore.isLoading && !isDeleteEventsBtnActive ? (
          <Spinner />
        ) : (
          t("profilePage.deleteProfile")
        )}
      </DeleteBtn>

      <Modal isOpened={isModalOpened} onClose={closeModal}>
        <ModalDescription className={poppins.className}>
          {description}
        </ModalDescription>
        <ModalActions>
          <DeleteModalBtn
            type="button"
            className={poppins.className}
            onClick={handleDeletion}
          >
            {t("modalMessages.yes")}
          </DeleteModalBtn>
          <DeleteModalBtn
            type="button"
            className={poppins.className}
            onClick={closeModal}
          >
            {t("modalMessages.no")}
          </DeleteModalBtn>
        </ModalActions>
      </Modal>
    </DeleteDataForm>
  );
});
