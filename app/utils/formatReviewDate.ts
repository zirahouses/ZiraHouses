const MONTH_NAMES: Record<string, Record<string, string>> = {
    January: { pt: "Janeiro", en: "January", es: "Enero", fr: "Janvier" },
    February: { pt: "Fevereiro", en: "February", es: "Febrero", fr: "Février" },
    March: { pt: "Março", en: "March", es: "Marzo", fr: "Mars" },
    April: { pt: "Abril", en: "April", es: "Abril", fr: "Avril" },
    May: { pt: "Maio", en: "May", es: "Mayo", fr: "Mai" },
    June: { pt: "Junho", en: "June", es: "Junio", fr: "Juin" },
    July: { pt: "Julho", en: "July", es: "Julio", fr: "Juillet" },
    August: { pt: "Agosto", en: "August", es: "Agosto", fr: "Août" },
    September: { pt: "Setembro", en: "September", es: "Septiembre", fr: "Septembre" },
    October: { pt: "Outubro", en: "October", es: "Octubre", fr: "Octobre" },
    November: { pt: "Novembro", en: "November", es: "Noviembre", fr: "Novembre" },
    December: { pt: "Dezembro", en: "December", es: "Diciembre", fr: "Décembre" },
};

export function formatReviewDate(date: string, lang: string): string {
    const match = date.match(/^(\w+)\s+(\d{4})$/);
    if (!match) return date;

    const [, month, year] = match;
    const translatedMonth = MONTH_NAMES[month]?.[lang] ?? month;

    return lang === "pt" || lang === "es" ? `${translatedMonth} de ${year}` : `${translatedMonth} ${year}`;
}
