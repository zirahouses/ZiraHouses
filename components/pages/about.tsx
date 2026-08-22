import BigCard from "@/components/bigcard";
import PageHeading from "@/components/pageHeading";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

export default async function About({ lang }: { lang: string }) {
    const [
        { data: rooms, error: roomsError },
        { data: pageheading, error: headingError },
    ] = await Promise.all([
        supabase.from("rooms").select("*").eq("lang", lang).order("id", { ascending: true }),
        supabase.from("page_heading").select("*").eq("page", "about").eq("lang", lang).single(),
    ]);

    if (roomsError || !rooms) {
        return { notFound };
    }

    if (headingError || !pageheading) {
        return { notFound };
    }

    return (
        <div className="mb-[100px]">
            <PageHeading lang={lang} img={pageheading.image} title={pageheading.title}>
                {pageheading.content.map((item: any, index: any) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {item.paragraph}
                    </p>
                ))}
                <p className="font-bold text-center mt-4">{pageheading.bold}</p>
            </PageHeading>
            <div className="flex justify-center">
                <div
                    className="grid grid-cols-9 lg:gap-y-[150px] gap-y-[50px] pt-[100px] common-margin max-w-[1920px]"
                    style={{ gridAutoRows: "auto" }}
                >
                    {rooms.map((room, i) => (
                        <div key={i} className={`col-start-1 col-span-full`}>
                            <BigCard img={room.content.images} name={room.title} description={room.description}>
                                {room.content.extraInfo && (
                                    <div>
                                        {room.content.extraInfo.map((info: any, i: any) => (
                                            <div key={i}>
                                                <p>
                                                    <span className="font-bold">{info.name}</span> {info.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {room.content.amenities && (
                                    <div className="mt-4">
                                        <p className="font-bold">{room.content.amenities.title}</p>
                                        {room.content.amenities.info.map((amenitie: any, i: any) => (
                                            <div key={i}>
                                                <p>{amenitie}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {room.content.extraSpaces && (
                                    <div className="col-span-full grid grid-cols-6 gap-x-[20px]">
                                        {room.content.extraSpaces.map((space: any, i: any) => (
                                            <div key={i} className="col-span-2">
                                                <p className="font-bold uppercase">{space.name}</p>
                                                {space.spaces.map((text: any, i: any) => (
                                                    <p key={i}>{text}</p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </BigCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
