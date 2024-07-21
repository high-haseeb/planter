import { useStateStore } from "@/stores/store";
import vertexPars from "@/components/shaders/vertPars.glsl";
import vertexMain from "@/components/shaders/vertMain.glsl";

import fragmentPars from "@/components/shaders/fragPars.glsl";
import fragmentMain from "@/components/shaders/fragMain.glsl";

import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";

const Ground = (...props) => {
  const { width, height } = useStateStore();
  const depth = 30;
  const materialRef = useRef(null);

  return (
    <group {...props}>
      <RoundedBox args={[width, height, 3]} radius={0.8}  bevelSegments={0} position={[0, -1, 0]} rotation={[Math.PI / 2,0,0]}>
        <meshStandardMaterial color={'#B5EA6A'} />
      </RoundedBox>

      <spotLight color="yellow" position={[0, 10, 0]} intensity={100}/>


      <RoundedBox position={[0, -depth / 2, 0]} args={[width * 1.1,height * 1.1, depth]} radius={2} bevelSegments={0} rotation={[Math.PI / 2,0,0]}>
        <meshStandardMaterial
          transparent
          ref={materialRef}
          onBeforeCompile={(shader) => {
            materialRef.current.userData.shader = shader;

            // injecting vertex and fragment shaders
            const parseVertexString = `#include <displacementmap_pars_vertex>`;
            const mainVertexString = `#include <displacementmap_vertex>`;
            shader.vertexShader = shader.vertexShader.replace(parseVertexString, parseVertexString + vertexPars);
            shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexMain);

            const parseFragmentString = `#include <bumpmap_pars_fragment>`;
            const mainFragmentString = `vec4 diffuseColor = vec4( diffuse, opacity );`;
            shader.fragmentShader = shader.fragmentShader.replace(parseFragmentString, parseFragmentString + fragmentPars);
            shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString, fragmentMain);
          }}
        />
      </RoundedBox>
    </group>
  );
};

export default Ground;
