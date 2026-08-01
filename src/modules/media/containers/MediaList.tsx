import Container from "@/components/shared/Container";
import NewsScard from "@/modules/home/components/NewsScard";
import { getNewsList, type NewsItem } from "@/lib/api";

const MediaList = async () => {
  const news: NewsItem[] = await getNewsList();

  return (
    <Container>
      <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {news.map((card) => (
          <NewsScard key={card.id} card={card} />
        ))}
      </div>
    </Container>
  );
};

export default MediaList;
