"use client";
import { useStateStore } from "@/stores/store";
import { DragControls, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ground from "./Ground";
import { Planter } from "./Planter";

const Scene = () => (
  <div className="flex-grow w-4/5 -z-0"><Suspense fallback={
    <div className="w-full h-full bg-gray-300 bg-gradient-to-tl from-[#71a32f] via-green-200 to-transparent "><div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="box box0">
        <div></div>
      </div>
      <div className="box box1">
        <div></div>
      </div>
      <div className="box box2">
        <div></div>
      </div>
      <div className="box box3">
        <div></div>
      </div>
      <div className="box box4">
        <div></div>
      </div>
      <div className="box box5">
        <div></div>
      </div>
      <div className="box box6">
        <div></div>
      </div>
      <div className="box box7">
        <div></div>
      </div>
      <div className="ground">
        <div></div>
      </div>
    </div></div>
  }>
    <Canvas camera={{ position: [100, 10, 0], zoom: 7 }}>
      {/* <Stats /> */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 3} />

      <Plants />
      <Ground />

      <Environment preset="forest" />
    </Canvas>
  </Suspense></div>
);

const Plants = () => {
  const garden = useStateStore();
  let row = 1;
  return (
    <>
      {garden.garden.map((planter, index) => {
        if(index > garden.maxQuantity) return null; 
        const planterIndex = index * 3;
        if (planterIndex >= garden.height * row) {
          row += 1;
        }
        console.log(garden.maxQuantity);
        const xOffset = - row * 4 + garden.width / 2 ;
        let yOffset = planterIndex - row * garden.height;
        yOffset += garden.height / 2;

        return (
          <>{index < garden.maxQuantity && <DragControls axisLock={"y"}>
            <Planter position={[xOffset, 0.6, yOffset]} scale={planter.size * 0.4} color={planter.color} index={index} trolley={planter.trolley} />
          </DragControls>}</>
        );
      })}
    </>
  );
};

export default Scene;
