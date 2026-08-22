export type RestaurantsLabels = {
    all: string;
    familyYes: string;
    familyNo: string;
    reservation: string;
    rankingsTitle: string;
    distance: string;
    price: string;
    specialties: string;
};

const LABELS: Record<string, RestaurantsLabels> = {
    pt: {
        all: "Todos",
        familyYes: "Famílias: Sim",
        familyNo: "Famílias: Não",
        reservation: "Reserva",
        rankingsTitle: "Rankings Especiais",
        distance: "Distância",
        price: "Preço",
        specialties: "Especialidades",
    },
    en: {
        all: "All",
        familyYes: "Families: Yes",
        familyNo: "Families: No",
        reservation: "Reservation",
        rankingsTitle: "Special Rankings",
        distance: "Distance",
        price: "Price",
        specialties: "Specialties",
    },
    es: {
        all: "Todos",
        familyYes: "Familias: Sí",
        familyNo: "Familias: No",
        reservation: "Reserva",
        rankingsTitle: "Rankings Especiales",
        distance: "Distancia",
        price: "Precio",
        specialties: "Especialidades",
    },
    fr: {
        all: "Tous",
        familyYes: "Familles : Oui",
        familyNo: "Familles : Non",
        reservation: "Réservation",
        rankingsTitle: "Classements Spéciaux",
        distance: "Distance",
        price: "Prix",
        specialties: "Spécialités",
    },
};

export function getRestaurantsLabels(lang: string): RestaurantsLabels {
    return LABELS[lang] ?? LABELS.pt;
}
