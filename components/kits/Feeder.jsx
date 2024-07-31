import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Feeder({ full, position, ...props }) {
  const { nodes, materials } = useGLTF('/models/feeder.glb')
  return (
    <group {...props} dispose={null} position={position}>
      <group position={[-0, 0, 0]} rotation={[0, 0, 0]}>
        <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[-16.731, 2.945, 0.037]} scale={[0.951, 2.113, 1.46]} />
        <mesh geometry={nodes.Cylinder022.geometry} material={nodes.Cylinder022.material} position={[-17.098, 3.868, -0.19]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} />
        <mesh geometry={nodes.Cylinder020.geometry} material={nodes.Cylinder020.material} position={[-17.098, 3.868, 0.211]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} />
        <mesh geometry={nodes.Cylinder026.geometry} material={nodes.Cylinder026.material} position={[-17.096, 3.868, 0.017]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.049]} />
        <mesh geometry={nodes.Cylinder019.geometry} material={nodes.Cylinder019.material} position={[-17.098, 3.868, 0.761]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} />
        {full && (
          <>
            <mesh geometry={nodes.Cylinder018.geometry} material={nodes.Cylinder018.material} position={[-17.106, 4.025, 0.483]} scale={[0.234, 0.314, 0.258]} />
            <mesh geometry={nodes.Cylinder021.geometry} material={nodes.Cylinder021.material} position={[-17.106, 4.025, -0.468]} scale={[0.234, 0.314, 0.258]} />
            <mesh geometry={nodes.Cylinder032.geometry} material={nodes.Cylinder032.material} position={[-17.105, 2.775, -0.473]} rotation={[0, 0, -Math.PI]} scale={[0.063, 0.25, 0.094]} />
            <mesh geometry={nodes.Cylinder035.geometry} material={nodes.Cylinder035.material} position={[-17.105, 2.775, 0.487]} rotation={[0, 0, -Math.PI]} scale={[0.063, 0.25, 0.094]} />
            <mesh geometry={nodes.Painting_Bucket001.geometry} material={materials['Bucket.001']} position={[-16.941, 1.102, -0.214]} scale={2.824} />
            <mesh geometry={nodes.Cylinder024.geometry} material={nodes.Cylinder024.material} position={[-17.109, 3.583, 0.493]} scale={[0.07, 0.121, 0.07]} />
            <mesh geometry={nodes.Cylinder025.geometry} material={nodes.Cylinder025.material} position={[-17.109, 3.583, -0.472]} scale={[0.07, 0.121, 0.07]} />
            <mesh geometry={nodes.Painting_Bucket002.geometry} material={materials['Bucket.001']} position={[-16.941, 1.102, 0.757]} scale={2.824} />
          </>
        )}
        <mesh geometry={nodes.NurbsPath001.geometry} material={nodes.NurbsPath001.material} position={[-15.133, 3.849, 0.842]} />
        <mesh geometry={nodes.NurbsPath.geometry} material={nodes.NurbsPath.material} position={[-17.101, 3.86, -0.87]} />
        <mesh geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[-16.86, 3.188, 1.104]} rotation={[-Math.PI, 0, -Math.PI / 2]} scale={[-0.155, -0.045, -0.155]} />
      </group></group>
  )
}

useGLTF.preload('/models/feeder.glb')
