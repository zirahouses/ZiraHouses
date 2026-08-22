export default function Card(props: any) {
    return (
        <div className={`w-full h-full flex flex-col ${props.className}`}>
            {props.img && (
                <div>
                    <img src={props.img} alt={props.title || ""} className="w-full h-[300px] object-cover " />
                </div>
            )}
            <div
                className={`bg-white xl:mx-[20px] lg:mx-0 md:mx-[20px] p-[10px] h-full flex flex-col gap-y-[30px] ${
                    props.img ? "-mt-[50px]" : "mt-0"
                } justify-between`}
            >
                <div className="flex flex-col gap-y-[30px]">
                    <h3>{props.title}</h3>
                    <p>{props.text}</p>
                </div>
                {props.children}
            </div>
        </div>
    );
}
