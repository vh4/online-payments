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
          // backgroundColor: "#14b8a6",
          // color: "#ffff",
        }}
        className="mt-12 mb-4 md:mb-20"
      >
        {/* Carousel Wrapper */}
        <div className="relative z-10 px-0">
          <Carousel />
        </div>
      </div>
          
      {/* Menu Sidebar... */}
      <div className="w-full xl:-mt-12">
          <div className="mx-auto mb-6">
            <div className="md:mt-0 z-10">
                <div className="relative container mx-auto mb-6">
                  <div className="md:mt-0 z-10 mx-0 md:border-t">
                    <div className={`block md:flex xl:flex 2xl:flex justify-center`}>
                      <div className="flex md:px-10 py-4">
                        <Sidebar nameMenu={nameMenu} setNameMenu={setNameMenu} />
                      </div>
                    </div>
                  </div>
              </div>
                <div className="w-full">
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
