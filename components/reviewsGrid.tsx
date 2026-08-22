"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getReviewsLabels, ReviewsLabels } from "@/app/utils/reviewsLabels";

type Review = { name: string; comment: string; date: string };

const PREVIEW_COUNT = 8;

export default function ReviewsGrid({ reviews, lang, modalTitle }: { reviews: Review[]; lang: string; modalTitle: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const labels = getReviewsLabels(lang);
    const preview = reviews.slice(0, PREVIEW_COUNT);

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                {preview.map((review, i) => (
                    <ReviewCard key={i} review={review} clamp labels={labels} onExpand={() => setIsOpen(true)} />
                ))}
            </div>

            {reviews.length > preview.length && (
                <div className="flex justify-center mt-[50px]">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-black text-white uppercase text-sm px-[24px] py-[12px] duration-300 hover:scale-105"
                    >
                        {labels.showMore}
                    </button>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-[10px] md:p-[40px]"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-[800px] max-h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-[20px] border-b-[1px] border-[#E9E9E9]">
                                <h2>{modalTitle}</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label={labels.close}
                                    className="text-3xl leading-none px-[10px] duration-300 hover:scale-110"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="overflow-y-auto p-[20px] flex flex-col">
                                {reviews.map((review, i) => (
                                    <ReviewRow key={i} review={review} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function ReviewCard({ review, clamp, labels, onExpand }: { review: Review; clamp?: boolean; labels?: ReviewsLabels; onExpand?: () => void }) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (!clamp) return;

        const checkTruncation = () => {
            const el = textRef.current;
            if (el) setIsTruncated(el.scrollHeight > el.clientHeight + 1);
        };

        checkTruncation();
        window.addEventListener("resize", checkTruncation);
        return () => window.removeEventListener("resize", checkTruncation);
    }, [clamp, review.comment]);

    return (
        <div className={`h-full flex flex-col gap-y-[10px] p-[20px] bg-white ${clamp ? "" : "border-[1px] border-[#E9E9E9]"}`}>
            <h3>- {review.name}</h3>
            <p ref={textRef} className={clamp ? "line-clamp-3" : ""}>
                {review.comment}
            </p>
            {clamp && isTruncated && labels && (
                <button onClick={onExpand} className="text-sm underline self-start duration-300 hover:opacity-60">
                    {labels.readMore}
                </button>
            )}
            <p className="font-bold mt-auto pt-[10px] text-right">{review.date}</p>
        </div>
    );
}

function ReviewRow({ review }: { review: Review }) {
    return (
        <div className="flex flex-col gap-y-[15px] py-[25px] border-b-[1px] border-[#E9E9E9] last:border-b-0">
            <div className="flex items-center gap-x-[15px]">
                <div>
                    <h3>{review.name}</h3>
                    <p className="text-sm opacity-60">{review.date}</p>
                </div>
            </div>
            <p>{review.comment}</p>
        </div>
    );
}
