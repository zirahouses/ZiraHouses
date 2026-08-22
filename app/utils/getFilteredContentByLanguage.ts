import { supabase } from "@/lib/supabaseClient";
import { getRoutes } from "@/lib/cachedQueries";

// Define o tipo de dado que existe na tabela de rotas
type Route = {
    path: string;
    lang_code: string;
};

/**
 * Esta função filtra os dados de uma tabela (ex: around_us) com base na linguagem desejada.
 * A filtragem é feita cruzando um campo (ex: path) com a tabela 'routes',
 * que contém a correspondência entre paths e idiomas.
 *
 * @param tableName Nome da tabela onde estão os conteúdos (ex: "around_us")
 * @param matchKey Nome da propriedade que corresponde ao "path" (ex: "path" ou "categorie")
 * @param language Código do idioma a filtrar (ex: "pt", "en")
 * @returns Um array de objetos da tabela filtrados pela linguagem, ou null em caso de erro
 */
export async function getFilteredContentByLanguage<T>(tableName: string, language: string): Promise<T[] | null> {
    const { data: tableData, error: tableError } = await supabase.from(tableName).select("*").order("id", { ascending: true });
    const routes = await getRoutes();

    if (tableError || !tableData || routes.length === 0) {
        return null;
    }

    const routePaths = routes.map((r) => r.path);

    const matchedField =
        tableData.length > 0
            ? Object.keys(tableData[0]).find((key) => tableData.some((item) => routePaths.includes(item[key as keyof typeof item])))
            : null;

    if (!matchedField) {
        console.warn(`Nenhum campo com valor correspondente a routes.path foi encontrado em ${tableName}`);
        return null;
    }

    const filtered = tableData
        .map((item: any) => {
            const route = routes.find((r) => r.path === item[matchedField]);
            return {
                ...item,
                lang_code: route?.lang_code ?? null,
            };
        })
        .filter((item: any) => item.lang_code === language);

    return filtered;
}
