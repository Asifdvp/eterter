import Container from "@/components/shared/Container";
import Image from "next/image";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/api";
import ShowHTMLContent from "@/components/shared/ShowHTMLContent";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const service = await getServiceById(Number(id));

  if (!service) {
    return {
      title: "Xidmət — Çöhrə Estetik Klinikası",
      description: "Çöhrə Estetik Klinikasının xidmətləri.",
    };
  }

  return {
    title: `${service.name} — Çöhrə Estetik Klinikası Bakı`,
    description: `Çöhrə Estetik Klinikasında ${service.name} xidməti. Bakıda peşəkar dermatoloqlar. Pulsuz konsultasiya — 070 708 61 61`,
    alternates: {
      canonical: `https://cohre.az/services/${id}`,
    },
    openGraph: {
      title: `${service.name} — Çöhrə Estetik Klinikası`,
      url: `https://cohre.az/services/${id}`,
      ...(service.imageUrl && {
        images: [{ url: service.imageUrl, width: 1200, height: 630, alt: service.imageAlt }],
      }),
    },
  };
};

const ServiceDetail = async ({ params }: Props) => {
  const { id } = await params;
  const service = await getServiceById(Number(id));

  if (!service) notFound();

  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    procedureType: "Noninvasive",
    bodyLocation: "Dəri",
    followup: "Həkim məsləhəti",
    preparation: "Pulsuz ilkin konsultasiya",
    performedBy: {
      "@type": "MedicalClinic",
      name: "Çöhrə Estetik Klinikası",
      url: "https://cohre.az",
      telephone: "+994707086161",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana səhifə", item: "https://cohre.az" },
      { "@type": "ListItem", position: 2, name: "Xidmətlər", item: "https://cohre.az/services" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://cohre.az/services/${id}` },
    ],
  };

  const faqSchema = service.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <Container>
      <Script
        id="service-procedure-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />
      {faqSchema && (
        <Script
          id="service-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Script
        id="service-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Image */}
          {service.imageUrl && (
            <div className="col-span-1 relative aspect-4/3 md:aspect-auto md:min-h-[calc(100vh-25rem)]">
              <Image
                src={service.imageUrl}
                alt={service.imageAlt || service.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className={`${service.imageUrl ? "md:col-span-2" : "md:col-span-3"} rounded-lg px-4 border border-primary/12 p-3 md:px-5 text-text font-sm font-normal leading-5`}>
            <h1 className="font-bold text-lg leading-7 md:text-2xl md:leading-8 mb-3 text-black/80">
              {service.name}
            </h1>

            {service.description && (
              <div>
                <h2 className="font-semibold font-base leading-6 mb-1 text-black/80">
                  Xidmət haqqında
                </h2>
                <ShowHTMLContent content={service.description} />
              </div>
            )}

            {service.benefits.length > 0 && (
              <div className="mt-3">
                <h2 className="font-semibold font-base leading-6 mb-1 text-black/80">
                  Prosedurun əhatə etdiyi sahələr
                </h2>
                <ul>
                  {service.benefits.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.faq.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold font-base leading-6 mb-2 text-black/80">
                  Tez-tez verilən suallar
                </h2>
                <div className="space-y-2">
                  {service.faq.map((item, i) => (
                    <div key={i}>
                      <p className="font-medium text-black/80">{item.question}</p>
                      <p className="text-black/60">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </Container>
  );
};

export default ServiceDetail;
