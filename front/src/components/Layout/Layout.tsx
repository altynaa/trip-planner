import React, { PropsWithChildren } from "react";
import AppToolBar from "@/components/UI/header/AppToolBar";
import { Container } from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <>
      <AppToolBar />
      {/*<Container maxWidth="xl">*/}
        {children}
      {/*</Container>*/}
    </>
  );
};

export default Layout;