import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";
import UsersMenu from "@/components/UI/Header/UsersMenu";
import AnonymousMenu from "@/components/UI/Header/AnonymousMenu";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link href="/">
              <h1 className="main-title">BonVoyage</h1>
            </Link>
          </div>

          <nav className="main-nav">
            <ul className="main-nav_list">
              <li className="main-nav_item">
                <Link className="main-nav_link" href="/">Home</Link>
              </li>
              <li className="main-nav_item">
                <a className="main-nav_link" href="front/src/components/UI/header#">Countries</a>
              </li>
              <li className="main-nav_item">
                <a className="main-nav_link" href="front/src/components/UI/header#">Hotels</a>
              </li>
            </ul>
          </nav>
          {user ? <UsersMenu/> : <AnonymousMenu/> }
        </div>
      </header>
    </>
  );
};

export default AppToolBar;