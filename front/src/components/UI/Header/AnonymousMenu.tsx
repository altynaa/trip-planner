import React from 'react';
import Link from "next/link";
import {useAppDispatch} from "@/app/hooks";
import {switchModalWindow} from "@/features/users/usersSlice";

const AnonymousMenu = () => {
  const dispatch = useAppDispatch();

  return (
    <div >
      <Link href="/login">
        <button
          className="btn"
          onClick={() => dispatch(switchModalWindow())}
        >
          Login
        </button>
      </Link>
      <Link href="/register">
        <button
          className="btn"
          onClick={() => dispatch(switchModalWindow())}
        >
          Sign up
        </button>
      </Link>
    </div>
  );
};

export default AnonymousMenu;