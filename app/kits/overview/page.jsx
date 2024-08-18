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
      <div className="overflow-x-auto w-full h-auto">
        <table className="w-full text-black rounded-3xl">
          <thead className="sticky top-0 bg-green-200">
            <tr className="text-xl font-bold border-b border-black text-left">
              <th className="p-2 md:p-4 w-1/4">Index</th>
              <th className="p-2 md:p-4 w-1/4">Name</th>
              <th className="p-2 md:p-4 w-1/4">Color</th>
              <th className="p-2 md:p-4 w-1/4">Base</th>
            </tr>
          </thead>
          <tbody>
            {state.garden.map((value, index) => (
              <tr key={index} className="text-lg md:text-xl border-b border-black">
                <td className="p-2 md:p-4">{index}</td>
                <td className="p-2 md:p-4">{value.name}</td>
                <td className="p-2 md:p-4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }} />
                  <span className="hidden md:block">{value.color}</span>
                </td>
                <td className="p-2 md:p-4 whitespace-nowrap">
                  {value.trolley}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-4 p-4 px-6 md:px-10 text-lg md:text-2xl font-bold text-black bg-green-100 rounded-full hover:scale-105 transition-transform">
        Checkout
      </button>
    </div>
  );
};

export default Page;
