import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Button from "@/components/button";
import Card from "@/components/card";
import PageHeading from "@/components/pageHeading";
import { getFilteredContentByLanguage } from "@/app/utils/getFilteredContentByLanguage";

export default async function AroundUs({ lang, slug }: { lang: string; slug: string }) {
    const [pages, { data: pageheading, error: headingError }, { data: buttonText }] = await Promise.all([
        getFilteredContentByLanguage("around_us", lang),
        supabase.from("page_heading").select("*").eq("page", "around").eq("lang", lang).single(),
        supabase.from("button_text").select("title").eq("lang", lang).single(),
    ]);

    if (headingError || !pageheading || !pages) {
        notFound();
    }

    return (
        <div className="mb-[100px]">
            <PageHeading img={pageheading.image} title={pageheading.title}>
                {pageheading.content.map((item: any, index: any) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {item.paragraph}
                    </p>
                ))}

                <p className="font-bold text-center mt-4">{pageheading.bold}</p>
            </PageHeading>

            <div className="flex justify-center">
                <div className="col-start-1 col-span-9 lg:grid grid-cols-9 flex flex-col lg:gap-y-[20px] gap-y-[50px] gap-x-[20px] pt-[100px] common-margin max-w-[1920px]">
                    {pages.map((page: any, i: any) => (
                        <div key={i} className="col-span-3">
                            <Card title={page.title} text={page.description} img={page.image_link}>
                                <Button text={buttonText?.title} href={`/${lang}/${slug}/${page.path}`}></Button>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
