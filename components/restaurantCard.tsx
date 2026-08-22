import Button from "./button";
import { RestaurantsLabels } from "@/app/utils/restaurantsLabels";

export type Restaurant = {
    placeName: string;
    categoryKey: string | null;
    categoryLabel: string;
    priceTier: number | null;
    familyFriendly: boolean | null;
    distanceKm: number | null;
    distanceMinutes: number | null;
    addressLocation: string | null;
    gps: string | null;
    website: string | null;
    ratingValue: number | null;
    image: string | null;
    title: string;
    specialties: string[];
    whyWorthIt: string | null;
    reservationNote: string | null;
    note: string | null;
};

export default function RestaurantCard({
    restaurant,
    labels,
    exploreLabel,
}: {
    restaurant: Restaurant;
    labels: RestaurantsLabels;
    exploreLabel?: string;
}) {
    return (
        <div className="w-full flex flex-col">
            {restaurant.image && <img src={restaurant.image} alt={restaurant.title} className="w-full h-[300px] object-cover" />}
            <div
                className={`bg-white xl:mx-[20px] lg:mx-0 md:mx-[20px] p-[20px] flex flex-col gap-y-[20px] ${
                    restaurant.image ? "-mt-[50px]" : "mt-0"
                }`}
            >
                <div className="flex flex-col gap-y-[10px]">
                    <p className="uppercase text-xs font-bold">{restaurant.categoryLabel}</p>
                    <h3>{restaurant.title}</h3>
                </div>

                <div className="flex flex-col gap-x-[15px] gap-y-[5px]">
                    {!!restaurant.priceTier && (
                        <p>
                            {labels.price}: {"€".repeat(restaurant.priceTier)}
                        </p>
                    )}
                    {restaurant.familyFriendly !== null && <p>{restaurant.familyFriendly ? labels.familyYes : labels.familyNo}</p>}
                    {(restaurant.distanceMinutes || restaurant.distanceKm) && (
                        <p>
                            {labels.distance}: {restaurant.distanceMinutes ? `~${restaurant.distanceMinutes} min` : ""}
                            {restaurant.distanceMinutes && restaurant.distanceKm ? " / " : ""}
                            {restaurant.distanceKm ? `~${restaurant.distanceKm} km` : ""}
                        </p>
                    )}
                    {!!restaurant.ratingValue && <p>★ {restaurant.ratingValue}</p>}
                </div>

                {restaurant.specialties?.length > 0 && (
                    <div className="flex flex-col gap-y-[5px]">
                        <p className="font-bold">{labels.specialties}:</p>
                        <ul className="list-disc list-inside flex flex-col gap-y-[5px]">
                            {restaurant.specialties.map((specialty, i) => (
                                <li key={i}>{specialty}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {restaurant.whyWorthIt && <p>{restaurant.whyWorthIt}</p>}

                {restaurant.addressLocation &&
                    (restaurant.gps ? (
                        <p>
                            <a href={restaurant.gps} target="_blank" className="underline bg-black text-white p-[5px]">
                                {restaurant.addressLocation}
                            </a>
                        </p>
                    ) : (
                        <p>{restaurant.addressLocation}</p>
                    ))}

                {restaurant.reservationNote && (
                    <p className="font-bold">
                        {labels.reservation}: {restaurant.reservationNote}
                    </p>
                )}
                {restaurant.note && <p className="italic">{restaurant.note}</p>}

                {restaurant.website && <Button href={restaurant.website} text={exploreLabel ?? "Explore"} target="_blank" />}
            </div>
        </div>
    );
}
