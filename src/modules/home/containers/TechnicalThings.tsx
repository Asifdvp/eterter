import Container from "@/components/shared/Container";
import LinkButton from "@/components/shared/LinkButton";
import { getGalleryImages } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const TechnicalThings = async () => {
  const images = await getGalleryImages();
  const preview = images.slice(0, 8);

  return (
    <section aria-label="Qalereya" className="bg-white py-6 md:py-12">
      <Container>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-black/80 text-[20px] leading-7 md:text-[32px] md:leading-8 font-bold">
            Qalereya
          </h2>
          <LinkButton text="Hamısı" href="/galery" />
        </div>

        <Carousel
          opts={{
            loop: true,
            align: "start",
            containScroll: "trimSnaps",
            dragFree: true,
          }}
          autoPlay
          delay={3000}
          className="w-full"
        >
          <CarouselContent>
            {preview.map((image, index) => (
              <CarouselItem
                key={image.id}
                className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-square rounded-md overflow-hidden border border-primary/12">
                  <Image
                    src={image.src}
                    alt={`Çöhrə Estetik Klinikası qalereya şəkli ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
};

export default TechnicalThings;
