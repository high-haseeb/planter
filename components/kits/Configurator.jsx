'use client';
import { useStateStore, useTabStore } from "@/stores/kits/store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Configurator = () => {
    // const activeIndex = useStateStore((state) => state.activeIndex);
    return (
        <><Dimension />
            <div className="no-scrollbar flex absolute lg:right-20 lg:top-40 lg:bottom-auto lg:left-auto left-1/2 bottom-6 lg:translate-x-0 p-6 lg:m-0 -translate-x-1/2 z-10 flex-col  justify-between lg:w-1/5 w-full rounded-3xl lg:max-h-[85vh] lg:h-auto h-[40vh]">
                <div className="w-full h-auto bg-brGreen rounded-t-3xl text-white flex items-center justify-center p-2 lg:p-3 text-sm lg:text-lg font-bold"> Garden </div>
                <div className="overflow-y-scroll no-scrollbar relative">
                    {/* <Title /> */}
                    <Size />
                    <Quantity />
                    <Stacks />
                    <Color />
                    <BaseColor />
                    <MidTowerRiser />
                    <RiserPipe />
                    <Nutrients />
                    <Base />
                    <IndvidualBase />
                </div>


                <div className="w-full h-8 lg:h-auto bg-brGreen rounded-b-3xl text-white flex items-center justify-center p-4 text-sm g:text-lg">
                    <Overview />
                </div>

            </div></>
    );
};
const Overview = () => {
    return (
        <Link href="/kits/overview" className="py-1 lg:py-2 px-8 text-sm lg:text-base font-bold rounded-full lg:border-2 border-white hover:bg-black/10 transition-colors">
            See Overview
        </Link>
    );
};
const Stacks = () => {
    const { stacksPerTower, setStacksPerTower } = useStateStore();
    const [selectedOption, setSelectedOption] = useState(stacksPerTower);
    const quantities = [];
    for (let i = 4; i <= 10; i += 1) {
        quantities.push(i);
    }

    return (
        <Section title={"Stacks Per Tower"}>
            <div className="flex flex-col gap-2 lg:mt-4 mt-0 text-gray-500">
                Choose an option
                <div className="grid grid-cols-6 justify-items-center cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value ? "bg-brGreen text-white" : "text-gray-700"} rounded-full px-3 py-1 text-xs font-semibold  mr-2 `}
                                onClick={() => {
                                    setSelectedOption(value);
                                    setStacksPerTower(value);
                                }}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
const Quantity = () => {
    const { setMaxQuantity, addPlanter, garden, ROWS, COLS } = useStateStore();
    const [selectedOption, setSelectedOption] = useState(0);
    const quantities = [];
    for (let index = 2; index <= ROWS * COLS; index += 2) {
        quantities.push(index);
    }

    return (
        <Section title={"number of Quantity of planter"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500 text-sm">
                Choose an option
                <div className="grid grid-cols-6 justify-items-center cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value ? "bg-brGreen text-white" : "text-gray-700"} rounded-full px-3 py-1 text-xs font-semibold  mr-2`}
                                onClick={() => {
                                    setSelectedOption(value);
                                    setMaxQuantity(value);
                                    for (let index = garden.length; index <= value; index++) {
                                        addPlanter(`planter${index}`, "#D35832", 1, index, "stacky");
                                    }
                                }}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
const Nutrients = () => {
    const setNutrient = useStateStore((state) => state.setNutrient);
    const [selectedOption, setSelectedOption] = useState("hydroponic");

    const quantities = [
        { title: "Hydroponic (2 x Fertilizer Injectors + nutrient buckets under each + a tap timer)", value: "hydroponic" },
        { title: "Organic (tap timer only + fertilizer pellets added to planters)", value: "organic" },
    ];
    return (
        <Section title={"Nutrients Options"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500">
                <div className="cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value.title ? "text-brGreen" : "text-gray-700"} rounded-full  py-1  `}
                                onClick={() => {
                                    setSelectedOption(value.title);
                                    setNutrient(value.value);
                                }}
                            >
                                {value.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
const MidTowerRiser = () => {
    const setMidTowerRiser = useStateStore((state) => state.setMidTowerRiser);
    const [selectedOption, setSelectedOption] = useState(1);

    const quantities = [
        { title: "no mid tower riser", value: 0 },
        { title: "1 mid tower riser", value: 1 },
        { title: "2 mid tower risers", value: 2 },
    ];
    return (
        <Section title={"Mid tower risers"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500">
                <div className="cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value.title ? "text-brGreen" : "text-gray-700"} rounded-full  py-1  `}
                                onClick={() => {
                                    setSelectedOption(value.title);
                                    setMidTowerRiser(value.value);
                                }}
                            >
                                {value.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
const RiserPipe = () => {
    const setRiserPipe = useStateStore((state) => state.setRiserPipe);
    const [selectedOption, setSelectedOption] = useState("400 mm");

    const quantities = [
        { title: "400 mm ", value: 0.4 },
        { title: "600 mm", value: 0.6 },
        { title: "800 mm", value: 0.8 },
    ];
    return (
        <Section title={"Riser Pipe Length"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500">
                <div className="cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value.title ? "text-brGreen" : "text-gray-700"} rounded-full  py-1  `}
                                onClick={() => {
                                    setSelectedOption(value.title);
                                    setRiserPipe(value.value);
                                }}
                            >
                                {value.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

const Base = () => {
    const setAllTrolleys = useStateStore((state) => state.setAllTrolleys);
    const [selectedOption, setSelectedOption] = useState("stacky");

    const quantities = [
        { title: "40L Grow Bag", value: "bag" },
        { title: "15L Stacky Planter", value: "stacky" },
    ];
    return (
        <Section title={"Base"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500">
                <div className="cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value.title ? "text-brGreen" : "text-gray-700"} rounded-full  py-1  `}
                                onClick={() => {
                                    setSelectedOption(value.title);
                                    setAllTrolleys(value.value);
                                }}
                            >
                                {value.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
const IndvidualBase = () => {
    const { setTrolley } = useStateStore();
    const [selectedOption, setSelectedOption] = useState("stacky");

    const quantities = [
        { title: "stacky", value: "stacky" },
        { title: "bag", value: "bag" },
    ];
    return (
        <Section title={"Individual Planter Base"}>
            <div className="flex flex-col gap-2 mt-4 text-gray-500">
                <div className="cursor-pointer">
                    {quantities.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={`${selectedOption === value.title ? "text-brGreen" : "text-gray-700"} rounded-full  py-1  `}
                                onClick={() => {
                                    setSelectedOption(value.title);
                                    setTrolley(value.value);
                                }}
                            >
                                {value.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

const BaseColor = () => {
    const { setBaseColor } = useStateStore();
    const [selected, setSelected] = useState("black");
    const colors = [
        { name: "black", hex: "#000" },
        { name: "Terracotta", hex: "#D35832" },
        { name: "Stone", hex: "#A8A5A1" },
    ];
    const colorEl = useRef(null);
    return (
        <Section title={"base color"}>
            <div className="flex gap-8 mt-4">
                {colors.map((color, index) => {
                    return (
                        <div
                            className="flex flex-col gap-2 justify-center items-center"
                            key={index}
                            onClick={() => {
                                setBaseColor(color.hex);
                                setSelected(color.name);
                            }}
                        >
                            <div
                                className={`w-12 h-12 rounded-full ${selected === color.name ? "border-4 border-white" : ""}`}
                                key={index}
                                style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-gray-500 capitalize">{color.name}</p>
                        </div>
                    );
                })}

                <div
                    className="flex flex-col gap-2 justify-center items-center"
                    onClick={() => {
                        colorEl.current.click();
                    }}
                >
                    <input
                        type="color"
                        hidden
                        ref={colorEl}
                        onChange={(value) => {
                            setPlantColor(value.target.value);
                            setSelected(null);
                        }}
                    />
                    <Image src={"/icons/add.svg"} width={30} height={30} alt="add" className="w-12 h-12 rounded-full cursor-pointer" />

                    <p className="text-gray-500 capitalize">other</p>
                </div>
            </div>
        </Section>
    );
};
const Color = () => {
    const { setPlantColor } = useStateStore();
    const [selected, setSelected] = useState("black");
    const colors = [
        { name: "black", hex: "#000" },
        { name: "Terracotta", hex: "#D35832" },
        { name: "Stone", hex: "#A8A5A1" },
    ];
    const colorEl = useRef(null);
    return (
        <Section title={"planter color"}>
            <div className="flex gap-8 mt-4">
                {colors.map((color, index) => {
                    return (
                        <div
                            className="flex flex-col gap-2 justify-center items-center"
                            key={index}
                            onClick={() => {
                                setPlantColor(color.hex);
                                setSelected(color.name);
                            }}
                        >
                            <div
                                className={`w-12 h-12 rounded-full ${selected === color.name ? "border-4 border-white" : ""}`}
                                key={index}
                                style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-gray-500 capitalize">{color.name}</p>
                        </div>
                    );
                })}

                <div
                    className="flex flex-col gap-2 justify-center items-center"
                    onClick={() => {
                        colorEl.current.click();
                    }}
                >
                    <input
                        type="color"
                        hidden
                        ref={colorEl}
                        onChange={(value) => {
                            setPlantColor(value.target.value);
                            setSelected(null);
                        }}
                    />
                    <Image src={"/icons/add.svg"} width={30} height={30} alt="add" className="w-12 h-12 rounded-full cursor-pointer" />

                    <p className="text-gray-500 capitalize">other</p>
                </div>
            </div>
        </Section>
    );
};

const Size = () => {
    const setGardenWidth = useStateStore((state) => state.setWidth);
    const setGardenHeight = useStateStore((state) => state.setHeight);
    const setROWS = useStateStore((state) => state.setROWS);
    const setCOLS = useStateStore((state) => state.setCOLS);
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(20);

    let rows = 0;
    let cols = 0;
    const handleWidthChange = (value) => {
        setWidth(value.target.value);
        setGardenWidth(value.target.value);
        if (value.target.value <= 10) {
            rows = 1;
        } else if (value.target.value > 10 && value.target.value <= 15) {
            rows = 2;
        } else if (value.target.value > 15) {
            rows = 3;
        }
        setROWS(rows);
    };
    const handleHeightChange = (value) => {
        setHeight(value.target.value);
        setGardenHeight(value.target.value);

        if (value.target.value <= 10) {
            cols = 1;
        } else if (value.target.value > 10 && value.target.value <= 15) {
            cols = 2;
        } else if (value.target.value > 15 && value.target.value <= 20) {
            cols = 3;
        } else if (value.target.value > 20 && value.target.value <= 25) {
            cols = 4;
        } else if (value.target.value > 25 && value.target.value <= 30) {
            cols = 5;
        } else if (value.target.value > 30 && value.target.value <= 35) {
            cols = 6;
        } else if (value.target.value > 35 && value.target.value <= 40) {
            cols = 7;
        } else if (value.target.value > 40 && value.target.value <= 45) {
            cols = 8;
        } else if (value.target.value > 45 && value.target.value < 50) {
            cols = 9;
        } else if (value.target.value >= 50 && value.target.value <= 55) {
            cols = 10;
        } else {
            cols = 10;
        }
        setCOLS(cols);
    };
    return (
        <Section title={"garden size"}>
            <div className="flex gap-2 my-2 text-gray-500 text-xs lg:text-sm">
                <div className="flex flex-col gap-4">
                    <p className="">Height</p>
                    <input type="range" min="10" max="55" value={height} step="1" onChange={handleHeightChange} id="height" className="slider" />
                    <div className="flex">
                        <div className="w-1/4 border-b-2 border-gray-300">
                            <input type="number" value={height} min="5" max="50" onChange={handleHeightChange} className="bg-gray-100" />
                        </div>
                        <p className="text-gray-400">Feet</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="">Width</p>
                    <input type="range" min="5" max="20" value={width} step="1" onChange={handleWidthChange} id="width" className="slider" />
                    <div className="flex">
                        <div className="w-1/4 border-b-2 border-gray-300">
                            <input type="number" value={width} min="5" max="20" onChange={handleWidthChange} className="bg-gray-100" />
                        </div>
                        <p className="text-gray-400">Feet</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const Dimension = () => {
    const setShowDimensions = useStateStore((state) => state.setShowDimensions);
    const [clicked, setClicked] = useState(true);
    return (
        <button
            className={`lg:p-4 p-1 rounded-full ${clicked ? "bg-black/50" : "bg-green-700"} fixed lg:top-[85%] lg:left-12 top-12 left-12 pointer-events-auto cursor-pointer z-50 lg:w-20 w-6  lg:h-20 h-6`}
            onClick={() => {
                setClicked((state) => !state);
                setShowDimensions(clicked);
            }}
        >
            <Image src={"/icons/length.svg"} width={50} height={50} alt="length" className="object-cover" />
        </button>
    );
};
const Section = ({ children, title }) => {
    const { activeTab, setActiveTab } = useTabStore();
    const [closed, setClosed] = useState(activeTab !== title);
    useEffect(() => {
        setClosed(activeTab !== title);
    }, [activeTab]);
    return (
        <div
            className={`w-full min-h-[5%] lg:min-h-[10%] flex flex-col border-b-2 border-y-gray-300 py-1 lg:py-2 ${closed ? "bg-white" : "bg-gray-100"} transition-colors lg:p-4 p-2 text-sm`}
        >
            <button
                className="flex justify-between items-center"
                onClick={() => {
                    setClosed((state) => !state);
                    setActiveTab(title);
                }}
            >
                <div className="text-xs lg:text-base text-gray-600 capitalize">{title}</div>
                <Image
                    src={"/icons/expand.svg"}
                    width={30}
                    height={30}
                    alt="expand"
                    className={` transition-transform ${closed ? "-rotate-90" : ""} w-4 lg:w-auto`}
                />
            </button>
            <div className={`${closed ? "max-h-0" : "max-h-50"} transition-all overflow-hidden`}>{children}</div>
        </div>
    );
};

export default Configurator;
