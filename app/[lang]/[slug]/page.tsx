import { getFilteredContentByLanguage } from "@/app/utils/getFilteredContentByLanguage";
import About from "@/components/pages/about";
import AroundUs from "@/components/pages/around";
import Contacts from "@/components/pages/contacts";
import FAQ from "@/components/pages/faq";
import { getRoutes } from "@/lib/cachedQueries";
import { notFound, redirect } from "next/navigation";

// Importa os teus componentes por route_key

export default async function DynamicPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

    const allRoutes = await getRoutes();

    // 1. Obter o route_key associado ao slug atual
    const routeEntry = allRoutes.find((r) => r.path === normalizedSlug);
    if (!routeEntry) {
        notFound();
    }

    const { route_key } = routeEntry;

    // 2. Procurar o path correto para esse route_key no idioma atual
    const correctLangRoute = allRoutes.find((r) => r.route_key === route_key && r.lang_code === lang);
    if (!correctLangRoute) {
        notFound();
    }

    const correctPath = correctLangRoute.path;
    // 3. Se o path atual não for o correto, redirecionar
    if (correctPath !== normalizedSlug) {
        return redirect(`/${lang}${correctPath}`);
    }
    switch (route_key) {
        case "about":
            return await About({ lang });
        case "around":
            return await AroundUs({ lang, slug });
        case "contacts":
            return await Contacts({ lang });
        case "faq":
            return await FAQ({ lang });
        default:
            return redirect(`/${lang}`);
    }
}
