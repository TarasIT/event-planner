"use client";

import { FC, useEffect } from "react";
import { useStore } from "../../mobX/useStore";

interface TokenProps {
  token: string | undefined;
}

const TokenHandler: FC<TokenProps> = ({ token }): null => {
  const { authStore } = useStore();

  useEffect(() => {
    if (token) {
      authStore.setToken(token);
      authStore.setLoggedIn(true);
    }
  }, []);

  return null;
};

export default TokenHandler;
