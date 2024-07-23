import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Orbitron } from "next/font/google";
import SearchBox from "./SearchBox";

const orbitron = Orbitron({ subsets: ["latin"] });

const Navbar = ({hasSearch = true}: {hasSearch?: boolean}) => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <h1
            className={`text-2xl font-bold ${orbitron.className}`}
          >
            Data <span className="text-amber-300">Digits</span>
          </h1>
        </Link>
        {hasSearch && <SearchBox/>}
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
