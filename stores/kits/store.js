import { create } from "zustand";

const initialState = [];
export const useTabStore = create((set) => ({
  activeTab: "",
  setActiveTab: (activeTab) => set(() => ({ activeTab })),
}));
export const useStateStore = create((set) => ({
  garden: initialState,
  addPlanter: (name, color, size, index, trolley) =>
    set((state) => {
      if (state.garden.length > state.maxQuantity) {
        return { garden: state.garden };
      }
      return {
        garden: [...state.garden, { name, color, size, trolley }],
        activeIndex: index,
      };
    }),
  setPlantColor: (color) =>
    set((state) => {
      const updatedPlants = [...state.garden];
      updatedPlants[state.activeIndex] = {
        ...updatedPlants[state.activeIndex],
        color,
      };
      return {
        garden: updatedPlants,
      };
    }),

  setAllTrolleys: (newTrolley) =>
    set((state) => {
      const updatedPlants = state.garden.map((plant) => ({
        ...plant,
        trolley: newTrolley,
      }));
      return {
        garden: updatedPlants,
      };
    }),

  setTrolley: (trolley) =>
    set((state) => {
      const updatedPlants = [...state.garden];
      updatedPlants[state.activeIndex] = {
        ...updatedPlants[state.activeIndex],
        trolley,
      };
      return {
        garden: updatedPlants,
      };
    }),

  setPlantSize: (size) =>
    set((state) => {
      const updatedPlants = [...state.garden];
      updatedPlants[state.activeIndex] = {
        ...updatedPlants[state.activeIndex],
        size: size,
      };
      return {
        garden: updatedPlants,
      };
    }),
  deletePlanter: (name) =>
    set((state) => ({
      garden: state.garden.filter((item, _i) => item.name !== name),
    })),

  activeIndex: undefined, // undefined in the begining
  setActive: (index) => set(() => ({ activeIndex: index })),

  ROWS: 3,
  setROWS: (ROWS) => set(() => ({ ROWS })),
  COLS: 4,
  setCOLS: (COLS) => set(() => ({ COLS })),

  setBase: (base) => set(() => ({ base })),
  base: "stacky",

  setRiserPipe: (riserPipe) => set(() => ({ riserPipe: riserPipe })),
  riserPipe: 0.4,
  maxQuantity : 4,
  setMaxQuantity: (maxQuantity) => set(() => ({maxQuantity})),

  setMidTowerRiser: (midTowerRiser) => set(() => ({ midTowerRiser })),
  midTowerRiser: 0,

  setNutrient: (nutrient) => set(() => ({ nutrient })),
  nutrient: 2,
  stacksPerTower: 4,
  setStacksPerTower: (stacksPerTower) => set(() => ({ stacksPerTower })),

  baseColor: "black",
  setBaseColor: (baseColor) => set(() => ({ baseColor })),
  showDimensions: false,
  setShowDimensions: (showDimensions) => set(() => ({ showDimensions })),

  width: 20,
  setWidth: (width) => set(() => ({ width })),

  height: 20,
  setHeight: (height) => set(() => ({ height })),
}));
