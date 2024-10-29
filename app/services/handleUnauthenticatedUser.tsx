import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../mobX/useStore";
import { localizeResponses } from "./localizeResponses";
import { t } from "i18next";

export const handleUnauthenticatedUser = async (error: string) => {
  const { authStore } = useStore();

  authStore.setLoggedIn(false);
  authStore.deleteToken();
  await axios.post("/logout");
  toast.error(t(localizeResponses(error)));
};
