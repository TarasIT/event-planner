import React, { FC } from "react";

const NotFoundPage: FC = (): JSX.Element => {
  return (
    <section>
      <b style={{ fontSize: 64 }}>404</b>
      <p>Sorry, we couldn't find that page :(</p>
    </section>
  );
};

export default NotFoundPage;
