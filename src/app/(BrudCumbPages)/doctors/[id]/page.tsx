import Container from "@/components/shared/Container";
import DoctorDetailContent from "@/modules/doctorDetail/containers/DoctorDetailContent";
import type { Metadata } from "next";
import Script from "next/script";
import { getDoctorById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const doctor = await getDoctorById(Number(id));

  if (!doctor) {
    return {
      title: "Həkim — Çöhrə Estetik Klinikası",
      description: "Çöhrə Estetik Klinikasının peşəkar həkimi.",
    };
  }

  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: doctor.shortDescription,
    alternates: {
      canonical: `https://cohre.az/doctors/${id}`,
    },
    openGraph: {
      title: `${doctor.name} — ${doctor.specialty} | Çöhrə Estetik Klinikası`,
      description: doctor.shortDescription,
      url: `https://cohre.az/doctors/${id}`,
      images: [
        {
          url: doctor.image,
          width: 400,
          height: 400,
          alt: `${doctor.name} — ${doctor.specialty}, Çöhrə Estetik Klinikası`,
        },
      ],
    },
  };
};

const NewsDetail = async ({ params }: Props) => {
  const { id } = await params;
  const doctor = await getDoctorById(Number(id));

  const physicianSchema = doctor
    ? {
        "@context": "https://schema.org",
        "@type": "Physician",
        "@id": `https://cohre.az/doctors/${id}`,
        name: doctor.name,
        jobTitle: doctor.specialty,
        description: doctor.shortDescription,
        image: doctor.image,
        worksFor: {
          "@type": "MedicalClinic",
          name: "Çöhrə Estetik Klinikası",
          url: "https://cohre.az",
        },
        url: `https://cohre.az/doctors/${id}`,
      }
    : null;

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
        name: "Həkimlər",
        item: "https://cohre.az/doctors",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: doctor?.name ?? "Həkim",
        item: `https://cohre.az/doctors/${id}`,
      },
    ],
  };

  return (
    <Container>
      {physicianSchema && (
        <Script
          id="physician-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      )}
      <Script
        id="doctor-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DoctorDetailContent id={id} />
    </Container>
  );
};

export default NewsDetail;
