import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const NotFoundPage: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section>
      <b style={{ fontSize: 64 }}>404</b>
      <h1>{t("noPageFound")} :(</h1>
    </section>
  );
};

export default NotFoundPage;
