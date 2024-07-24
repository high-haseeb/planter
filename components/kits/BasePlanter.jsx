import React, { useMemo } from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { DoubleSide, MeshStandardMaterial } from "three";

const context = React.createContext();

export function StackyInstances({ children, ...props }) {
  const { nodes } = useGLTF("/planter-transformed.glb");
  const instances = React.useMemo(
    () => ({
      Plane: nodes.Plane038,
      Plane1: nodes.Plane038_1,
      Base: nodes.Circle033,
    }),
    [nodes],
  );
  return (
    <Merged meshes={instances} {...props} >
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function Stacky({ color = "pink",  ...props }) {
  const instances = React.useContext(context);
  const { nodes } = useGLTF("/planter-transformed.glb");
  const material = useMemo(() => new MeshStandardMaterial({color, side: DoubleSide, roughness: 0.7, metalness: 0.1}))

  return (
    <group {...props} dispose={null} >
      <group scale={14.407} >
        <instances.Plane />
        <instances.Plane1 />
        <mesh material={material} geometry={nodes.Circle033.geometry}></mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/planter-transformed.glb");
