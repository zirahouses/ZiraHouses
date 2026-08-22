"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Faq_Layout({ faq, lang }: { faq: any[]; lang: string }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [openCategorie, setOpenCategorie] = useState(null);

    const toggleAnswer = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const toggleCategorie = (index: any) => {
        if (openCategorie !== index) {
            setOpenCategorie(index);
            setActiveIndex(null); // Resetar a pergunta ativa ao mudar de categoria
        } else {
            setOpenCategorie(null);
        }
    };

    return (
        <div className="gridLayout grid ">
            <div
                className={`col-start-1 col-span-full lg:col-start-2 lg:col-span-9 flex flex-col bg-white py-[50px] mt-[120px] lg:px-[50px] px-[10px] common-margin overflow-y-hidden`}
            >
                {faq.map((item, faqIndex) => (
                    <div key={faqIndex} className={`flex flex-col gap-y-[50px] relative `} style={{ zIndex: faqIndex }}>
                        <div
                            className={`flex justify-between gap-x-[10px] cursor-pointer ${
                                openCategorie === faqIndex ? "border-0" : "border-b-[1px] border-[#E9E9E9]"
                            }`}
                            onClick={() => toggleCategorie(faqIndex)}
                        >
                            <h2 className="uppercase">{item.title}</h2>
                            <motion.h2
                                initial={{ rotate: 0 }}
                                animate={{
                                    rotate: openCategorie === faqIndex ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {openCategorie === faqIndex ? "−" : "+"}
                            </motion.h2>
                        </div>

                        <motion.div
                            className={`flex flex-col space-y-[30px] ${openCategorie === faqIndex ? "mb-[100px]" : "mb-0"}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: openCategorie === faqIndex ? 1 : 0,
                                height: openCategorie === faqIndex ? "auto" : 0,
                            }}
                        >
                            {item.questions.map((question: any, questionIndex: any) => {
                                const indexKey = `${faqIndex}-${questionIndex}`;
                                return (
                                    <motion.div
                                        initial={{ rowGap: "0px" }}
                                        animate={{
                                            rowGap: activeIndex === indexKey ? "20px" : "0px",
                                        }}
                                        key={indexKey}
                                        className=" border-b-[1px] border-[#E9E9E9] pb-[5px] flex flex-col "
                                    >
                                        <div onClick={() => toggleAnswer(indexKey)} className={`flex gap-x-[10px] justify-between cursor-pointer`}>
                                            <h3>{question.question}</h3>
                                            <motion.h2
                                                initial={{
                                                    rotate: 0,
                                                }}
                                                animate={{
                                                    rotate: activeIndex === indexKey ? 180 : 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                            >
                                                {activeIndex === indexKey ? "−" : "+"}
                                            </motion.h2>
                                        </div>
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            animate={{
                                                opacity: activeIndex === indexKey ? 1 : 0,
                                                height: activeIndex === indexKey ? "auto" : 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            <AnimatePresence>
                                                {activeIndex === indexKey && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        animate={{
                                                            opacity: activeIndex === indexKey ? 1 : 0,
                                                            height: activeIndex === indexKey ? "auto" : 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                    >
                                                        {Array.isArray(question.answer) ? (
                                                            question.answer.map((answer: any, i: number) => (
                                                                <p key={i}>
                                                                    {answer.text.map((segment: string, index: number) => {
                                                                        const hasLineBreaks = segment.includes("\n");
                                                                        const lines = hasLineBreaks ? segment.split("\n") : [segment];
                                                                        return lines.map((line: string, lineIndex: number) => (
                                                                            <React.Fragment key={`${index}-${lineIndex}`}>
                                                                                {line}
                                                                                {/* Adiciona link apenas na primeira linha do segmento */}
                                                                                {lineIndex === 0 &&
                                                                                    answer.urls?.[index] &&
                                                                                    answer.text_links?.[index] && (
                                                                                        <>
                                                                                            {" "}
                                                                                            <a
                                                                                                className="underline bg-black text-white p-[5px]"
                                                                                                href={
                                                                                                    answer.urls[index].startsWith("/")
                                                                                                        ? `/${lang}${answer.urls[index]}`
                                                                                                        : answer.urls[index]
                                                                                                }
                                                                                                rel="noopener noreferrer"
                                                                                                target={
                                                                                                    answer.urls[index].startsWith("/") ? "" : "_blank"
                                                                                                }
                                                                                            >
                                                                                                {answer.text_links[index]}
                                                                                            </a>{" "}
                                                                                        </>
                                                                                    )}
                                                                                {/* Só insere <br /> se havia \n */}
                                                                                {hasLineBreaks && <br />}
                                                                            </React.Fragment>
                                                                        ));
                                                                    })}
                                                                </p>
                                                            ))
                                                        ) : (
                                                            <p>
                                                                {question.answer.split("\n").map((line: string, index: number) => (
                                                                    <React.Fragment key={index}>
                                                                        {line}
                                                                        <br />
                                                                    </React.Fragment>
                                                                ))}
                                                            </p>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
