import React, { ReactNode } from "react";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";

interface Props {
  children: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <GlobalHeader />

      <main>
        {children}
      </main>

      <GlobalFooter />
    </div>
  );
}

export default MainLayout;
