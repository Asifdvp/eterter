import Container from "@/components/shared/Container";
import Image from "next/image";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Haqqımızda — Çöhrə Estetik Klinikası Bakı",
  description:
    "2019-cu ildən Bakıda fəaliyyət göstərən Çöhrə Estetik Klinikası haqqında. Peşəkar dermatoloqlar, beynəlxalq sertifikatlar, müasir avadanlıq və fərdi yanaşma ilə xidmətinizdəyik.",
  alternates: {
    canonical: "https://cohre.az/about",
  },
  openGraph: {
    title: "Haqqımızda — Çöhrə Estetik Klinikası",
    description:
      "2019-cu ildən Bakıda fəaliyyət göstərən Çöhrə Estetik Klinikası haqqında. Peşəkar dermatoloqlar, müasir avadanlıq.",
    url: "https://cohre.az/about",
    images: [
      {
        url: "/images/about.webp",
        width: 1200,
        height: 630,
        alt: "Çöhrə Estetik Klinikasının müasir tibbi kabineti",
      },
    ],
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
      name: "Haqqımızda",
      item: "https://cohre.az/about",
    },
  ],
};

const About = () => {
  return (
    <Container>
      <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-1 relative aspect-4/3 md:aspect-auto md:h-full">
            <Image
              src="/images/about.webp"
              alt="Çöhrə Estetik Klinikasının müasir tibbi kabineti — Bakı"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="md:col-span-2 rounded-lg px-4 border border-primary/12 p-3 md:px-5 text-text font-sm font-normal leading-5">
            <div>
              <h2 className="font-semibold font-base leading-6 mb-1 text-black/80">
                Fəaliyyətimiz
              </h2>
              <p className="mb-3">
                Çöhrə Estetik Klinika, müasir tibbi texnologiyalarla estetik və
                dermatoloji xidmətlər göstərən peşəkar bir sağlamlıq və gözəllik
                mərkəzidir. Klinikada həm tibbi, həm də qeyri-cərrahi estetik
                prosedurlar yüksək ixtisaslı mütəxəssislər tərəfindən həyata
                keçirilir. Pasiyent məmnuniyyəti, təhlükəsizlik və fərdi yanaşma
                klinikanın əsas prioritetləri arasında yer alır.
              </p>
              <p>
                Çöhrə Estetik Klinika özünü yalnız xidmət göstərən bir müəssisə
                kimi deyil, həm də pasiyentlərin özünəinamını artırmağı
                hədəfləyən bir “gözəllik və sağlamlıq məkanı” kimi təqdim edir.
                Burada hər pasiyent üçün dəri növü, yaş, ümumi sağlamlıq və
                estetik məqsədlər nəzərə alınaraq fərdi müalicə planı
                hazırlanır.
              </p>
            </div>
            <div className="mt-3">
              <h2 className="font-semibold font-base leading-6 mb-1 text-black/80">
                Üstünlüklər
              </h2>
              <ul>
                <li>• Peşəkar və təcrübəli mütəxəssislər</li>
                <li>• Steril və komfortlu şərait</li>
                <li>• Son model tibbi avadanlıqlar</li>
                <li>• Fərdi yanaşma və təhlükəsiz müalicə protokolları</li>
                <li>• Yüksək pasiyent məmnuniyyəti</li>
              </ul>
            </div>
            <div className="mt-3">
              <h2 className="font-semibold font-base leading-6 mb-1 text-black/80">
                Klinikanın əsas xidmətləri
              </h2>
              <ul>
                <li>• Üz və bədən estetikası</li>
                <li>• Dəri problemlərinin müalicəsi</li>
                <li>• İnyeksiyon prosedurlar (botoks, filler, mezoterapiya)</li>
                <li>• Aparat kosmetologiyası (lazer, IPL, Fotona)</li>
                <li>• Saç əkimi (FUE metodu)</li>
              </ul>
            </div>
            <div className="mt-3">
              <p>
                Çöhrə Estetik Klinika, gözəlliyinə və sağlamlığına dəyər verən
                hər kəsi daha parlaq, təravətli və təbii görünüşə qovuşmaq üçün
                dəvət edir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
