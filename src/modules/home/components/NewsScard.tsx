import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/api";

const NewsScard = ({ card }: { card: NewsItem }) => {
  return (
    <Link href={`/media/${card.id}`}>
      <div className="rounded-md border border-primary/12 overflow-hidden bg-white h-full">
        <div className="relative w-full h-63">
          {card.mainImageUrl && (
            <Image
              src={card.mainImageUrl}
              fill
              className="object-cover"
              alt={card.title}
            />
          )}
        </div>
        <div className="p-3">
          <div className="font-medium text-[12px] leading-4 text-black/60 mb-1">
            {card.date}
          </div>
          <div className="text-black/80 font-semibold text-sm leading-5">
            {card.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsScard;
