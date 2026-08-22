import type { Metadata } from "next";
import "@/app/globals.css";
import FloatingButton from "@/components/floatingButton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const SITE_META: Record<string, { title: string; description: string; ogLocale: string }> = {
    pt: {
        title: "Zira Houses | Casa de Férias na Costa de Prata, Portugal",
        description:
            "A Zira Houses é uma casa de férias familiar perto de Nazaré e Alcobaça, na Costa de Prata de Portugal, ideal para famílias e viajantes que adoram natureza e praia.",
        ogLocale: "pt_PT",
    },
    en: {
        title: "Zira Houses | Holiday Home on Portugal's Silver Coast",
        description:
            "Zira Houses is a family-friendly holiday home near Nazaré and Alcobaça on Portugal's Silver Coast, ideal for families and travelers who love nature and the beach.",
        ogLocale: "en_US",
    },
    es: {
        title: "Zira Houses | Casa de Vacaciones en la Costa de Plata, Portugal",
        description:
            "Zira Houses es una casa de vacaciones familiar cerca de Nazaré y Alcobaça, en la Costa de Plata de Portugal, ideal para familias y viajeros que aman la naturaleza y la playa.",
        ogLocale: "es_ES",
    },
    fr: {
        title: "Zira Houses | Maison de Vacances sur la Côte d'Argent, Portugal",
        description:
            "Zira Houses est une maison de vacances familiale près de Nazaré et Alcobaça, sur la Côte d'Argent du Portugal, idéale pour les familles et les voyageurs qui aiment la nature et la plage.",
        ogLocale: "fr_FR",
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const meta = SITE_META[lang] ?? SITE_META.en;

    return {
        title: meta.title,
        description: meta.description,
        icons: {
            icon: "/favicon.png",
        },
        keywords: [
            "Holiday home near Nazaré Portugal",
            "Family-friendly accommodation Portugal",
            "Vacation rental West Portugal",
            "Where to stay near Nazaré and Alcobaça",
            "Beach house rental Portugal",
            "Nature retreat near the beach Portugal",
            "Portugal central coast holiday home",
            "Quiet holiday house Portugal",
            "Best stays near Praia da Nazaré",
            "Self-catering accommodation Portugal West Coast",
            "Family holiday near Nazaré",
            "Vacation rental with kids in Portugal",
            "Child-friendly holiday house Portugal",
            "Accommodation with garden Portugal",
            "Nature and beach holiday Portugal",
            "Peaceful getaway near Leiria",
            "Rural accommodation near the coast",
            "Coastal family holidays Portugal",
            "Stay near forests and beaches in Portugal",
            "Affordable holiday home Portugal",
            "Burinhosa",
            "Pataias",
            "Nazaré",
            "Alcobaça",
            "São Pedro de Moel",
            "Leiria",
            "Central Portugal",
            "West Portugal",
            "Silver Coast Portugal",
            "Atlantic Coast Portugal",
        ],
        authors: [{ name: "Zira Houses", url: "https://www.zirahouses.com" }],
        creator: "Zira Houses",
        publisher: "Zira Houses",
        metadataBase: new URL("https://zirahouses.com"),
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: "https://zirahouses.pt",
            siteName: "Zira Houses",
            images: [
                {
                    url: "/Banner.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Image1",
                },
            ],
            locale: meta.ogLocale,
            type: "website",
        },
    };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <html lang={lang}>
            <body>
                <div>
                    <Navbar language={lang} />
                </div>
                {children}
                <FloatingButton language={lang} />
                <Footer language={lang} />
            </body>
        </html>
    );
}
