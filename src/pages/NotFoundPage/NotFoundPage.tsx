import React, { FC } from "react";

const NotFoundPage: FC = (): JSX.Element => {
  return (
    <section>
      <b style={{ fontSize: 64 }}>404</b>
      <h1>Sorry, we couldn't find that page :(</h1>
    </section>
  );
};

export default NotFoundPage;
