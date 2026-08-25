import Container from "@/components/shared/Container";
import DepartmentCard from "@/modules/home/components/DepartmentCard";
import { getServices } from "@/lib/api";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Xidmətlər — Çöhrə Estetik Klinikası Bakı",
  description:
    "Çöhrə Estetik Klinikasının xidmətləri: botoks, filler, mezoterapiya, lazer epilyasiya, akne müalicəsi, saç əkimi FUE, aparat kosmetologiyası. Bakıda peşəkar dermatoloqlar.",
  alternates: {
    canonical: "https://cohre.az/services",
  },
  openGraph: {
    title: "Xidmətlər — Çöhrə Estetik Klinikası",
    description:
      "Botoks, filler, mezoterapiya, lazer, akne müalicəsi, saç əkimi FUE, aparat kosmetologiyası. Bakıda peşəkar dermatoloqlar.",
    url: "https://cohre.az/services",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana səhifə", item: "https://cohre.az" },
    { "@type": "ListItem", position: 2, name: "Xidmətlər", item: "https://cohre.az/services" },
  ],
};

const Services = async () => {
  const services = await getServices();

  return (
    <div className="pb-8 md:pb-12">
      <Script
        id="services-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container>
        <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <DepartmentCard
              key={service.id}
              iconUrl={service.iconUrl}
              name={service.name}
              text={service.listText}
              link={`/services/${service.id}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
