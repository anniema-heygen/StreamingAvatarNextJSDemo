"use client";

import { useState } from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Demo from "@/components/Demo";
import { HeyGenLogo } from "@/components/HeyGenLogo";

type Pages = "docs" | "usage" | "installation";
export default function App() {
  const [currentPage, setCurrentPage] = useState<Pages>("usage");

  const handleNav = (key: Pages) => {
    setCurrentPage(key);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar>
        <NavbarBrand>
          <HeyGenLogo />
          <p className="text-xl font-extrabold">STREAMING AVATAR SDK</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              color={currentPage === "docs" ? "secondary" : "foreground"}
              onClick={() => handleNav("docs")}
            >
              Docs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color={currentPage === "usage" ? "secondary" : "foreground"}
              onClick={() => handleNav("usage")}
            >
              Usage
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color={
                currentPage === "installation" ? "secondary" : "foreground"
              }
              onClick={() => handleNav("installation")}
            >
              Installation
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="secondary"> Github </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="w-8/12 flex flex-col items-start justify-start gap-5 mx-auto pt-12 pb-20">
        <h1 className="text-lg font-black">Usage</h1>
        <p>The streaming avatar SDK supports the following behavior:</p>
        <ul>
          <li>
            <div className="flex flex-row gap-2">
              <p className="text-[#3383cc]">Start:</p> Start the streaming
              avatar session
            </div>
          </li>
          <li>
            <div className="flex flex-row gap-2">
              <p className="text-[#3383cc]">Close:</p> Close the streaming
              avatar session
            </div>
          </li>
          <li>
            <div className="flex flex-row gap-2">
              <p className="text-[#3383cc]">Speak:</p> Repeat the input
            </div>
          </li>
        </ul>
        <Demo />
      </div>
    </div>
  );
}
