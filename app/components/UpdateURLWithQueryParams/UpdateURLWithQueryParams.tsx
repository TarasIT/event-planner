"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/app/services/createQueryString";

const UpdateURLWithQueryParams = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(createQueryString());
  }, []);

  return null;
};

export default UpdateURLWithQueryParams;
