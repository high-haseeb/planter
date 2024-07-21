import React from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = React.createContext()

export function StackyInstances({ children, ...props }) {
  const { nodes } = useGLTF('/planter-transformed.glb')
  const instances = React.useMemo(
    () => ({
      Plane: nodes.Plane038,
      Plane1: nodes.Plane038_1,
      Circle: nodes.Circle033,
    }),
    [nodes],
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Stacky(props) {
  const instances = React.useContext(context)
  return (
    <group {...props} dispose={null}>
      <group scale={14.407}>
        <instances.Plane />
        <instances.Plane1 />
      </group>
      <instances.Circle scale={14.407} />
    </group>
  )
}

useGLTF.preload('/planter-transformed.glb')
