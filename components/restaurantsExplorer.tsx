"use client";

import { useMemo, useState } from "react";
import RestaurantCard, { Restaurant } from "./restaurantCard";
import { RestaurantsLabels } from "@/app/utils/restaurantsLabels";

type Category = { key: string; label: string };

export default function RestaurantsExplorer({
    categories,
    restaurants,
    labels,
    exploreLabel,
}: {
    categories: Category[];
    restaurants: Restaurant[];
    labels: RestaurantsLabels;
    exploreLabel?: string;
}) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = useMemo(() => {
        if (!activeCategory) return restaurants;
        return restaurants.filter((restaurant) => restaurant.categoryKey === activeCategory);
    }, [activeCategory, restaurants]);

    return (
        <div className="flex flex-col gap-y-[50px]">
            <div className="flex flex-wrap gap-[10px]">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`uppercase text-sm px-[15px] py-[8px] border-[1px] border-black duration-300 ${
                        activeCategory === null ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                >
                    {labels.all}
                </button>
                {categories.map((category) => (
                    <button
                        key={category.key}
                        onClick={() => setActiveCategory(category.key)}
                        className={`uppercase text-sm px-[15px] py-[8px] border-[1px] border-black duration-300 ${
                            activeCategory === category.key ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-[20px]">
                {filtered.map((restaurant) => (
                    <div key={restaurant.placeName} className="break-inside-avoid mb-[20px]">
                        <RestaurantCard restaurant={restaurant} labels={labels} exploreLabel={exploreLabel} />
                    </div>
                ))}
            </div>
        </div>
    );
}
