"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Instagram, Pinterest } from "./socialsLogos";

export default function Footer_Layout({ footer, currentLang }: { footer: any[]; currentLang: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="bg-black flex justify-center">
            <div className="">
                <div className="w-screen grid grid-cols-11 py-[50px] max-w-[2560px]">
                    <div className="col-start-2 col-span-9 flex lg:flex-row flex-col lg:space-y-0 space-y-[50px] items-center justify-between ">
                        <Link prefetch href={`/${currentLang}`}>
                            <img className="w-[300px]" src="/LogoWhite.png" />
                        </Link>
                        {footer.map((item, i) => {
                            const isExternal = item.path.startsWith("http");

                            const href = isExternal ? item.path : `/${item.lang_code}${item.path.startsWith("/") ? item.path : "/" + item.path}`;

                            return (
                                <div key={i}>
                                    <Link
                                        prefetch={!isExternal}
                                        href={href}
                                        target={isExternal ? "_blank" : "_self"}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className="flex flex-col">
                                            <p className="text-white">{item.title}</p>
                                        </div>
                                        <motion.div
                                            className="h-[1px] bg-white"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: hoveredIndex === i ? "100%" : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                        <div className="flex space-x-[50px]">
                            <Pinterest />
                            <Instagram />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
