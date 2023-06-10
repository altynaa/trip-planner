import React, { PropsWithChildren } from "react";
import AppToolBar from "@/components/UI/Header/AppToolBar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <>
      <AppToolBar />
        {children}
    </>
  );
};

export default Layout;