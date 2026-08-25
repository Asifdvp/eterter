import ShowHTMLContent from "@/components/shared/ShowHTMLContent";
import ImageGallery from "../components/ImageGallery";
import { getNewsById, type NewsDetail } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
  id: string;
}

const DetailContent = async ({ id }: Props) => {
  const newsId = parseInt(id, 10);
  if (isNaN(newsId)) notFound();

  const article: NewsDetail | null = await getNewsById(newsId);
  if (!article) notFound();

  return (
    <div className="pb-8 md:pb-12">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {article.images.length > 0 && (
          <div className="w-full md:w-1/3">
            <ImageGallery images={article.images} title={article.title} />
          </div>
        )}

        <div className={`rounded-lg px-4 border border-primary/12 p-3 md:px-5 ${article.images.length > 0 ? "w-full md:w-2/3" : "w-full"}`}>
          <div className="font-medium text-black/60 leading-4 text-xs mb-1 flex items-center gap-2">
            <span>{article.date}</span>
            {article.authorName && (
              <>
                <span className="text-black/30">·</span>
                <span>{article.authorName}</span>
              </>
            )}
          </div>
          <h1 className="text-base leading-5 md:text-[18px] md:leading-6 font-semibold text-black/80 mb-1">
            {article.title}
          </h1>
          {article.description && (
            <ShowHTMLContent content={article.description} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailContent;
