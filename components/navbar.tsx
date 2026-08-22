import { getLanguages } from "@/lib/cachedQueries";
import { notFound } from "next/navigation";
import Navbar_Layout from "./navbar_layout";
import { getFilteredContentByLanguage } from "@/app/utils/getFilteredContentByLanguage";
import BookButton from "./bookButton";

export default async function Navbar({ language }: { language: string }) {
    const lang_select = await getLanguages();

    if (lang_select.length === 0) {
        notFound();
    }

    const navbar = (await getFilteredContentByLanguage("navbar", language)) ?? [];

    return (
        <Navbar_Layout
            navbar={navbar}
            lang={lang_select}
            currentLang={language}
            button={<BookButton target="_blank" lang={language} className=""></BookButton>}
        />
    );
}
