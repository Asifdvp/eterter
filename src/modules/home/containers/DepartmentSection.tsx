import Container from "@/components/shared/Container";
import LinkButton from "@/components/shared/LinkButton";
import { getServices } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import DepartmentCard from "../components/DepartmentCard";

const DepartmentSection = async () => {
  const services = await getServices();

  return (
    <section aria-label="Xidmətlərimiz" className="bg-background w-full py-7 md:py-11">
      <Container>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-black/80 text-[20px] leading-7 md:text-[32px] md:leading-8 font-bold">
            Xidmətlərimiz
          </h2>
          <LinkButton text="Hamısı" href="/services" />
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
          className="w-full mt-4 md:mt-6"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <DepartmentCard
                  iconUrl={service.iconUrl}
                  name={service.name}
                  text={service.listText}
                  link={`/services/${service.id}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
};

export default DepartmentSection;
