"use client";

import Image from "next/image";
import React from "react";
import icon from "@/public/icon.png";
import Link from "next/link";
import { AlignJustify, ArrowUpRight, CircleX } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <header>
      <div className="flex group gap-2 justify-center items-center mx-auto text-xs sm:text-sm text-center p-1 sm:p-2">
        Subscribe to our Newsletter For New & latest Blogs and Resources
        <ArrowUpRight className="text-primary group-hover:rotate-45 duration-200 " />
      </div>
      <div className="flex bg-background2 border border-border px-5 md:px-12 justify-between items-center p-3 md:p-5">
        <Link href={"/"}>
          <Image className="w-11/12" src={icon} alt="Blog Site" />
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex gap-3 md:gap-6 text-sm md:text-lg">
            <Link href={"/"}>
              <li className="hover:bg-background border-background2 p-2 rounded-lg hover:border-border border">
                Home
              </li>
            </Link>
            <Link href={"/news"}>
              <li className="hover:bg-background border-background2 p-2 rounded-lg hover:border-border border">
                News
              </li>
            </Link>
            <Link
              href={"https://www.linkedin.com/in/mrowaisabdullah/"}
              target="_blank"
            >
              <li className="hover:bg-background border-background2 p-2 rounded-lg hover:border-border border">
                About Us
              </li>
            </Link>
          </ul>
        </nav>
        <Link
          className="hidden md:flex"
          href={"https://www.linkedin.com/in/mrowaisabdullah/"}
          target="_blank"
        >
          <button className="bg-primary hover:bg-background2 hover:border-2 border-border hover:text-primary font-medium text-background px-3 py-2 rounded">
            Contact Me
          </button>
        </Link>
        <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <button onClick={toggleDrawer} className="text-2xl md:hidden">
            <AlignJustify />
          </button>
          <DrawerContent className="bg-background mx-auto max-w-[80%] border-0 text-left px-6 lg:max-w-[35%] md:max-w-[50%]">
            <DrawerClose
              className="mt-5 text-xl place-self-end"
              onClick={closeDrawer}
            >
              <CircleX />
            </DrawerClose>
          <ul className="flex flex-col gap-3 md:gap-6 text-sm md:text-lg">
            <Link href={"/"} onClick={closeDrawer}>
              <li className="hover:bg-background border-background p-2 rounded-lg hover:border-border border">
                Home
              </li>
            </Link>
            <Link href={"/news"} onClick={closeDrawer}>
              <li className="hover:bg-background2 border-background p-2 rounded-lg hover:border-border border">
                News
              </li>
            </Link>
            <Link
              href={"https://www.linkedin.com/in/mrowaisabdullah/"}
              target="_blank"
              onClick={closeDrawer}
            >
              <li className="hover:bg-background2 border-background p-2 rounded-lg hover:border-border border">
                About Us
              </li>
            </Link>
          </ul>
        <Link
          className="flex mt-5"
          href={"https://www.linkedin.com/in/mrowaisabdullah/"}
          target="_blank"
          onClick={closeDrawer}
        >
          <button className="bg-primary hover:bg-background2 hover:border-2 border-border hover:text-primary font-medium text-background px-3 py-2 rounded">
            Contact Me
          </button>
        </Link>

          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
