import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useStateStore } from "@/stores/kits/store";

export function Planter({ index, color, trolley, ...props }) {
  const { nodes, materials } = useGLTF("/planter.glb");
  const stacksPerTower = useStateStore(state => state.stacksPerTower);
  const base = new THREE.InstancedMesh(nodes.Circle033.geometry, new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide }), stacksPerTower);
  const leafs = new THREE.InstancedMesh(nodes.Plane038.geometry, materials["Material.003"], stacksPerTower);
  const soil = new THREE.InstancedMesh(nodes.Plane038_1.geometry, materials["Material.002"], stacksPerTower);
  const planter = new THREE.Group();

  for (let index = 0; index < stacksPerTower; index++) {
    nodes.Circle033.position.set(0, index * 1.99 + 1, 0);
    nodes.Circle033.rotation.set(0, index % 2 === 0 ? Math.PI / 4 : 0, 0);
    nodes.Circle033.updateMatrix();
    base.setMatrixAt(index, nodes.Circle033.matrix);
  }
  planter.add(base);
  for (let index = 0; index < stacksPerTower; index++) {
    nodes.Plane038.position.set(0, index * 1.99 + 1, 0);
    nodes.Plane038.rotation.set(0, index % 2 === 0 ? Math.PI / 4 : 0, 0);
    nodes.Plane038.scale.set(14.407, 14.407, 14.407);
    nodes.Plane038.updateMatrix();
    leafs.setMatrixAt(index, nodes.Plane038.matrix);
  }
  planter.add(leafs);

  for (let index = 0; index < stacksPerTower; index++) {
    nodes.Plane038_1.position.set(0, index * 1.99 + 1, 0);
    nodes.Plane038_1.rotation.set(0, index % 2 === 0 ? Math.PI / 4 : 0, 0);
    nodes.Plane038_1.updateMatrix();
    nodes.Plane038_1.scale.set(14.407, 14.407, 14.407);
    soil.setMatrixAt(index, nodes.Plane038_1.matrix);
  }

  planter.add(soil);

  const { setActive } = useStateStore();
  return (
    <group {...props} onClick={() => setActive(index)}>
      <primitive object={planter}></primitive>
    </group>
  );
}

export function SinglePlanter({ color, ...props }) {
  const { nodes, materials } = useGLTF("/planter.glb");
  return (
    <group {...props} dispose={null} scale={14.407}>
      <group>
        <mesh geometry={nodes.Plane038.geometry} material={materials["Material.003"]} />
        <mesh geometry={nodes.Plane038_1.geometry} material={materials["Material.002"]} />
      </group>
      {/* vase */}
      <mesh geometry={nodes.Circle033.geometry}>
        <meshStandardMaterial side={THREE.DoubleSide} color={color} roughness={0.7} metalness={0.1} attach={"material"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/planter.glb");
