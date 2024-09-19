import * as React from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "./OrbitControls";

extend({ OrbitControls });

// @ts-ignore
declare global {
  namespace JSX {
    interface IntrinsicElements {
    // @ts-ignore
      orbitControls: Partial<OrbitControls> & {
    // @ts-ignore
        ref?: React.Ref<OrbitControls>;
    // @ts-ignore
        args: [THREE.Camera, HTMLElement?];
      };
    }
  }
}

export const Controls = () => {
  const { camera, gl } = useThree();
    // @ts-ignore
  const ref: React.Ref<OrbitControls> = React.useRef(null);
  useFrame(() => ref.current.update());
  return (
    // @ts-ignore
    <orbitControls
      {...{
        ref,
        args: [camera, gl.domElement],
        enableDamping: true,
        zoomToCursor: true
      }}
    />
  );
};
