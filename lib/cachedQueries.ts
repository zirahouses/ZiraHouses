import { cache } from "react";
import { supabase } from "@/lib/supabaseClient";

type Route = { path: string; lang_code: string; route_key: string };
type Language = { id: number; language_name: string; lang_code: string };

/**
 * routes/languages change rarely and are read by almost every server
 * component on a page (navbar, footer, book button, page resolution...).
 * `cache()` dedupes identical calls within the same request, so a single
 * page render hits Supabase for these once instead of once per caller.
 */
export const getRoutes = cache(async (): Promise<Route[]> => {
    const { data, error } = await supabase.from("routes").select("*");
    if (error || !data) {
        console.error("Erro ao buscar rotas:", error?.message);
        return [];
    }
    return data;
});

export const getLanguages = cache(async (): Promise<Language[]> => {
    const { data, error } = await supabase.from("languages").select("*");
    if (error || !data) {
        console.error("Erro ao buscar idiomas:", error?.message);
        return [];
    }
    return data;
});
