import type { Metadata } from "next";
import "@/app/globals.css";
import FloatingButton from "@/components/floatingButton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "Zira Houses | Holiday Home on Portugal's Silver Coast",
    description:
        "Zira Houses is a family-friendly holiday home near Nazaré and Alcobaça on Portugal's Silver Coast, ideal for families and travelers who love nature and the beach.",
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
        title: "Zira Houses",
        description:
            "We are Zira Houses, your welcoming holiday home on the Silver Coast of Portugal, ideal for families and travelers who love nature and the beach.",
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
        locale: "en_US",
        type: "website",
    },
};

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
