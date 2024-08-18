"use client";
import { useStateStore } from "@/stores/kits/store";
import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-300 bg-gradient-to-tl from-[#71a32f] via-green-200 to-transparent ">
      <Navbar />
      <Details />
    </main>
  );
};
const Details = () => {
  const state = useStateStore();
  
  return (
    <div className="flex absolute top-1/2 left-1/2 flex-col gap-6 justify-center items-center w-auto -translate-x-1/2 -translate-y-1/2 h-[50vh]">
      <div className="overflow-y-scroll w-full h-full">
        <table className="w-full text-black rounded-3xl">
          <thead className="sticky top-0 bg-green-200">
            <tr className="text-xl font-bold border-b border-black text-left">
              <th className="p-4 w-1/3">Index</th>
              <th className="p-4 w-1/3">Name</th>
              <th className="p-4 w-1/3">Color</th>
              <th className="p-4 w-1/3">Base</th>
            </tr>
          </thead>
          <tbody>
            {state.garden.map((value, index) => (
              <tr key={index} className="text-xl border-b border-black">
                <td className="p-4">{index}</td>
                <td className="p-4">{value.name}</td>
                <td className="p-4 flex gap-6 items-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }} />
                  {value.color}
                </td>
                <td className="p-4 flex-inline whitespace-nowrap">
                  {value.trolley}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="p-4 px-10 text-2xl font-bold text-black bg-green-100 rounded-full hover:scale-110">
        Checkout
      </button>
    </div>
  );
};

export default Page;
