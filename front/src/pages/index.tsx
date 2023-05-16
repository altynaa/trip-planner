import React, {PropsWithChildren} from "react";
import Countries from "@/pages/countries";

const Home: React.FC<PropsWithChildren> = ({children}) => {

  return (
    <>
      <main>
        <Countries/>
      </main>
      {children}
    </>
  )
}

export default Home;
