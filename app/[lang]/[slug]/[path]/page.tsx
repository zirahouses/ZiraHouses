import { supabase } from "@/lib/supabaseClient";
import { getRoutes } from "@/lib/cachedQueries";
import { notFound, redirect } from "next/navigation";
import MansonryLayout from "@/components/masonry";
import PageHeading from "@/components/pageHeading";
import AroundRestaurants from "@/components/pages/aroundRestaurants";

type Params = Promise<{ lang: string; slug: string; path: string }>;

export default async function Pagina({ params }: { params: Params }) {
    const { path, lang, slug } = await params;
    const cleanPath = path.replace(/^\//, "");

    // Buscar todas as rotas para o idioma atual e todas as línguas
    const allRoutes = await getRoutes();
    if (allRoutes.length === 0) {
        notFound();
    }

    // Criar mapa para path -> rota
    const pathToRoute = new Map<string, { path: string; route_key: string; lang_code: string }>();
    // Criar mapa route_key -> rotas por idioma
    const routeKeyToLangRoutes = new Map<string, { path: string; route_key: string; lang_code: string }[]>();

    for (const r of allRoutes) {
        pathToRoute.set(r.path, r);
        if (!routeKeyToLangRoutes.has(r.route_key)) {
            routeKeyToLangRoutes.set(r.route_key, []);
        }
        routeKeyToLangRoutes.get(r.route_key)!.push(r);
    }

    // Traduzir cada segmento do path com base no idioma
    const segments = cleanPath.split("/");
    const translatedParts: string[] = [];

    for (const segment of segments) {
        const currentPath = `/${segment}`;

        const routeEntry = pathToRoute.get(currentPath);
        if (!routeEntry) notFound();

        const langRoutes = routeKeyToLangRoutes.get(routeEntry.route_key);
        if (!langRoutes) notFound();

        const correctLangRoute = langRoutes.find((r) => r.lang_code === lang);
        if (!correctLangRoute) notFound();

        translatedParts.push(correctLangRoute.path.replace(/^\//, ""));
    }

    const translatedPath = translatedParts.join("/");

    // Traduzir slug do mesmo modo
    const originalSlugPath = `/${slug}`;
    const slugRoute = pathToRoute.get(originalSlugPath);

    if (!slugRoute) notFound();

    const slugLangRoutes = routeKeyToLangRoutes.get(slugRoute.route_key);
    if (!slugLangRoutes) notFound();

    const translatedSlug = slugLangRoutes.find((r) => r.lang_code === lang);
    if (!translatedSlug) notFound();

    const newSlug = translatedSlug.path.replace(/^\//, "");

    // Redirecionar se slug ou path forem diferentes
    if (newSlug !== slug || translatedPath !== cleanPath) {
        return redirect(`/${lang}/${newSlug}/${translatedPath}`);
    }

    // Buscar páginas e infos fixas paralelamente
    const route = allRoutes.find((r) => r.path.replace(/^\//, "") === cleanPath);
    if (!route) notFound();

    const { data: allPages } = await supabase.from("around_us").select("path, title, description, image_link");
    const page = allPages?.find((p) => p.path.replace(/^\//, "") === cleanPath);
    if (!page) notFound();

    if (route.route_key === "restaurant") {
        return (
            <div className="mb-[100px]">
                <PageHeading img={page.image_link} title={page.title}>
                    <p>{page.description}</p>
                </PageHeading>

                <AroundRestaurants lang={lang} />
            </div>
        );
    }

    const { data: fixedInfo, error: fixedError } = await supabase
        .from("around_us_fixed_info")
        .select("*")
        .eq("categorie", route.route_key)
        .order("id");

    if (fixedError || !fixedInfo) notFound();

    const fixedNames = fixedInfo.map((f) => f["INFO-PLACE-NAME"]);
    const ids = fixedInfo.map((f) => f.id);

    const { data: content } = await supabase
        .from("around_us_content")
        .select("title, Info, text, extralink_text, extralink_url_text, extraText")
        .eq("lang", lang)
        .in("Info", fixedNames);
    if (!content) notFound();

    const contentByInfo = new Map(content.map((c) => [c.Info, c]));
    const fixedInfoById = new Map(fixedInfo.map((f) => [f.id, f]));

    const orderedContent = ids
        .map((id) => {
            const fi = fixedInfoById.get(id);
            return fi ? contentByInfo.get(fi["INFO-PLACE-NAME"]) : null;
        })
        .filter(Boolean) as typeof content;

    const enrichedContent = orderedContent.map((item) => {
        const fi = fixedInfoById.get(fixedInfo.find((f) => f["INFO-PLACE-NAME"] === item.Info)!.id);
        return {
            title: item.title,
            text: item.text,
            image: fi?.image || null,
            extratext: item?.extraText || [],
            address: fi?.address_gps
                ? {
                      gps: fi.address_gps,
                      url: fi.address_url,
                      location: fi.address_location,
                  }
                : null,
            extralink: fi?.extralink_url
                ? {
                      url: fi.extralink_url,
                      text: item.extralink_text,
                      urlText: item.extralink_url_text,
                  }
                : null,
            website: fi?.website || null,
        };
    });

    return (
        <div className="mb-[100px]">
            <PageHeading img={page.image_link} title={page.title}>
                <p>{page.description}</p>
            </PageHeading>

            <MansonryLayout content={enrichedContent} />
        </div>
    );
}
