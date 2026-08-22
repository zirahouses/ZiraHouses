export type ReviewsLabels = {
    showMore: string;
    close: string;
    readMore: string;
};

const LABELS: Record<string, ReviewsLabels> = {
    pt: { showMore: "Mostrar mais avaliações", close: "Fechar", readMore: "Ver mais" },
    en: { showMore: "Show more reviews", close: "Close", readMore: "Read more" },
    es: { showMore: "Mostrar más opiniones", close: "Cerrar", readMore: "Ver más" },
    fr: { showMore: "Afficher plus d'avis", close: "Fermer", readMore: "Voir plus" },
};

export function getReviewsLabels(lang: string): ReviewsLabels {
    return LABELS[lang] ?? LABELS.pt;
}
