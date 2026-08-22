"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import AnimatedHamburgerButton from "@/components/menu";
import { Instagram, Pinterest } from "./socialsLogos";
import Button from "./button";
import SwitchLanguage_Layout from "./switchLanguage";

export default function Navbar_Layout({ navbar, lang, currentLang, button }: { navbar: any[]; lang: any[]; currentLang: string; button: any }) {
    const [isOpen, setIsOpen] = useState(false);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative text-white z-30 flex justify-center">
            <div className="grid grid-cols-11 justify-start  absolute z-30 top-0 w-screen items-center max-w-[2560px] mt-[20px] gap-x-[20px] sm:gap-x-0">
                <div className="col-start-2 col-span-1 lg:flex hidden justify-between items-center ">
                    <Pinterest black={isOpen ? true : false} />
                    <Instagram black={isOpen ? true : false} />
                </div>
                <div className="col-start-3 col-span-7 flex justify-center">
                    <Link prefetch href={`/${currentLang}`}>
                        <img className="w-[300px]" src={isOpen ? "/LogoBlack.png" : "/LogoWhite.png"} alt="Zira Houses" />
                    </Link>
                </div>
                <div className="col-start-10  space-x-[50px]  items-center lg:flex hidden">
                    <SwitchLanguage_Layout lang={lang} />
                </div>
                <div className="lg:col-start-11 col-start-10 flex lg:justify-start">
                    <div>
                        <AnimatedHamburgerButton active={isOpen} setActive={setIsOpen} />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <div className="">
                        <motion.div
                            initial={{ width: 0, backgroundColor: "none" }}
                            animate={{
                                width: "100%",
                                backgroundColor: "rgba(255,255,255,0.9)",
                            }}
                            exit={{ width: 0 }}
                            className="grid gridLayout h-screen fixed top-0 right-0 z-20  pt-[100px]"
                        >
                            <div className="col-start-2 col-span-9 flex flex-col items-center lg:justify-start lg:space-y-[3vw] lg:my-0 my-[20px] justify-between ">
                                <div className="flex space-x-[50px] lg:hidden">
                                    <div className={isOpen ? "text-black" : "text-white"}>
                                        <SwitchLanguage_Layout lang={lang} />
                                    </div>
                                </div>
                                {navbar.map((item: any, i: any) => (
                                    <Link
                                        prefetch
                                        key={i}
                                        href={`/${item.lang_code}${item.path.startsWith("/") ? item.path : "/" + item.path}`}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={handleIsOpen}
                                    >
                                        <h2 className="text-black text-center">{item.title}</h2>
                                        <motion.div
                                            className="h-[2px] bg-black"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: hoveredIndex === i ? "100%" : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                ))}

                                {button}
                                <div className="flex lg:hidden space-x-[50px]">
                                    <Pinterest black />
                                    <Instagram black />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
