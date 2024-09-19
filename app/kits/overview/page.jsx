"use client";
import { useStateStore } from "@/stores/kits/store";
import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-300 bg-gradient-to-tl from-[#71a32f] via-green-200 to-transparent">
      <Navbar />
      <Details />
    </main>
  );
};

const Details = () => {
  const state = useStateStore();

  return (
    <div className="relative flex flex-col gap-6 justify-center items-center w-full px-4 py-6 h-auto max-w-screen-lg mx-auto overflow-y-scroll">
      <div className="overflow-x-scroll w-full h-auto">
        <table className="w-full text-black rounded-3xl">
          <thead className="sticky top-0 bg-green-200">
            <tr className="text-xs lg:text-base font-bold border-b border-black text-left">
              <th className="p-2 md:p-4 w-auto">#</th>
              <th className="p-2 md:p-4 w-auto">Name</th>
              <th className="p-2 md:p-4 w-auto">Planter Color</th>
              <th className="p-2 md:p-4 w-auto">Base</th>
              <th className="p-2 md:p-4 w-auto">Base Color</th>
              <th className="p-2 md:p-4 w-auto">Stacks</th>
              <th className="p-2 md:p-4 w-auto">Mid tower risers</th>
              <th className="p-2 md:p-4 w-auto">Riser pipe length</th>
            </tr>
          </thead>
          <tbody>
            {state.garden.map((value, index) => {
              return (
                <>{index > 0 &&
                  (
                    <tr key={index} className="text-xs md:text-base border-b border-black text-center">
                      <td className="p-2 md:p-4 text-left">{index}</td>
                      <td className="p-2 md:p-4 text-left">{value.name}</td>
                      <td className="p-2 md:p-4 flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }} />
                        <div className="hidden md:block">{value.color}</div>
                      </td>

                      <td className="p-2 md:p-4 whitespace-nowrap text-left"> {value.trolley} </td>
                      <td className="p-2 md:p-4 flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: state.baseColor }} />
                        <div className="hidden md:block">{state.baseColor}</div>
                      </td>
                      <td className="p-2 md:p-4">{state.stacksPerTower}</td>
                      <td className="p-2 md:p-4">{state.midTowerRiser}</td>
                      <td className="p-2 md:p-4">{`${state.riserPipe * 1000}mm`}</td>
                    </tr>)
                }</>)
            })}
          </tbody>
        </table>
        <div className="">
          <td className="p-2 md:p-4">Neutrient Option: </td>
          <td className="p-2 md:p-4">{state.nutrient === "hydroponic" ? "Hydroponic (2 x Fertilizer Injectors + nutrient buckets under each + a tap timer)" : "Organic (tap timer only + fertilizer pellets added to planters)"}</td>
        </div>
      </div>
      <button className="mt-4 p-4 px-6 md:px-10 text-lg md:text-2xl font-bold text-black bg-green-100 rounded-full hover:scale-105 transition-transform">
        Checkout
      </button>
    </div>
  );
};

export default Page;
