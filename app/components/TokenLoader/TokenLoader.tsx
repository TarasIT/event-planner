"use client";

import { useEffect } from "react";
import { useStore } from "../../mobX/useStore";

const TokenLoader = (): null => {
  const { authStore } = useStore();

  useEffect(() => {
    authStore.getToken();
  }, []);

  return null;
};

export default TokenLoader;
