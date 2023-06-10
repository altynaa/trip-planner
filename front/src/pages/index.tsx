import React, {PropsWithChildren} from "react";
import PromoBlock from "@/components/UI/Promo/PromoBlock";


const Home: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <>
            <main className="main-block"/>
            <PromoBlock/>
            {children}
        </>
    )
}

export default Home;
