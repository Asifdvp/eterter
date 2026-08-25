import { IDoctorData } from "@/types";

const API_BASE = process.env.API_BASE_URL ?? "https://healthcohre-2.onrender.com/api/v1";
const IMAGE_HOST = process.env.IMAGE_HOST ?? "https://healthcohre-2.onrender.com";

function toAbsoluteUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${IMAGE_HOST}${path}`;
}

// ── Exported gallery types ────────────────────────────────────────────────────

export type GalleryImage = { id: number; src: string };
export type GalleryVideo = { id: number; url: string; title: string };

// ── API response shapes ──────────────────────────────────────────────────────

type DoctorApi = {
  id: number;
  fullName: string;
  specialty: string;
  imageUrl: string;
  experienceYears: number;
  patientsCount: number;
  rating: number;
  shortDescription: string;
  description?: string;
};

// ── Mapper ───────────────────────────────────────────────────────────────────

function mapDoctor(d: DoctorApi): IDoctorData {
  return {
    id: d.id,
    name: d.fullName,
    specialty: d.specialty,
    image: toAbsoluteUrl(d.imageUrl),
    experience: d.experienceYears,
    patients: d.patientsCount,
    rating: d.rating,
    shortDescription: d.shortDescription,
    description: d.description ?? "",
  };
}

// ── Doctors ──────────────────────────────────────────────────────────────────

export async function getDoctors(): Promise<IDoctorData[]> {
  try {
    const res = await fetch(`${API_BASE}/doctors`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: DoctorApi[] = await res.json();
    return data.map(mapDoctor);
  } catch {
    return [];
  }
}

export async function getDoctorById(id: number): Promise<IDoctorData | null> {
  try {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: DoctorApi = await res.json();
    return mapDoctor(data);
  } catch {
    return null;
  }
}

// ── News ─────────────────────────────────────────────────────────────────────

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  mainImageUrl: string;
};

export type NewsDetail = {
  id: number;
  title: string;
  date: string;
  authorName?: string;
  description: string;
  images: { id: number; isMain: boolean; imageUrl: string }[];
};

type NewsListApi = {
  id: number;
  title: string;
  publishedDate: string;
  mainImageUrl: string;
};

type NewsDetailApi = {
  id: number;
  title: string;
  publishedDate: string;
  authorName?: string;
  description: string;
  images?: { id: number; isMain: boolean; imageUrl: string }[];
  mainImageUrl?: string;
};

export async function getNewsList(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_BASE}/news`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: NewsListApi[] = await res.json();
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.publishedDate,
      mainImageUrl: toAbsoluteUrl(item.mainImageUrl),
    }));
  } catch {
    return [];
  }
}

export async function getNewsById(id: number): Promise<NewsDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/news/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: NewsDetailApi = await res.json();
    const images = data.images?.map((img) => ({
      ...img,
      imageUrl: toAbsoluteUrl(img.imageUrl),
    })) ?? (data.mainImageUrl
      ? [{ id: 1, isMain: true, imageUrl: toAbsoluteUrl(data.mainImageUrl) }]
      : []);
    return {
      id: data.id,
      title: data.title,
      date: data.publishedDate,
      authorName: data.authorName ?? undefined,
      description: data.description ?? "",
      images,
    };
  } catch {
    return null;
  }
}

// ── Services ─────────────────────────────────────────────────────────────────

export type Service = {
  id: number;
  name: string;
  iconUrl: string;
  listText: string;
};

export type ServiceDetail = {
  id: number;
  name: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  benefits: string[];
  faq: { question: string; answer: string }[];
};

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: (Omit<Service, "iconUrl"> & { iconUrl: string })[] = await res.json();
    return data.map((item) => ({
      ...item,
      iconUrl: toAbsoluteUrl(item.iconUrl),
    }));
  } catch {
    return [];
  }
}

export async function getServiceById(id: number): Promise<ServiceDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: Omit<ServiceDetail, "imageUrl"> & { imageUrl: string } = await res.json();
    return {
      ...data,
      imageUrl: toAbsoluteUrl(data.imageUrl),
    };
  } catch {
    return null;
  }
}

// ── Home Stats ───────────────────────────────────────────────────────────────

type HomeStatApi = { id: number; countValue: number; labelText: string };
export type HomeStat = { id: number; count: number; label: string };

export async function getHomeStats(): Promise<HomeStat[]> {
  try {
    const res = await fetch(`${API_BASE}/home-stats`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: HomeStatApi[] = await res.json();
    return data.map((item) => ({
      id: item.id,
      count: item.countValue,
      label: item.labelText,
    }));
  } catch {
    return [];
  }
}

// ── Gallery ───────────────────────────────────────────────────────────────────

type GalleryImageApi = { id: number; imageUrl: string };
type GalleryVideoApi = { id: number; youtubeUrl: string; title: string };

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery/images`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: GalleryImageApi[] = await res.json();
    return data.map((item) => ({
      id: item.id,
      src: toAbsoluteUrl(item.imageUrl),
    }));
  } catch {
    return [];
  }
}

export async function getGalleryVideos(): Promise<GalleryVideo[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery/videos`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data: GalleryVideoApi[] = await res.json();
    return data.map((item) => ({
      id: item.id,
      url: item.youtubeUrl,
      title: item.title ?? "",
    }));
  } catch {
    return [];
  }
}
