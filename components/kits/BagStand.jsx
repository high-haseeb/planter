import React from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { useStateStore } from "@/stores/kits/store";

const context = React.createContext();

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF("/models/bag-stand-transformed.glb");
  const instances = React.useMemo(
    () => ({
      // Cylinder: nodes.Cylinder006,
      Cylinder2: nodes.Cylinder003,
      Circle: nodes.Circle,
    }),
    [nodes],
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function Model(props) {
  const instances = React.useContext(context);
  return (
    <group {...props} dispose={null}>
          <instances.Cylinder2 scale={[1, 1, 1]} />
          <instances.Circle position={[2, 0.737, 1.359]} scale={0.398} />
    </group>
  );
}

useGLTF.preload("/models/bag-stand-transformed.glb");
