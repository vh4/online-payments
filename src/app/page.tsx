"use client";

import { useState } from "react";
import Sidebar from "./components/desktop/Sidebar";
import Carousel from "./components/carousels/Carousel";
import { UserOutlined } from "@ant-design/icons";
import Header from './components/desktop/Header'
import PLN from './components/PLN/PlnTagihan'

export default function Home() {
  const [nameMenu, setNameMenu] = useState<string>("pln"); // State for selected menu

  return (
    <div className="w-full">
      <div
        style={{
          // backgroundColor: customLayout?.color?.secondary?.background || '#0f172a',
          // backgroundColor: "#2563eb",
        }}
        className="rounded-b-[40px] pb-12 xl:pb-20 xl:mb-0 xl:rounded-b-[120px]"
      >
        {/* Header */}
        <div>
          <Header />
        </div>

        {/* Carousel */}
        {/* <div
          className={`hidden 2xl:block py-4 md:py-8 relative z-10 container mx-auto `}
        >
          <div className="mx-0 lg:mx-12 xl:mx-0 2xl:mx-0">
            <Carousel />
          </div>
        </div> */}
      </div>      
      {/* Menu Sidebar... */}
      <div className="xl:-mt-16">
          <div className="relative container mx-auto mb-6">
            <div className="-mt-4 md:mt-0 z-10 xl:bg-white mx-0 lg:mx-12 xl:mx-32 2xl:mx-36">
              <div className={`block md:flex xl:flex 2xl:flex justify-start`}>
                <div className="hidden md:flex justify-start px-10">
                  <Sidebar nameMenu={nameMenu} setNameMenu={setNameMenu} />
                </div>
              </div>
              <div className="block mt-2 pb-12 px-4">
                <div className="w-full">
                  {/* menu fitur  */}
                  {nameMenu == "pln" ? (
                    <><div><PLN /></div></>
                  ) : nameMenu == "pdam" ? (
                    <><div>pdam</div></>
                  ) : nameMenu == "multifinance" ? (
                    <><div>multifinance</div></>
                  )  : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}
