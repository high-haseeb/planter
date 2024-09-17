import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

export function Feeder({ full, position, ...props }) {
  const { nodes, materials } = useGLTF('/feeder.glb')
  return (
    <group {...props} dispose={null} position={position}>
      {/* <mesh geometry={nodes.Cube.geometry} material={new MeshStandardMaterial({color: 'black'})} position={[0.177, 0.083, 0.037]} scale={[0.951, 2.113, 1.46]} /> */}
        {full && (
          <>
          <mesh geometry={nodes.Cylinder018.geometry} material={nodes.Cylinder018.material} position={[-0.197, 1.162, 0.483]} scale={[0.234, 0.314, 0.258]} />
          <mesh geometry={nodes.Cylinder021.geometry} material={nodes.Cylinder021.material} position={[-0.197, 1.162, -0.468]} scale={[0.234, 0.314, 0.258]} />
          <mesh geometry={nodes.Cylinder032.geometry} material={nodes.Cylinder032.material} position={[-0.196, -0.087, -0.473]} rotation={[0, 0, -Math.PI]} scale={[0.063, 0.25, 0.094]} />

          <mesh geometry={nodes.Painting_Bucket001.geometry} material={materials['Bucket.001']} position={[-0.033, -1.76, -0.214]} scale={2.824} />
          <mesh geometry={nodes.Painting_Bucket002.geometry} material={materials['Bucket.001']} position={[-0.033, -1.76, 0.757]} scale={2.824} />

          <mesh geometry={nodes.Cylinder035.geometry} material={nodes.Cylinder035.material} position={[-0.196, -0.087, 0.487]} rotation={[0, 0, -Math.PI]} scale={[0.063, 0.25, 0.094]} />
          <mesh geometry={nodes.Cylinder025.geometry} material={nodes.Cylinder025.material} position={[-0.2, 0.721, -0.472]} scale={[0.07, 0.121, 0.07]} />
          <mesh geometry={nodes.Cylinder024.geometry} material={nodes.Cylinder024.material} position={[-0.2, 0.721, 0.493]} scale={[0.07, 0.121, 0.07]} />
          </>
      )}
      {/* <mesh geometry={nodes.Cylinder019.geometry} material={nodes.Cylinder019.material} position={[-0.19, 1.006, 0.761]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} /> */}
      {/* <mesh geometry={nodes.Cylinder020.geometry} material={nodes.Cylinder020.material} position={[-0.19, 1.006, 0.211]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} /> */}
      {/* <mesh geometry={nodes.Cylinder022.geometry} material={nodes.Cylinder022.material} position={[-0.19, 1.006, -0.19]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.033]} /> */}
      {/**/}
      {/* <mesh geometry={nodes.Cylinder026.geometry} material={nodes.Cylinder026.material} position={[-0.187, 1.006, 0.017]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.033, 0.13, 0.049]} /> */}
      {/* <mesh geometry={nodes.NurbsPath001.geometry} material={nodes.NurbsPath001.material} position={[1.776, 0.987, 0.842]} /> */}
      {/* <mesh geometry={nodes.NurbsPath.geometry} material={nodes.NurbsPath.material} position={[-0.192, 0.998, -0.87]} /> */}
      {/* <mesh geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[0.049, 0.326, 1.104]} rotation={[-Math.PI, 0, -Math.PI / 2]} scale={[-0.155, -0.045, -0.155]} /> */}
      {/* <mesh geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} position={[-0.19, 1.007, -0.534]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.05, 0.24, 0.037]} /> */}
      {/* <mesh geometry={nodes.Cylinder002.geometry} material={nodes.Cylinder002.material} position={[-0.19, 1.007, 0.497]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.05, 0.158, 0.037]} /> */}
    </group>
  )
}

useGLTF.preload('/feeder.glb')
