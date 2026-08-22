import { supabase } from "@/lib/supabaseClient";
import RestaurantsExplorer from "@/components/restaurantsExplorer";
import RestaurantRankings from "@/components/restaurantRankings";
import { Restaurant } from "@/components/restaurantCard";
import { getRestaurantsLabels } from "@/app/utils/restaurantsLabels";

export default async function AroundRestaurants({ lang }: { lang: string }) {
    const [
        { data: categories },
        { data: categoriesContent },
        { data: fixedInfo },
        { data: content },
        { data: rankings },
        { data: rankingItems },
        { data: buttonText },
    ] = await Promise.all([
        supabase.from("restaurant_categories").select("*").order("sort_order", { ascending: true }),
        supabase.from("restaurant_categories_content").select("*").eq("lang", lang),
        supabase.from("restaurants_fixed_info").select("*").order("sort_order", { ascending: true }),
        supabase.from("restaurants_content").select("*").eq("lang", lang),
        supabase.from("restaurant_rankings").select("*").eq("lang", lang).order("sort_order", { ascending: true }),
        supabase.from("restaurant_ranking_items").select("*").order("position", { ascending: true }),
        supabase.from("button_text").select("title").eq("lang", lang).single(),
    ]);

    const labels = getRestaurantsLabels(lang);

    const categoryLabelByKey = new Map((categoriesContent ?? []).map((c: any) => [c.category_key, c.label]));

    const restaurantCategories = (categories ?? []).map((category: any) => ({
        key: category.key,
        label: categoryLabelByKey.get(category.key) ?? category.key,
    }));

    const contentByPlace = new Map((content ?? []).map((c: any) => [c.place_name, c]));

    const restaurants: Restaurant[] = (fixedInfo ?? [])
        .map((info: any) => {
            const placeContent = contentByPlace.get(info.place_name);
            if (!placeContent) return null;

            return {
                placeName: info.place_name,
                categoryKey: info.category_key,
                categoryLabel: categoryLabelByKey.get(info.category_key) ?? info.category_key,
                priceTier: info.price_tier,
                familyFriendly: info.family_friendly,
                distanceKm: info.distance_km,
                distanceMinutes: info.distance_minutes,
                addressLocation: info.address_location,
                gps: info.gps,
                website: info.website,
                ratingValue: info.rating_value,
                image: info.image,
                title: placeContent.title,
                specialties: placeContent.specialties ?? [],
                whyWorthIt: placeContent.why_worth_it,
                reservationNote: placeContent.reservation_note,
                note: placeContent.note,
            };
        })
        .filter((r: Restaurant | null): r is Restaurant => r !== null);

    const restaurantByPlace = new Map(restaurants.map((r) => [r.placeName, r]));

    const rankingsWithItems = (rankings ?? []).map((ranking: any) => ({
        listKey: ranking.list_key,
        title: ranking.title,
        items: (rankingItems ?? [])
            .filter((item: any) => item.ranking_id === ranking.id)
            .map((item: any) => {
                const linked = item.restaurant_place_name ? restaurantByPlace.get(item.restaurant_place_name) : null;
                return {
                    position: item.position,
                    name: linked?.title ?? item.free_text_name ?? "",
                    blurb: item.blurb,
                    warningNote: item.warning_note,
                };
            }),
    }));

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-y-[100px] pt-[100px] common-margin max-w-[1920px] w-full">
                <RestaurantsExplorer categories={restaurantCategories} restaurants={restaurants} labels={labels} exploreLabel={buttonText?.title} />
                <RestaurantRankings rankings={rankingsWithItems} title={labels.rankingsTitle} />
            </div>
        </div>
    );
}
