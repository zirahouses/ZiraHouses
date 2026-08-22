import Button from "@/components/button";
import Card from "@/components/card";
import Carousel from "@/components/carousel";
import Reviews from "@/components/reviews";
import { supabase } from "@/lib/supabaseClient";
import { notFound, redirect } from "next/navigation";
import { getFilteredContentByLanguage } from "../utils/getFilteredContentByLanguage";
import BookButton from "@/components/bookButton";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    const { data: pageheading, error } = await supabase.from("page_heading").select("*").eq("page", "home").eq("lang", lang).single();

    if (error || !pageheading) {
        redirect("/en");
    }

    const pages = ((await getFilteredContentByLanguage("pages", lang)) as any[]) ?? [];

    return (
        <div className="flex flex-col ">
            <div className="relative col-start-1 col-span-full ">
                <div className="relative">
                    <div className="bg-black/30 w-full h-full absolute top-0 left-0" />
                    <img
                        className="w-full lg:max-h-[900px] lg:h-[75vh] md:h-[55vh] h-[50vh] object-cover"
                        src={pageheading.image}
                        alt={pageheading.title.replace(/\\n/g, " ")}
                    />
                </div>
                <div className="flex justify-center">
                    <div className="absolute top-[30%] lg:grid lg:gridLayout w-full max-w-[1920px]">
                        <div className="lg:col-start-2 col-span-full common-margin">
                            <h1 className="text-white">
                                {pageheading.title
                                    .replace(/\\n/g, "\n")
                                    .split("\n")
                                    .map((line: string, index: number) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                            </h1>
                            <div className="md:w-3/4 lg:w-1/2">
                                <p className="text-white md:mt-[20px] mt-[10px] pr-[10px]">{pageheading.bold}</p>
                            </div>
                            <BookButton className="mt-[50px]" target="_blank" lang={lang}></BookButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="max-w-[1920px] col-start-1 col-span-9 lg:grid grid-cols-9 flex flex-col lg:gap-y-0 gap-y-[50px] gap-x-[20px] pt-[100px] common-margin">
                    {pages.map((page, i) => (
                        <Card key={i} className="col-span-3" title={page.title} img={page.image} text={page.description}>
                            {page.path && (
                                <Button text={page.button_text} href={`/${lang}${page.path.startsWith("/") ? page.path : "/" + page.path}`}></Button>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
            <Reviews lang={lang}></Reviews>
            <div className="flex justify-center">
                <div className="col-start-2 col-span-9 pt-[100px]">
                    <Carousel></Carousel>
                </div>
            </div>
        </div>
    );
}
