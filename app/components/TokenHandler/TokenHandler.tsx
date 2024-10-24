"use client";

import { FC, useEffect } from "react";
import { useStore } from "../../mobX/useStore";

interface GoogleProps {
  googleAccessToken: string | undefined;
}

const TokenHandler: FC<GoogleProps> = ({ googleAccessToken }): null => {
  const { authStore } = useStore();

  useEffect(() => {
    const { getToken, setToken, token, setLoggedIn, isLoggedIn } = authStore;

    getToken();
    if (token && !isLoggedIn) setLoggedIn(true);

    if (!isLoggedIn && !token && googleAccessToken) {
      setToken(googleAccessToken);
      setLoggedIn(true);
    }
  }, [authStore.token, authStore.isLoggedIn, googleAccessToken]);

  return null;
};

export default TokenHandler;
