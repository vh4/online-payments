"use client";

import { useState } from "react";
import Sidebar from "./components/desktop/SidebarComponent";
import Carousel from "./components/carousels/CarouselComponent";
import PLN from './components/categories/pln/plnComponent'

export default function Home() {
  const [nameMenu, setNameMenu] = useState<string>("pln"); // State for selected menu

  return (
    <div className="w-full">
      <div
        style={{
          // backgroundColor: customLayout?.color?.secondary?.background || '#0f172a',
          backgroundColor: "#14b8a6",
          color:"#ffff"
        }}
        className="pb-12 xl:pb-20"
      >
        {/* Carousel */}
        <div
          className={`hidden 2xl:block py-4 relative z-10 container mx-auto `}
        >
          <div className="mx-0 lg:mx-12 xl:mx-0 2xl:mx-0">
            <Carousel />
          </div>
        </div>
      </div>      
      {/* Menu Sidebar... */}
      <div className="xl:-mt-12">
          <div className="relative container mx-auto mb-6">
            <div className="md:mt-0 z-10">
              <div className="">
                <div className="relative container mx-auto mb-6">
                  <div className="md:mt-0 z-10 xl:bg-white mx-0 lg:mx-12 xl:mx-32 2xl:mx-36 md:border shadow">
                    <div className={`block md:flex xl:flex 2xl:flex justify-start`}>
                      <div className="hidden md:flex justify-start px-10 py-4">
                        <Sidebar nameMenu={nameMenu} setNameMenu={setNameMenu} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container max-w-screen-2xl mx-auto px-24">
                {/* Menu Content */}
                {nameMenu === "pln" ? (
                  <PLN />
                ) : nameMenu === "pdam" ? (
                  <div>pdam</div>
                ) : nameMenu === "multifinance" ? (
                  <div>multifinance</div>
                ) : (
                  <div>No menu selected</div>
                )}
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}
