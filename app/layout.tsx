import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import Section from "./layouts/Section/Section";
import Main from "./layouts/Main/Main";
import Header from "./layouts/Header/Header";
import TokenHandler from "./components/TokenHandler/TokenHandler";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const StyledComponentsRegistry = dynamic(() => import("@/app/lib/registry"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Event planner",
  description:
    "The Event Planner Next.js app is a TypeScript-based application that enables users to seamlessly create, manage, and edit events with detailed descriptions. The app offers a user-friendly interface for organizing events across various categories such as Art, Music, Business, Conference, Workshop, Party, Sport, and All.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleAccessToken = cookies().get("token")?.value;

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <TokenHandler googleAccessToken={googleAccessToken} />
          <Header />
          <Main>
            <Section>{children}</Section>
            <ToastContainer />
          </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
