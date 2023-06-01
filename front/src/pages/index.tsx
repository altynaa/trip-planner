import React, {PropsWithChildren} from "react";

const Home: React.FC<PropsWithChildren> = ({children}) => {

  return (
    <>
      <main className="main-block"/>
      {children}
    </>
  )
}

export default Home;
