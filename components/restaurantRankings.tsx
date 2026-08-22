type RankingItem = {
    position: number;
    name: string;
    blurb: string | null;
    warningNote: string | null;
};

type Ranking = {
    listKey: string;
    title: string;
    items: RankingItem[];
};

export default function RestaurantRankings({ rankings, title }: { rankings: Ranking[]; title: string }) {
    if (rankings.length === 0) return null;

    return (
        <div className="flex flex-col gap-y-[50px]">
            <h2 className="text-center">{title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                {rankings.map((ranking) => (
                    <div key={ranking.listKey} className="bg-white p-[20px] flex flex-col gap-y-[20px]">
                        <h3 className="uppercase">{ranking.title}</h3>
                        <ol className="flex flex-col gap-y-[15px]">
                            {ranking.items.map((item) => (
                                <li key={item.position} className="flex flex-col">
                                    <p>
                                        <span className="font-bold">
                                            {item.position}. {item.name}
                                        </span>
                                        {item.blurb && <> — {item.blurb}</>}
                                    </p>
                                    {item.warningNote && <p className="text-xs opacity-70 italic">{item.warningNote}</p>}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    );
}
