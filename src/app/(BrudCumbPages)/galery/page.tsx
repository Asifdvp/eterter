import GaleryTabs from "@/modules/galery/GaleryTabs";
import { getGalleryImages, getGalleryVideos } from "@/lib/api";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Qalereya — Çöhrə Estetik Klinikası Bakı",
  description:
    "Çöhrə Estetik Klinikasında aparılan prosedurların əvvəl/sonra fotoları, klinika interyeri və video materiallar. Botoks, filler, lazer, akne müalicəsi nəticələri.",
  alternates: {
    canonical: "https://cohre.az/galery",
  },
  openGraph: {
    title: "Qalereya — Çöhrə Estetik Klinikası",
    description:
      "Prosedur nəticələrinin əvvəl/sonra fotoları, klinika interyeri və video materiallar.",
    url: "https://cohre.az/galery",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana səhifə",
      item: "https://cohre.az",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Qalereya",
      item: "https://cohre.az/galery",
    },
  ],
};

const Galery = async () => {
  const [images, videos] = await Promise.all([
    getGalleryImages(),
    getGalleryVideos(),
  ]);

  return (
    <>
      <Script
        id="gallery-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GaleryTabs images={images} videos={videos} />
    </>
  );
};

export default Galery;
