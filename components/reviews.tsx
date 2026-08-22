import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReviewsGrid from "./reviewsGrid";
import { formatReviewDate } from "@/app/utils/formatReviewDate";

export default async function Reviews({ lang }: { lang: string }) {
    const [
        { data: reviews, error: error1 },
        { data: pageheading, error },
    ] = await Promise.all([
        supabase.from("reviews").select("*").order("id", { ascending: false }),
        supabase.from("page_heading").select("*").eq("page", "reviews").eq("lang", lang).single(),
    ]);

    if (error || !pageheading) {
        notFound();
    }

    if (error1 || !reviews) {
        return <h3>REVIEWS NOT FOUND</h3>;
    }

    const localizedReviews = reviews.map((review: any) => ({
        name: review.name,
        comment: review[`review_${lang}`] ?? review.review_en,
        date: formatReviewDate(review.date, lang),
    }));

    return (
        <div className="flex justify-center">
            <div className="max-w-[1920px] col-start-2 col-span-9 grid grid-cols-9 gap-x-[20px] pt-[100px] common-margin">
                <div className="md:col-span-5 col-span-full flex flex-row flex-nowrap items-center gap-x-[20px]">
                    <h2>{pageheading.title}</h2>
                    <div className="bg-black h-[1px] flex-1" />
                </div>
                <div className="mt-[50px] col-span-full">
                    <ReviewsGrid reviews={localizedReviews} lang={lang} modalTitle={pageheading.title} />
                </div>
            </div>
        </div>
    );
}
